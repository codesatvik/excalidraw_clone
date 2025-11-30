
import { RoomCanvas } from "@/components/RoomCanvas";
import { cookies } from "next/headers";
import { initDraw } from "@/draw";
//import { useEffect, useRef } from "react"

export default async function CanvasPage({ params }: {
    params: {
        roomId: string
        
    }
}) {
    const roomId =(await params).roomId;
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value || "";
    return <RoomCanvas roomId={roomId} token={token} />
}