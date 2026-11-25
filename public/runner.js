const send = value => self.postMessage(value);
const format = value => typeof value === 'string' ? value : JSON.stringify(value) ?? String(value);
const print = (...values) => send({line:values.map(format).join(' ')});
self.onmessage = async ({data:{lang,code,wasmBinary}}) => {
  try {
    if (lang === 'SQL') {
      const SQL = await initSqlJs({wasmBinary});
      const db = new SQL.Database();
      db.run("CREATE TABLE customers(id INTEGER PRIMARY KEY, name TEXT); CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER, status TEXT); INSERT INTO customers VALUES (1,'Nila'),(2,'Sam'); INSERT INTO orders VALUES (1,1,'paid'),(2,1,'paid'),(3,2,'pending');");
      for (const result of db.exec(code)) {
        print(result.columns.join(' | '));
        for (const row of result.values) print(row.map(format).join(' | '));
      }
      db.close();
    } else {
      const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
      await new AsyncFunction('console',code)(Object.freeze({log:print,info:print,warn:print,error:print,table:print}));
    }
    send({done:true});
  } catch (error) {
    send({line:error.name+': '+error.message,done:true});
  }
};
