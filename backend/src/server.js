import app from './app.js';
import prisma from './libs/prisma.js';

const PORT = process.env.PORT || 5000;

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log(' Database connected successfully');
  } catch (error) {
    console.error(' Database connection failed:', error);
    process.exit(1);
  }
}

async function startServer() {
  await connectDatabase();
  
  app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}
process.on('SIGINT', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
