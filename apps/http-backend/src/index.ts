import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken"
import { JWTSECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common1/types"
import { prismaClient } from "@repo/db";
import cors from "cors";

const app = express();
app.use(express.json())
app.use(cors())

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
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.status(201).json({
            userId: user.id
        });
    } catch (err) {
        const anyErr = err as any;
        if (anyErr?.code === 'P2002') {
            res.status(409).json({ message: 'User already exists with this username' });
            return;
        }

        if (anyErr?.name === 'PrismaClientInitializationError') {
            console.error('Prisma initialization error:', anyErr);
            res.status(503).json({ message: 'Database unavailable' });
            return;
        }

        console.error('Signup error:', anyErr);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: parsedData.error.flatten()
        });
        return;
    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,
            password: parsedData.data.password,
        }
    })
    if (!user) {
        res.status(403).json({
            message: "Not authorized"
        })
        return
    }
    const token = jwt.sign({ userId: user.id }, JWTSECRET);
    res.status(200).json({
        token
    });
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: parsedData.error.flatten()
        });
        return;
    }
    // @ts-ignore
    const userId = req.userId;
    try {

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })
        res.status(201).json({
            roomId: room.id
        });
    } catch (e) {
        res.status(411).json({
            message: "Room already exists with this name",
            e
        })
    }
})
app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 700
    });
    res.json({

        messages
    })
})
app.get("/chats/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        },
    });
    res.json({
        room
    })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HTTP Backend listening on port ${PORT}`);
});