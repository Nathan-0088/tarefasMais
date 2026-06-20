import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { VscArchive } from "react-icons/vsc";

export default function Header() {
  const { data: seccion, status } = useSession();

  return (
    <header className="max-w-7xl w-11/12 mx-auto rounded-4xl bg-white py-4 px-15 mt-4 ">
      <nav className="flex justify-between flex-col items-center gap-2 md:flex-row">
        <div className="flex gap-8 items-center">
          <Link
            href="/"
            className="font-bold text-2xl text-center transition-all hover:opacity-70"
          >
            Tarefas<span className="text-slate-700">+</span>
          </Link>

          {seccion?.user && (
            <Link
              href="/dashboard"
              className="transition-all hover:opacity-80 hover:scale-95"
            >
              <VscArchive size={30} />
            </Link>
          )}
        </div>

        {status === "loading" ? (
          <span>Loading...</span>
        ) : seccion ? (
          <button
            onClick={() => signOut()}
            className="px-2 py-1 border-2 text-slate-600 rounded-2xl transition-all hover:opacity-70 cursor-pointer flex gap-3 items-center"
          >
            Olá {seccion.user?.name}
            <img src={seccion.user?.image as string} className="max-h-10 rounded-2xl"/>
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="px-2 py-1 border-2 text-slate-600 rounded-2xl transition-all hover:opacity-70"
          >
            <Link href="#">Entrar na contra</Link>
          </button>
        )}
      </nav>
    </header>
  );
}
