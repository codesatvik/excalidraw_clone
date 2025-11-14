import express from "express";
import jwt from "jsonwebtoken"
import { JWTSECRET } from "@repo/backend-common";
import { middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common1/types"
const app = express();

app.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.status(400).json({
            message: "Incorrect inputs",
            errors: data.error.flatten()
        });
        return;
    }
    // TODO: Implement user creation in database
    res.status(201).json({
        userId: "123"
    });
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
    // TODO: Verify user credentials against database
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
    // TODO: Implement room creation in database with authenticated user
    res.status(201).json({
        roomId: "123"
    });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`HTTP Backend listening on port ${PORT}`);
});