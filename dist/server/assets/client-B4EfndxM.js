import { createClient as createClient$1 } from "@supabase/supabase-js";
import { createClient } from "@libsql/client/web";
function createTursoClient() {
  const url = typeof process !== "undefined" && process.env?.TURSO_DATABASE_URL;
  const authToken = typeof process !== "undefined" && process.env?.TURSO_AUTH_TOKEN;
  if (!url) {
    return null;
  }
  return createClient({
    url,
    authToken
  });
}
let _turso;
const turso = new Proxy({}, {
  get(_, prop, receiver) {
    if (_turso === void 0) {
      _turso = createTursoClient();
    }
    if (!_turso) {
      if (prop === "execute") {
        return async () => {
          throw new Error("[Turso] Client is not configured. Please set VITE_TURSO_DATABASE_URL and VITE_TURSO_AUTH_TOKEN.");
        };
      }
      return void 0;
    }
    return Reflect.get(_turso, prop, receiver);
  }
});
const isTursoConfigured = () => {
  const url = typeof process !== "undefined" && process.env?.TURSO_DATABASE_URL;
  return !!url;
};
class ResilientQueryBuilder {
  table;
  operation = "select";
  selectFields = "*";
  filters = [];
  inFilters = [];
  orderBy = [];
  limitValue = null;
  isSingle = false;
  payload = null;
  selectOptions = null;
  realBuilder;
  constructor(table, realBuilder) {
    this.table = table;
    this.realBuilder = realBuilder;
  }
  select(fields = "*", options) {
    this.selectFields = fields;
    this.selectOptions = options;
    this.realBuilder = this.realBuilder.select(fields, options);
    return this;
  }
  insert(payload) {
    this.operation = "insert";
    this.payload = payload;
    this.realBuilder = this.realBuilder.insert(payload);
    return this;
  }
  update(payload) {
    this.operation = "update";
    this.payload = payload;
    this.realBuilder = this.realBuilder.update(payload);
    return this;
  }
  delete() {
    this.operation = "delete";
    this.realBuilder = this.realBuilder.delete();
    return this;
  }
  eq(column, value) {
    this.filters.push({ type: "eq", column, value });
    this.realBuilder = this.realBuilder.eq(column, value);
    return this;
  }
  neq(column, value) {
    this.filters.push({ type: "neq", column, value });
    this.realBuilder = this.realBuilder.neq(column, value);
    return this;
  }
  gt(column, value) {
    this.filters.push({ type: "gt", column, value });
    this.realBuilder = this.realBuilder.gt(column, value);
    return this;
  }
  lt(column, value) {
    this.filters.push({ type: "lt", column, value });
    this.realBuilder = this.realBuilder.lt(column, value);
    return this;
  }
  like(column, value) {
    this.filters.push({ type: "like", column, value });
    this.realBuilder = this.realBuilder.like(column, value);
    return this;
  }
  ilike(column, value) {
    this.filters.push({ type: "ilike", column, value });
    this.realBuilder = this.realBuilder.ilike(column, value);
    return this;
  }
  in(column, values) {
    this.inFilters.push({ column, values });
    this.realBuilder = this.realBuilder.in(column, values);
    return this;
  }
  order(column, options) {
    const ascending = options?.ascending !== false;
    this.orderBy.push({ column, ascending });
    this.realBuilder = this.realBuilder.order(column, options);
    return this;
  }
  limit(limit) {
    this.limitValue = limit;
    this.realBuilder = this.realBuilder.limit(limit);
    return this;
  }
  single() {
    this.isSingle = true;
    this.realBuilder = this.realBuilder.single();
    return this;
  }
  maybeSingle() {
    this.isSingle = true;
    this.realBuilder = this.realBuilder.maybeSingle();
    return this;
  }
  async then(onfulfilled, onrejected) {
    try {
      if (this.operation === "insert" || this.operation === "update" || this.operation === "delete") {
        let supabaseResult = null;
        let supabaseError = null;
        try {
          supabaseResult = await this.realBuilder;
          if (supabaseResult?.error) {
            supabaseError = supabaseResult.error;
          }
        } catch (e) {
          supabaseError = e;
        }
        if (isTursoConfigured()) {
          try {
            await this.executeOnTurso();
            console.log(`[ResilientDB] Synced write operation (${this.operation}) on table "${this.table}" to Turso.`);
          } catch (tursoErr) {
            console.error(`[ResilientDB] Turso sync write failed:`, tursoErr);
          }
        }
        if (supabaseError) {
          console.warn(`[ResilientDB] Supabase write failed. Falling back to Turso... Error:`, supabaseError);
          if (isTursoConfigured()) {
            const result2 = { data: this.payload || [], error: null };
            return onfulfilled ? onfulfilled(result2) : result2;
          }
          const failResult = { data: null, error: supabaseError };
          return onfulfilled ? onfulfilled(failResult) : failResult;
        }
        return onfulfilled ? onfulfilled(supabaseResult) : supabaseResult;
      }
      let result;
      try {
        result = await this.realBuilder;
        if (result?.error) {
          throw result.error;
        }
      } catch (err) {
        console.warn(`[ResilientDB] Supabase read failed on "${this.table}". Falling back to Turso. Error:`, err);
        if (isTursoConfigured()) {
          try {
            const tursoData = await this.executeOnTurso();
            const failoverResult = { data: tursoData, error: null };
            return onfulfilled ? onfulfilled(failoverResult) : failoverResult;
          } catch (tErr) {
            console.error(`[ResilientDB] Turso fallback read failed:`, tErr);
          }
        }
        const failResult = { data: null, error: err };
        return onfulfilled ? onfulfilled(failResult) : failResult;
      }
      return onfulfilled ? onfulfilled(result) : result;
    } catch (e) {
      if (onrejected) {
        return onrejected(e);
      }
      throw e;
    }
  }
  async executeOnTurso() {
    const bindings = [];
    let sql = "";
    if (this.operation === "select") {
      let countValue = null;
      if (this.selectOptions?.count) {
        let countSql = `SELECT COUNT(*) as cnt FROM ${this.table}`;
        const countBindings = [];
        const countWhereParts = [];
        if (this.filters.length > 0) {
          this.filters.forEach((f) => {
            countBindings.push(f.value);
            const op = f.type === "eq" ? "=" : f.type === "neq" ? "!=" : f.type === "gt" ? ">" : f.type === "lt" ? "<" : "LIKE";
            countWhereParts.push(`${f.column} ${op} ?`);
          });
        }
        if (this.inFilters.length > 0) {
          this.inFilters.forEach((f) => {
            f.values.forEach((v) => countBindings.push(v));
            const placeholders = f.values.map(() => "?").join(", ");
            countWhereParts.push(`${f.column} IN (${placeholders})`);
          });
        }
        if (countWhereParts.length > 0) {
          countSql += ` WHERE ${countWhereParts.join(" AND ")}`;
        }
        const countRes = await turso.execute({ sql: countSql, args: countBindings });
        countValue = Number(countRes.rows[0]?.[0] || 0);
      }
      if (this.selectOptions?.head && countValue !== null) {
        return { data: null, count: countValue };
      }
      sql = `SELECT ${this.selectFields} FROM ${this.table}`;
      const whereParts = [];
      if (this.filters.length > 0) {
        this.filters.forEach((f) => {
          bindings.push(f.value);
          const op = f.type === "eq" ? "=" : f.type === "neq" ? "!=" : f.type === "gt" ? ">" : f.type === "lt" ? "<" : "LIKE";
          whereParts.push(`${f.column} ${op} ?`);
        });
      }
      if (this.inFilters.length > 0) {
        this.inFilters.forEach((f) => {
          f.values.forEach((v) => bindings.push(v));
          const placeholders = f.values.map(() => "?").join(", ");
          whereParts.push(`${f.column} IN (${placeholders})`);
        });
      }
      if (whereParts.length > 0) {
        sql += ` WHERE ${whereParts.join(" AND ")}`;
      }
      if (this.orderBy.length > 0) {
        const orderClauses = this.orderBy.map((o) => `${o.column} ${o.ascending ? "ASC" : "DESC"}`);
        sql += ` ORDER BY ${orderClauses.join(", ")}`;
      }
      if (this.limitValue !== null) {
        sql += ` LIMIT ${this.limitValue}`;
      }
      const res = await turso.execute({ sql, args: bindings });
      const rows = res.rows.map((row) => {
        const obj = {};
        res.columns.forEach((col, idx) => {
          let val = row[idx];
          if (typeof val === "string" && (val.startsWith("{") || val.startsWith("["))) {
            try {
              val = JSON.parse(val);
            } catch (e) {
            }
          }
          obj[col] = val;
        });
        return obj;
      });
      let finalRows = rows;
      if (this.isSingle) {
        finalRows = rows[0] || null;
      }
      if (countValue !== null) {
        return { data: finalRows, count: countValue };
      }
      return finalRows;
    } else if (this.operation === "insert") {
      const rows = Array.isArray(this.payload) ? this.payload : [this.payload];
      for (const row of rows) {
        const cols = Object.keys(row);
        const placeholders = cols.map(() => "?");
        const vals = cols.map((c) => {
          let val = row[c];
          if (typeof val === "object" && val !== null) {
            val = JSON.stringify(val);
          }
          return val;
        });
        sql = `INSERT INTO ${this.table} (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`;
        await turso.execute({ sql, args: vals });
      }
      return this.payload;
    } else if (this.operation === "update") {
      const cols = Object.keys(this.payload);
      const setClauses = cols.map((c) => {
        let val = this.payload[c];
        if (typeof val === "object" && val !== null) {
          val = JSON.stringify(val);
        }
        bindings.push(val);
        return `${c} = ?`;
      });
      sql = `UPDATE ${this.table} SET ${setClauses.join(", ")}`;
      if (this.filters.length > 0) {
        const filterClauses = this.filters.map((f) => {
          bindings.push(f.value);
          const op = f.type === "eq" ? "=" : f.type === "neq" ? "!=" : f.type === "gt" ? ">" : f.type === "lt" ? "<" : "LIKE";
          return `${f.column} ${op} ?`;
        });
        sql += ` WHERE ${filterClauses.join(" AND ")}`;
      }
      await turso.execute({ sql, args: bindings });
      return this.payload;
    } else if (this.operation === "delete") {
      sql = `DELETE FROM ${this.table}`;
      if (this.filters.length > 0) {
        const filterClauses = this.filters.map((f) => {
          bindings.push(f.value);
          const op = f.type === "eq" ? "=" : f.type === "neq" ? "!=" : f.type === "gt" ? ">" : f.type === "lt" ? "<" : "LIKE";
          return `${f.column} ${op} ?`;
        });
        sql += ` WHERE ${filterClauses.join(" AND ")}`;
      }
      await turso.execute({ sql, args: bindings });
      return { success: true };
    }
  }
}
function wrapSupabaseClient(supabaseClient) {
  if (!supabaseClient) return supabaseClient;
  const originalFrom = supabaseClient.from;
  if (originalFrom && !originalFrom.__wrapped) {
    supabaseClient.from = function(table) {
      const originalBuilder = originalFrom.call(supabaseClient, table);
      return new ResilientQueryBuilder(table, originalBuilder);
    };
    supabaseClient.from.__wrapped = true;
  }
  return supabaseClient;
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://dlccdpfapqutnhqpcmrv.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsY2NkcGZhcHF1dG5ocXBjbXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NDQwODIsImV4cCI6MjA5NTUyMDA4Mn0.TztKqYShkeYn48FDeFcpN7kOQilQsEZ3zTBmgMYIowU";
  return createClient$1(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) {
      _supabase = wrapSupabaseClient(createSupabaseClient());
    }
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
