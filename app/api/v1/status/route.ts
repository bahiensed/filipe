// app/api/v1/status/route.ts
import os from 'os';
import connection from '@/database/connection';
  
export async function GET(request: Request) {
  try {
    // start time for response time calculation
    const startTime = Date.now();

    // app version from package.json
    const appVersion = require('@/package.json').version;
    // uptime in seconds
    const uptime = process.uptime(); // Time since Node.js process started (in seconds)

    // database
    // database version
    const databaseVersionResult = await connection({ text: "SHOW server_version;" });
    const databaseVersion = databaseVersionResult.rows[0].server_version;
    // database connections
    const databaseMaxConnectionsResult = await connection({ text: "SHOW max_connections;" });
    const databaseMaxConnections = parseInt(databaseMaxConnectionsResult.rows[0].max_connections);
    // database open connections
    const databaseOpenConnectionsResult = await connection({ text: "SELECT count(*) FROM pg_stat_activity WHERE datname = 'local_db';" });
    console.log(databaseOpenConnectionsResult.rows.length);
    const databaseOpenConnections = parseInt(databaseOpenConnectionsResult.rows[0].count);


    // memory usage
    const memoryUsage = process.memoryUsage(); // Returns heap and external memory usage

    // CPU usage
    const cpuInfo = os.cpus();
    const cpuUsage = cpuInfo.map(cpu => cpu.times);

    // response time
    const responseTime = Date.now() - startTime; // in milliseconds

    // create status object
    const status = {
      timestamp: new Date().toISOString(),
      app: {
        version: appVersion,
        uptime: `${Math.floor(uptime / 86400)}d ${Math.floor((uptime % 86400) / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`,
      },
      database: {
        version: databaseVersion,
        max_connections: databaseMaxConnections,
        open_connections: databaseOpenConnections,
      },
      memory_usage: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`, // resident set size
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`, // total heap
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`, // used heap
      },
      cpu_usage: cpuUsage, // detailed CPU times
      response_time: `${responseTime}ms`, // response time in ms
    };

    // return status as a JSON response
    return new Response(JSON.stringify(status), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Database query status error:', error);
    throw error;      
  }
}
