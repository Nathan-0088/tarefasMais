import Image from "next/image";
import logo from "../../public/assets/hero.png";
import Head from "next/head";
import { GetStaticProps } from "next";
import { supabase } from "@/services/supabase/supabase";

type HomeProps = {
  posts: number;
  comentarios: number;
};

export default function Home({ comentarios, posts }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center mt-30 px-5">
      <Head>
        <title>Tarefas Plus</title>
      </Head>

      <main className=" bg-white w-full mx-auto flex flex-col items-center py-10 rounded-2xl">
        <div>
          <Image src={logo} alt="logo" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold py-2 mt-1 text-slate-800">
            Sistema para se organizar <br />
            estudos até tarefas diarias
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full px-12 justify-center text-center">
          <section className="px-3 py-2 bg-slate-700 rounded-md text-white transition-all hover:scale-95 hover:bg-slate-800 select-none">
            <span className="text-lg font-bold">+{posts} tarefas</span>
          </section>

          <section className="px-3 py-2 bg-slate-700 rounded-md text-white text-center transition-all hover:scale-95 hover:bg-slate-800 select-none">
            <span className="text-lg font-bold">
              +{comentarios} comentarios
            </span>
          </section>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { count: comentariosCount } = await supabase
    .from("comentarios")
    .select("*", { count: "exact", head: true });

  const { count: postsCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true });

  return {
    props: {
      comentarios: comentariosCount ?? 0,
      posts: postsCount ?? 0,
    },
    revalidate: 60,
  };
};
