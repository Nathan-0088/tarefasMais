import Image from "next/image";
import logo from "../../public/assets/hero.png";
import Head from "next/head";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-30 px-5">
      <Head>
        <title>Tarefas Plus</title>
      </Head>

      <main className=" bg-white w-full mx-auto flex flex-col items-center py-10 rounded-2xl">
        <div>
          <Image src={logo} alt="logo" property="type" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 mt-1 text-slate-800">
            Sistema para se organizar <br />
            estudos até tarefas diarias
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full px-12 justify-center text-center">
          <section className="px-3 py-2 bg-slate-700 rounded-md text-white transition-all hover:scale-95 hover:bg-slate-800 select-none">
            <span className="text-lg font-bold">+1000 tarefas</span>
          </section>

          <section className="px-3 py-2 bg-slate-700 rounded-md text-white text-center transition-all hover:scale-95 hover:bg-slate-800 select-none">
            <span className="text-lg font-bold">+50 comentarios</span>
          </section>
        </div>
      </main>
    </div>
  );
}
