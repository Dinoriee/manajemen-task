import UserForm from "@/components/UserForm";

export default function CreateUserPage() {
  return (
    <div className="p-8 min-h-screen max-w-md mx-auto flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Tambah User Baru</h1>
      <UserForm />
    </div>
  )
}