import { NextFunction, Request, Response } from "express";
import { JWTSECRET } from "@repo/backend-common";
import jwt from "jsonwebtoken";



export function middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "") ?? "";
        
        if (!token) {
            res.status(401).json({
                message: "Missing authorization token"
            });
            return;
        }

        const decoded = jwt.verify(token, JWTSECRET);
        if (decoded && typeof decoded === "object" && "userId" in decoded) {
            (req as any).userId = decoded.userId;
            next();
        } else {
            res.status(401).json({
                message: "Invalid token"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}