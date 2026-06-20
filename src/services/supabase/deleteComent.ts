import { PiKeyReturnThin } from "react-icons/pi";
import { supabase } from "./supabase";

export async function deltarComentario(id: number) {
  const { error } = await supabase.from("comentarios").delete().eq("id", id);

  if (error) {
    alert("erro ao deletar");
    return;
  }
}
