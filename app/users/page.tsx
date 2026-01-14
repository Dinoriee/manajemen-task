import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DeleteButton from "@/components/UserDelete";

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        include: {
            tasks: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });


    return (
    <div className="p-8 ">
      {users.length === 0 ? (
        <div className="min-h-screen text-gray-500 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 ">Belum ada user. Silakan tambahkan user baru.</p>
        <Link 
        href="users/create" 
        className="flex w-32 h-8 border-2 border-gray-500 text-gray-200 rounded-2xl justify-center items-center hover:border-gray-200 hover:text-white transition-colors duration-200 ease-in-out">
          Tambah User
        </Link>
        </div>
      ) : (
      <>
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold mb-6">Daftar Pengguna</h1>
        <Link 
        href="users/create" 
        className="flex w-48 h-12 border-2 border-gray-500 text-gray-200 rounded-2xl justify-center items-center hover:border-gray-200 hover:text-white transition-colors duration-200 ease-in-out">
          Tambah User
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            
            <div className="mt-4 text-sm border border-gray-500 p-2 rounded">
              <p>Total Tasks: {user.tasks.length}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Link 
              href={`/users/${user.id}`} 
              className="block mt-4 text-gray-100 border max-w-xl p-4 rounded-sm hover:border-blue-500 transition-all duration-200 ease-in-out min-h-14 max-h-14"
              >
                Lihat Detail &rarr;
              </Link>
              <DeleteButton userId={user.id}/>
            </div>
          </div>
        ))}
      </div>
      </>)}
    </div>
  );
}