import { FiShare2 } from "react-icons/fi";

type ShareProps = {
  id: number;
};

export default function ShareButton({ id }: ShareProps) {
  const url = process.env.NEXT_PUBLIC_URL;

  async function handleShare() {
    if (navigator.share) {
      await navigator.share({
        title: "Veja minha tarrefa!!",
        text: "Veja comente, e interraja de uma forma tranquila e divertida",
        url: `${url}/task/${id}`,
      });
    } else {
      await navigator.clipboard.writeText(`${url}/task/${id}`);
      alert("Link copiado!");
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
