import express from "express";
import jwt from "jsonwebtoken"
import { JWTSECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common1/types"
import { prismaClient } from "@repo/db/client"
const app = express();

app.post("/signup", async (req, res) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: parsedData.error.flatten()
        });
        return;
    }
    try {
        await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                password: parsedData.data.password,
                name:parsedData.data.name
            }
        })
        res.status(201).json({
         userId: "123"
       });
    } catch (e) {
        res.status(411).json({
            e,
            message:  "User already exists with this username"
        })
    }

    
    
})

app.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: data.error.flatten()
        });
        return;
    }
    const userId = 1;
    const token = jwt.sign({ userId }, JWTSECRET);
    res.status(200).json({
        token
    });
})

app.post("/room", middleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: data.error.flatten()
        });
        return;
    }
    res.status(201).json({
        roomId: "123"
    });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HTTP Backend listening on port ${PORT}`);
});