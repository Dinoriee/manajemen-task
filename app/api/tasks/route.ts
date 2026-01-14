import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    try{
        const body = await request.json();
        const { title, userId, desc, isCompleted } = body;

        if (!title || !userId){
            return NextResponse.json(
                {error: "Title dan id user harus di isi"},
                {status: 400}
            );
        }

        const newTask = await prisma.task.create({
            data: {
                title: title,
                userId: Number(userId),
                desc: desc,
                isCompleted: false,
            },
        });
        return NextResponse.json(newTask, {status: 201});
    } catch (error){
        console.error("Error creating task:", error);
        return NextResponse.json(
            {error : "Gagal membuat task"},
            {status: 500}
        );
    }
}

export async function PATCH(request: Request){
    try{
        const body = await request.json();
        const { title, userId, desc, isCompleted, id } = body;

        if (!id){
            return NextResponse.json(
                {error: "Task tidak ditemukan."},
                {status: 400}
            );
        }

        const editTask = await prisma.task.update({
            where:{
                id: Number(id),
            },
            data: {
                ...(title && {title}),
                ...(desc && {desc}),
                ...(userId && {userId: Number(userId)}),
                ...(isCompleted !== undefined && {isCompleted}),
            },
        });
        return NextResponse.json(editTask, {status: 201});
    } catch (error){
        console.error("Error editing task:", error);
        return NextResponse.json(
            {error : "Gagal mengupdate task"},
            {status: 500}
        );
    }
}

export async function DELETE(request: Request){
    try{
        const body = await request.json();
        const { title, userId, desc, isCompleted, id } = body;

        if (!id){
            return NextResponse.json(
                {error: "Task tidak ditemukan."},
                {status: 400}
            );
        }

        const deleteTask = await prisma.task.delete({
            where:{
                id: Number(id),
            }
        });
        return NextResponse.json(deleteTask, {status: 201});
    } catch (error){
        console.error("Error deleting task:", error);
        return NextResponse.json(
            {error : "Gagal menghapus task"},
            {status: 500}
        );
    }
}