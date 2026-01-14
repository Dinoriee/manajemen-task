import TaskForm from "@/components/TaskForm";
import { prisma } from "@/lib/prisma";

interface EditPageProps {
  params: { id: string };
}

export default async function EditTaskUser({ params }: EditPageProps) {  const { id } = await params;

  const task = await prisma.task.findUnique({
    where: { id: Number(id) },
  });

  if (!task) {
    notFound();
  }

  const users = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  return <TaskForm users={users} dataUser={task} />;
}