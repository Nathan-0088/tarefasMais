import { PiKeyReturnThin } from "react-icons/pi";
import { supabase } from "./supabase";
import { toast } from "sonner";

export async function deltarComentario(id: number) {
  const { error } = await supabase.from("comentarios").delete().eq("id", id);

  if (error) {
    toast.error("comentario excluido");
    return;
  }
}
