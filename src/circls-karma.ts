import { connectDB, serveHTTP, subscribeAMQP } from './server';

async function main() {
  await connectDB();
  await serveHTTP();
  await subscribeAMQP();
}

main();
