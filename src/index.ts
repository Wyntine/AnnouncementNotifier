import { AnnouncementServer } from "./classes/Server.ts";

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
// TODO: Wrap server.start() in try/catch; handle port-in-use and other startup errors
await server.start();
