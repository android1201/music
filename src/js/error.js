process.on('unhandledRejection', (err) => console.log(`Unhandled Rejection: ${err}`));
process.on('uncaughtException', (err) => console.log(`Uncaught Exception: ${err}`));