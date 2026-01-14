"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  desc: string;
  isCompleted: boolean;
  createdAt: Date;
};

type UserWithTasks = {
  id: number;
  name: string;
  email: string;
  tasks: Task[];
};

export default function TaskList({ usersData }: { usersData: UserWithTasks[] }) {
    const [isDelete, setIsDelete] = useState(false);
    const router = useRouter();

    async function handleDelete(taskId: Number){
        const confirm = window.confirm("Apakah anda yakin ingin menghapus task ini?");
        if(!confirm) return;
        setIsDelete(true);

        try{
            const res = await fetch("/api/tasks", {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: taskId})
            });

            if(res.ok){
                router.refresh();
            }else{
                alert("Gagal Menghapus Task");
            }
        }catch(error){
            console.error(error);
        }finally{
            setIsDelete(false);
        }

    }

    return (
    <div className="space-y-8">
      {usersData.map((user) => (
        <div key={user.id} className=" p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4 flex items-center gap-3 border-b pb-2">
            <h2 className="text-lg font-bold text-gray-200">{user.name}</h2>
            <span className="text-xs bg-gray-600 px-2 py-1 rounded text-gray-200">
              {user.tasks.length} Tugas
            </span>
          </div>

          {user.tasks.length === 0 ? (
            <p className="text-sm text-gray-400 italic">Tidak ada tugas.</p>
          ) : (
            <div className="grid gap-3">
              {user.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={"p-3 rounded border flex justify-between"}
                >
                  <div className="flex flex-col justify-evenly">
                      <h3 className={`font-semibold text-sm ${task.isCompleted ? 'line-through text-gray-400' : 'text-gray-200'}`}>
                        {task.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{task.desc}</p>
                  </div>
                  
                <div className="">
                    {task.isCompleted ? (
                        <p>Selesai</p>
                    ) : (
                        <p className="flex border border-amber-300 text-amber-300 rounded-sm min-h-12 min-w-36 justify-center items-center">On Progress</p>
                    )}
                    <div className="flex justify-between mt-2 gap-4">
                        <Link
                            href={`/tasks/edit/${task.id}`}
                            className="border w-18 border-blue-500 text-gray-500 hover:border-blue-300 hover:text-blue-400 transition-colors duration-200 ease-in-out text-center rounded-sm"
                        >
                                Edit
                        </Link>
                        <button onClick={() => handleDelete(task.id)} className="border w-18 border-red-500 text-gray-500 hover:border-red-300 hover:text-red-400 transition-colors duration-200 ease-in-out text-center rounded-sm">Hapus</button>
                    </div>
                </div>
                </div>
                
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}