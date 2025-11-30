"use client"

import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RoomName() {
    
    const [inputName, setInputName] = useState("");
    const router = useRouter();

    const roomcanvas = async function () {
        if (!inputName) {
            return alert("Enter a room name")
        }
        try {
           const response =  await axios.post("http://localhost:3001/room",{
                "name": inputName
           },{
               withCredentials: true
           })
        
            const roomId = response.data.roomId
            router.push(`/canvas/${roomId}`);
        }catch(e){console.log(e)}
        
    }

    return   <div className="w-screen h-screen flex justify-center items-center radial-gradient(#cbd5e1 1px, transparent 1px) selection:bg-orange-100 selection:text-orange-600">
      <div className="relative bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-8 w-60vh h-60vh selection:bg-orange-100 selection:text-orange-600 rounded">
                
                <div className="flex ">
                    <div className="pr-2">
                        <input name="roomname" className="p-2 w-100 border rounded" type="text" placeholder="Room name" required
                            value={inputName} onChange={(e)=> setInputName(e.target.value)}
                        />
                    </div>
                
                    <div>
                    <button onClick={roomcanvas} className="border p-2 border rounded bg-orange-100 ">
                        Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

