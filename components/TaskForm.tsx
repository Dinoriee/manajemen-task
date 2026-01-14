"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

type User = {
  id: number;
  name: string;
};

interface TaskFormProps {
  users: User[];
  dataUser?:{
    id: number;
    title: string;
    desc: string;
    isCompleted: boolean;
  } 
}

export default function TaskForm({ users, dataUser }: TaskFormProps) {
  const path = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = path.includes("/edit") || !!dataUser;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const desc = formData.get("desc");
    const userId = formData.get("userId"); // Ambil ID user yang dipilih dari dropdown

    try {
      if (isEdit && dataUser) {
        await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            id: dataUser.id,
            title, 
            desc, 
            userId 
          }),
        });
      }else{
        await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, desc, userId }),
      });
      }
      router.refresh();
      router.push("/tasks");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-lg border shadow-sm">
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Judul Tugas</label>
        <input 
          name="title" 
          type="text" 
          required
          defaultValue={isEdit ? dataUser?.title : ""} 
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Contoh: Menambahkan fitur hapus" 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea 
          name="desc"
          defaultValue={isEdit ? dataUser?.desc : ""}  
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500" 
          placeholder="Detail tugas..." 
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tugaskan Kepada</label>
        <select 
          name="userId" 
          required 
          defaultValue={isEdit ? dataUser?.userId : ""}
          disabled={isEdit} 
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 bgoutline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled className="bg-gray-900">-- Pilih User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id} className="bg-gray-900">
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {isEdit && (
        <div className="flex items-center gap-3 p-3 border border-gray-700 rounded-md bg-gray-800/50">
          <input 
            type="checkbox" 
            name="isCompleted" 
            id="isCompleted"
            // Set default checked sesuai data database
            defaultChecked={dataUser?.isCompleted} 
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isCompleted" className="text-sm font-medium text-gray-300 cursor-pointer select-none">
            Tandai sebagai <strong>Selesai</strong>
          </label>
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300 transition"
        >
          {isLoading ? "Menyimpan..." : "Simpan Tugas"}
        </button>
      </div>
    </form>
  );
}