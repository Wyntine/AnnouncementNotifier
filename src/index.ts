import { AnnouncementServer } from "./classes/Server.js";

const server = new AnnouncementServer();

// Handle graceful shutdown
process.on("SIGINT", () => {
  void (async () => {
    console.log("\n[Server] Shutting down...");
    await server.stop();
    process.exit(0);
  })();
});

process.on("SIGTERM", () => {
  void (async () => {
    console.log("\n[Server] Shutting down...");
    await server.stop();
    process.exit(0);
  })();
});

// Start the server
await server.start();
