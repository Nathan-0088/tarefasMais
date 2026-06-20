import { supabase } from "./supabase";

export async function deleteTask(id: number) {
  const { error } = await supabase.from("taskks").delete().eq("id", id);
}
