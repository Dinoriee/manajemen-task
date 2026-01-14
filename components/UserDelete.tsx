"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({userId} : {userId: number}){
    const router = useRouter();
    const [isDelete, setIsDelete] = useState(false);


    async function handleDelete() {
        const confirm = window.confirm("Apakah anda ingin menghapus user ini?");
        if(!confirm) return;

        setIsDelete(true);

        try{
            const res = await fetch("/api/users", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: userId}),
            });

            if (res.ok){
                router.refresh();
            } else{
                alert("Gagal menghapus user");
            }
        }catch(error){
            console.error(error);
        }finally{
            setIsDelete(false);
        }
    }

    return(
        <button onClick={handleDelete} className="block mt-4 border border-gray-100 rounded-sm w-32 min-h-14 max-h-14 hover:border-red-600 hover transition-all duration-300 ease-in-out">
                <h1>Hapus User</h1>
        </button>
    )
}