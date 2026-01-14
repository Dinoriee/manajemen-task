import { prisma } from "@/lib/prisma";
import TaskForm from "@/components/TaskForm";

// Page props type di Next.js 16
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: { tasks: true }
  });

  if (!user) return <div>User tidak ditemukan</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{user.name}</h1>

      {user.tasks.length == 0 ? (
        <p className="text-gray-500 mt-4">User tidak memiliki tugas.</p>
      ) : (
        <ul className="mt-6 space-y-2">
        {user.tasks.map(task => (
          <li key={task.id} className={`border p-2 flex justify-between ${task.isCompleted ? 'border-green-300 text-green-600' : ''}`}>
            {task.title}
            {task.isCompleted ? (
            <p className="border min-w-24 text-center rounded-sm bg-green-600 text-gray-900">Selesai</p>
          ) : (
            <p className="border min-w-24 text-center rounded-sm bg-amber-300 text-gray-900">On Progress</p>
          )}
          </li>
        ))}
      </ul>
      )}
      
    </div>
  );
}