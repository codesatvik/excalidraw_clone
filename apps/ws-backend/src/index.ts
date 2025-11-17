import "dotenv/config";
import { WebSocketServer } from "ws"
import { JWTSECRET } from "@repo/backend-common"
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
    try {
        const url = request.url;
        if (!url) {
            ws.close(1008, "Missing token");
            return;
        }

        const queryParams = new URLSearchParams(url.split('?')[1]);
        const token = queryParams.get('token') || "";

        if (!token) {
            ws.close(1008, "Missing authorization token");
            return;
        }

        const decoded = jwt.verify(token, JWTSECRET) as JwtPayload;

        if (!decoded?.userId) {
            ws.close(1008, "Invalid token");
            return;
        }

        (ws as any).userId = decoded.userId;

        ws.on('message', function message(data) {
            ws.send('pong');
        });
    } catch (error) {
        ws.close(1008, "Authentication failed");
    }
})