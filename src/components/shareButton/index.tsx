import { FiShare2 } from "react-icons/fi";
import { toast } from "sonner";

type ShareProps = {
  id: number;
};

export default function ShareButton({ id }: ShareProps) {
  const url = process.env.NEXT_PUBLIC_URL;

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Minha tarefa no Tarefas Plus",
        text: "Vem ver, comentar e participar comigo!",
        url: `${url}/task/${id}`,
      });
    } else {
      await navigator.clipboard.writeText(`${url}/task/${id}`);
      toast.success("link copiado");
    }
  }
  return (
    <button
      className="cursor-pointer transition-all duration-300 hover:opacity-60"
      onClick={handleShare}
    >
      <FiShare2 size={24} color="#3183ff" />
    </button>
  );
}
