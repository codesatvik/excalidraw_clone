import { NextFunction, Request, Response } from "express";
import { JWTSECRET } from "@repo/backend-common/config";
import jwt from "jsonwebtoken";



export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"] ?? ""; 
    const decoded = jwt.verify(token, JWTSECRET);

    if (decoded) {
       // @ts-ignore
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).json({
            messagae:"Unauthorized"
        })
    }
}