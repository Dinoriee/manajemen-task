import TaskForm from "@/components/TaskForm";
import { prisma } from "@/lib/prisma";

export default async function CreateTaskUser() {
    const users = await prisma.user.findMany({
        orderBy: { name: 'asc' }
    });
    
    return(
        <TaskForm users={users}/>
    )
    
}