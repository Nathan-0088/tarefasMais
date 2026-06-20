import Head from "next/head";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";

import { BiTrash } from "react-icons/bi";
import { FiShare2 } from "react-icons/fi";

import { TaskProps } from "@/types/tasks";
import Form from "@/components/form";
import { supabase } from "@/services/supabase/supabase";
import { loadTask } from "@/services/supabase/loadTasks";
import ShareButton from "@/components/shareButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { toast } from "sonner";

type UserProps = {
  user: {
    email: string;
  };
};

export default function Dashboard({ user }: UserProps) {
  const email = user.email;

  const [tasks, setTasks] = useState<TaskProps[]>([]);

  async function handleDelete(id: number) {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      toast.error("erro inesperado ao  excluir");
      return;
    }

    const response = await loadTask(email);
    setTasks(response);
  }

  return (
    <div>
      <Head>
        <title>Tarefas plus | Dashboard</title>
      </Head>

      <section>
        <main className="max-w-7xl mx-auto mt-5 px-5">
          <Form email={email} setTasks={setTasks} />

          <article className="space-y-4 mt-4">
            {tasks.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-md px-3 py-2 text-white"
              >
                {item.public && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-600 font-bold">Publica</span>

                    <ShareButton id={item.id} />
                  </div>
                )}

                <div className="flex items-center flex-col md:flex-row gap-2 justify-between">
                  {item.public ? (
                    <Link href={`/task/${item.id}`}>
                      <div>
                        <p className="text-center text-black">{item.task}</p>
                      </div>
                    </Link>
                  ) : (
                    <p>
                      <div>
                        <p
                          className="text-center text-black"
                          style={{ whiteSpace: "pre-wrap" }}
                        >
                          {item.task}
                        </p>
                      </div>
                    </p>
                  )}

                  <button
                    className="transition-all duration-500 hover:opacity-65 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                  >
                    <BiTrash size={30} color="#EF4444" />
                  </button>
                </div>
              </div>
            ))}
          </article>
        </main>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        email: session.user.email,
      },
    },
  };
};
