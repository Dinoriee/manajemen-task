"use client";
import { POST } from "@/app/api/tasks/route";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");

        try{
            const res = await fetch("/api/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ name, email }),
            });

        if (res.ok) {
            router.refresh();
            router.push("/users");
        } else
            {
            alert("Gagal menambahkan data");
            }
        } catch (error) {
            console.error(error);
            alert("Telah terjadi kesalahan");
        } finally {
            setIsLoading(false);
        }
    }
  
    return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg">
      <div>
        <label htmlFor="name" className="block text-sm text-gray-700">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Masukkan nama..."
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-0 focus:border-blue-500 transition-colors duration-150"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="contoh@email.com"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-0 focus:border-blue-500 transition-colors duration-150"
          required
          disabled={isLoading}
        />
      </div>

      {/* Tombol Action */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
        >
          {isLoading ? "Menyimpan..." : "Simpan User"}
        </button>
        
        <button 
          onClick = {() => router.back()}
          className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-500 transition"
        >
          Batal
        </button>
      </div>
    </form>
  );
}