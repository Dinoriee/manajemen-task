import { prisma } from "@/lib/prisma";
import TaskList from "@/components/TaskList";
import Link from "next/link";

export default async function TaskPages() {
  const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      tasks: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  });
  
  return (
    <div className="p-8">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-6">Daftar Tugas per User</h1>
        <Link
        href={"/tasks/create"}
        className="border border-gray-600 h-12 rounded-sm flex items-center w-48 justify-center hover:border-green-500 transition-all duration-200 group"
        >
            <h1 className="text-center text-gray-300 group-hover:text-green-400 transition-all duration-200">+ Tambahkan Tugas</h1>
        </Link>
      </div>
      

      {users.length === 0 ? (
        <div className="min-h-[50vh] flex justify-center items-center">
           <h1 className="text-gray-500">Belum ada user atau tugas.</h1>
        </div>
      ) : (
        <TaskList usersData={users} /> 
      )}
    </div>
  )
}