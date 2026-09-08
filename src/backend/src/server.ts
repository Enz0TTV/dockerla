import { createServer } from 'node:http';
import { app } from './app.js';
import { env } from './config/env.js';
import { closeDbPool } from './config/database.js';

const server = createServer(app);

const startServer = () => {
  server.listen(3000, () => {
    console.log(`🚀 Server running in ${env.NODE_ENV} mode`);
    console.log(`📡 Listening on http://localhost:3000`);
    console.log(`🩺 Health check: http://localhost:3000/health`);
    console.log(`📦 API Base URL: http://localhost:3000${env.API_PREFIX}`);
  });
};

const gracefulShutdown = async (signal: string) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  try {
    await closeDbPool();
  } catch (dbErr) {
    console.error('Error closing database pool:', dbErr);
  }

  server.close((err) => {
    if (err) {
      console.error('Error during server close:', err);
      process.exit(1);
    }
    console.log('✅ HTTP server closed. Process exiting cleanly.');
    process.exit(0);
  });

  // Force close after 10s if graceful shutdown hangs
  setTimeout(() => {
    console.error('⚠️ Shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('unhandledRejection', (reason) => {
  console.error('💥 Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

startServer();
