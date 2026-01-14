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

      <ul className="mt-6 space-y-2">
        {user.tasks.map(task => (
          <li key={task.id} className="border p-2">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}