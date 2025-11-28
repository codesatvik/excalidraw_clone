import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape = {
    type: "rect";
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: "circle";
    centerX: number;
    centerY: number;
    radius: number;
} | {
    type: "pencil";
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShape: Shape[]
    private roomId: string;
    private socket: WebSocket;
    private clicked: boolean;
    private startX = 0;
    private startY = 0;
    private selectedTool: Tool = "circle";


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.canvas = canvas;
        this.socket = socket;
        this.ctx = canvas.getContext("2d")!;
        this.roomId = roomId
        this.init();
        this.existingShape = [];
        this.initHandlers();
       
        this.initMouseHandlers();
        this.clicked = false;

    }

    destroy() {
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler.bind(this))
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler.bind(this))
        this.canvas.removeEventListener("mousemove", this.mouseMoveHandlers.bind(this))
    }
    setTool(tool: "circle" | "pencil" | "rect") {
        this.selectedTool = tool;
        this.clearCanvas();

    }
    async init() {
        this.existingShape = await getExistingShapes(this.roomId);
        this.clearCanvas()

    }
    initHandlers() {

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "chat") {
                const parsedShape = JSON.parse(message.message)
                this.existingShape.push(parsedShape.shape)
                this.clearCanvas()
            }
        }

    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.existingShape.map((shape) => {
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                // console.log(`this is ${shape.x}, ${shape.y}, ${shape.width}, ${shape.height}`)
            } else if (shape.type === "circle") {
                if (shape.type === "circle") {
                    this.ctx.beginPath();
                    this.ctx.arc(shape.centerX, shape.centerY, Math.abs(shape.radius), 0, Math.PI * 2);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        })
    }
    mouseDownHandler = (e) => {
        this.clicked = true
        this.startX = e.clientX
        this.startY = e.clientY
    }
    mouseUpHandler = (e) => {
        this.clicked = false;
        const width = e.clientX - this.startX;
        const height = e.clientY - this.startY;
        // @ts-ignore
        const selectedTool = this.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool === "rect") {
            shape = {
                type: "rect",
                x: this.startX,
                y: this.startY,
                height,
                width
            }
        } else if (selectedTool === "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            }
        }
        if (!shape) {
            return;
        }



        this.existingShape.push(shape);
        this.socket.send(JSON.stringify({
            type: "chat",
            message: JSON.stringify({
                shape
            }),
            roomId: this.roomId
        }))

    }

    mouseMoveHandlers= (e) => {
        if (this.clicked) {
            const width = e.clientX - this.startX;
            const height = e.clientY - this.startY;
            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255,255,255)";
            // @ts-ignore
            const selectedTool = this.selectedTool;
            if (selectedTool === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);

            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;

                const centerX = this.startX + radius;
                const centerY = this.startY + radius;
                this.ctx.beginPath()
                this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2)
                this.ctx.stroke()
                this.ctx.closePath()
            }
            // console.log(startX,startY,width,height,e.clientX,e.clientY)

        }
    }
    initMouseHandlers() {
            this.canvas.addEventListener("mousedown", this.mouseDownHandler)
            this.canvas.addEventListener("mouseup", this.mouseUpHandler)

            this.canvas.addEventListener("mousemove", this.mouseMoveHandlers)
        }
}