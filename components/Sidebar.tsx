"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(){
    const path = usePathname();
    const menu = [
        {name: "Daftar User", href:"/"},
        {name: "List Tugas", href:"/tasks"},
    ]

    return(
        <div className="w-64 flex flex-col sticky min-h-screen top-0 border-r shrink-0 p-8">
            <div className="mb-10">
                <h1>Aplikasi Manajemen Task</h1>
            </div>
            <nav>
                {menu.map((item) =>{
                    const isActive = path === item.href;
                    return(
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-100 ${isActive ? "text-gray-100 font-medium" : "text-gray-700 hover:text-gray-500"}`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    )
}