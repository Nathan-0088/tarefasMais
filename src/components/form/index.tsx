import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import TextArea from "../textArea";
import { supabase } from "@/services/supabase/supabase";
import { TaskProps } from "@/types/tasks";
import { loadTask } from "@/services/supabase/loadTasks";

type FormProps = {
  email: string;
  setTasks: Dispatch<SetStateAction<TaskProps[]>>;
};

export default function Form({ email, setTasks }: FormProps) {
  const [text, setText] = useState("");
  const [check, setCheck] = useState(false);

  async function handleregister(e: FormEvent) {
    e.preventDefault();

    if (text === "") {
      alert("digite algo");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      task: text,
      email: email,
      public: check,
    });

    if (error) {
      console.log(error);
      alert("nogg");
      return;
    }

    setText("");
    setCheck(false);
    fetchTasks(email);
  }

  async function fetchTasks(email: string) {
    const response = await loadTask(email);
    setTasks(response || []);
  }

  useEffect(() => {
    fetchTasks(email);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-3 ">
      <h1 className="text-3xl font-bold">Qual sua tarefa?</h1>

      <form className="flex flex-col gap-2">
        <TextArea
          placeholder="Digite a sua tarefa..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-5 h-5 rounded-2xl transition-all"
            checked={check}
            onChange={() => setCheck(!check)}
          />
          <label className="text-sm font-medium text-gray-700 cursor-pointer">
            Deixar público
          </label>
        </div>

        <button
          className="text-white bg-blue-600 py-3 rounded-2xl font-bold transition-all duration-300 hover:bg-blue-700 cursor-pointer"
          onClick={handleregister}
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
