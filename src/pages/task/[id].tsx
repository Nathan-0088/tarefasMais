import TextArea from "@/components/textArea";
import { supabase } from "@/services/supabase/supabase";
import { TaskProps } from "@/types/tasks";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { ComentariosProps } from "@/types/comentarios";
import { BiTrash } from "react-icons/bi";
import { deltarComentario } from "@/services/supabase/deleteComent";

type TaskLoadProps = {
  item: TaskProps;
};

export default function Task({ item }: TaskLoadProps) {
  const { data: seccion } = useSession();

  const [inp, setInp] = useState("");
  const [comentarios, setComentarios] = useState<ComentariosProps[]>([]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (inp === "") {
      alert("nada escrito");
      return;
    }

    if (!seccion?.user?.email || !seccion?.user?.name) {
      alert("erro de usuario");
      return;
    }

    const { error } = await supabase.from("comentarios").insert({
      coment: inp,
      user: seccion.user.name,
      emailUser: seccion.user.email,
      taskId: item.id,
    });

    if (error) {
      alert("no gg");
      return;
    }

    setInp("");
    fetchComents();
  }

  async function fetchComents() {
    const { data, error } = await supabase
      .from("comentarios")
      .select("*")
      .eq("taskId", item.id)
      .returns<ComentariosProps[]>();

    if (error) {
      console.log("erro ao carregar os comentarios");
      return;
    }

    setComentarios(data);
  }

  async function handleDelete(id: number) {
    await deltarComentario(id);
    await fetchComents();
  }

  useEffect(() => {
    fetchComents();
  }, []);

  return (
    <div className="px-4">
      <Head>
        <title>Tarefas plus | detalhes </title>
      </Head>

      <main className="max-w-7xl w-full mx-auto bg-white my-5 rounded-2xl p-5">
        <h1 className=" py-2 font-bold text-3xl">Detalhes</h1>

        <article className="p-3 border-2 border-gray-600 rounded-md my-2">
          <p style={{ whiteSpace: "pre-wrap" }}>{item.task}</p>
        </article>
      </main>

      <section className="max-w-7xl w-full mx-auto bg-white my-5 rounded-2xl p-5">
        <h1 className="text-2xl text-blue-600 font-bold">
          Deixe seu comentario:
        </h1>

        <form onSubmit={handleSubmit}>
          <TextArea
            placeholder="Seu comentario ..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />

          <button
            className=" bg-blue-500 w-full py-2 text-white font-bold text-lg rounded-md transition-all duration-500 hover:bg-blue-400 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={!seccion?.user}
            type="submit"
          >
            Comentar
          </button>
        </form>
      </section>

      {comentarios.map((coment) => (
        <section
          className="max-w-7xl w-full mx-auto bg-white my-5 rounded-2xl p-5"
          key={coment.id}
        >
          <div>
            <div className="border-2 border-gray-600 rounded-md p-3 flex justify-between items-center">
              <div>
                <p className="pb-2 text-blue-600 font-medium text-lg">
                  {coment.user}
                </p>
                <p>{coment.coment}</p>
              </div>

              {seccion?.user?.email === coment.emailUser ? (
                <button
                  onClick={() => handleDelete(coment.id)}
                  className="transition-all duration-300 hover:scale-95 hover:opacity-70 cursor-pointer"
                >
                  <BiTrash size={30} color="#ff0000" />
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let uid = params?.id as string;
  const id = Number(uid);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .returns<TaskProps[]>();

  if (error) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  if (!data[0]?.public) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const task = {
    task: data[0].task,
    id: data[0].id,
    email: data[0].email,
    public: data[0].public,
  };

  return {
    props: {
      item: task,
    },
  };
};
