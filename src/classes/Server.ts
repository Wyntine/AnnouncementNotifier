import { YamlDatabase } from "./YamlDatabase.ts";
import type { Server, IncomingMessage, ServerResponse } from "node:http";
import { WebSocketServer, WebSocket } from "ws";
import { parse } from "yaml";
import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { createServer } from "node:http";
import { Checker } from "./Checker.js";

const SCHEDULE_INTERVAL = 60 * 60 * 1000; // 1 hour

export class AnnouncementServer {
  private httpServer: Server | null = null;
  private wss?: WebSocketServer;
  private checker: Checker;
  private database: YamlDatabase;
  private intervalId: NodeJS.Timeout | null = null;

  constructor() {
    this.checker = new Checker();
    this.database = new YamlDatabase();
    this.startAutoRefresh();
  }

  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const dbDir = join(".", "database");
        if (!existsSync(dbDir)) {
          mkdirSync(dbDir, { recursive: true });
        }

        this.httpServer = createServer((req, res) => {
          this.handleRequest(req, res);
        });

        this.wss = new WebSocketServer({
          server: this.httpServer,
          path: "/events",
        });

        this.wss.on("connection", (ws: WebSocket) => {
          this.handleWebSocket(ws);
        });

        this.httpServer.listen(3000, () => {
          console.log("[Server] HTTP server listening on :3000");
          console.log(
            "[Server] WebSocket events endpoint at ws://localhost:3000/events",
          );
          resolve();
        });

        this.httpServer.on("error", reject);
      } catch (error) {
        if (error instanceof Error) {
          reject(error);
        } else {
          console.error("Unknown error:", error);
          reject(new Error("Unknown error occured"));
        }
      }
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }

      if (this.httpServer) {
        this.httpServer.close(() => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const url = new URL(req.url ?? "/", "http://localhost");

    switch (url.pathname) {
      case "/health":
        this.handleHealth(res);
        break;

      case "/announcements":
        this.handleGetAnnouncements(req, res);
        break;

      case "/subscribe":
        this.handleSubscribe(res);
        break;

      case "/unsubscribe":
        this.handleUnsubscribe(res);
        break;

      case "/events":
        res.writeHead(400);
        res.end("WebSocket endpoint");
        break;

      default:
        res.writeHead(404);
        res.end("Not Found");
    }
  }

  private handleHealth(res: ServerResponse): void {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "ok",
        uptime: process.uptime(),
        lastChecked: this.database.getLastChecked(),
      }),
    );
  }

  private handleGetAnnouncements(
    req: IncomingMessage,
    res: ServerResponse,
  ): void {
    const queryString = req.url?.split("?")[1] ?? "";
    const urlParams =
      queryString ? (parse(queryString) as Record<string, unknown>) : {};
    const parsers =
      Array.isArray(urlParams["parsers"]) ?
        (urlParams["parsers"] as string[])
      : [];
    const after = parseInt((urlParams["after"] as string) || "0", 10);

    const announcements = this.database.getAnnouncements({
      parsers: parsers.length ? parsers : [],
      after,
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(announcements));
  }

  private handleSubscribe(res: ServerResponse): void {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Subscription registered (requires authentication)",
      }),
    );
  }

  private handleUnsubscribe(res: ServerResponse): void {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Unsubscription registered (requires authentication)",
      }),
    );
  }

  private handleWebSocket(ws: WebSocket): void {
    let subscribedParsers: string[] = [];

    ws.on("message", (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString()) as Record<string, unknown>;

        if (message["type"] === "subscribe") {
          subscribedParsers =
            (message["parsers"] as string[] | undefined) ?? [];
          console.log(
            `[WebSocket] Client subscribed to: ${subscribedParsers.join(", ")}`,
          );

          const unread = this.database.getAnnouncements({
            parsers: subscribedParsers,
          });
          ws.send(
            JSON.stringify({
              type: "sync",
              announcements: unread,
            }),
          );
        } else if (message["type"] === "unsubscribe") {
          subscribedParsers = [];
          console.log("[WebSocket] Client unsubscribed");
        }
      } catch (error) {
        console.error("[WebSocket] Invalid message:", error);
      }
    });

    ws.on("close", () => {
      console.log("[WebSocket] Client disconnected");
    });

    ws.on("error", (error: Error) => {
      console.error("[WebSocket] Connection error:", error);
    });
  }

  private startAutoRefresh(): void {
    this.intervalId = setInterval(() => {
      void (async () => {
        console.log(`[Server] Auto-refreshing announcements...`);
        try {
          const announcements = await this.checker.refresh();
          this.database.addAnnouncements(announcements);
          this.database.updateLastChecked();
          await this.database.save();
          console.log(
            `[Server] Refreshed ${announcements.length.toString()} announcements`,
          );

          if (this.wss && this.wss.clients.size > 0) {
            const allAnnouncements = this.database.getAnnouncements();

            for (const client of this.wss.clients) {
              try {
                client.send(
                  JSON.stringify({
                    type: "updates",
                    announcements: allAnnouncements,
                  }),
                );
              } catch (e) {
                console.error("[Server] Failed to send updates:", e);
              }
            }
          }
        } catch (error) {
          console.error("[Server] Error during refresh:", error);
        }
      })();
    }, SCHEDULE_INTERVAL);
  }
}
