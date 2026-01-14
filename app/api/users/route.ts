import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    try{
        const body = await request.json();
        const {name, email} = body;

        if(!name || !email){
            return NextResponse.json(
                {error:"Nama dan Email tidak boleh kosong."},
                {status: 400}
            );
        }

        const newUser = await prisma.user.create({
            data : {
                name: name,
                email: email
            },
        });
        return NextResponse.json(newUser, {status: 201});
    } catch(error){
        console.error("Gagal menambahkan user", error);
        return NextResponse.json(
            {error : "Gagal membuat user"},
            {status: 500}
        );
    }
}

export async function DELETE(request: Request) {
    try{
        const { id } =await request.json();

        await prisma.user.delete({
            where: {id: Number(id)}
        });

        return NextResponse.json({message: "User dihapus"});
    }catch(error){
        return NextResponse.json({error: "Gagal dihapus"}, {status: 500});
    }
}