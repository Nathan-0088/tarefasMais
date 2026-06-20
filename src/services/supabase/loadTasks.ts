import { TaskProps } from "@/types/tasks";
import { supabase } from "./supabase";

export async function loadTask(email: string): Promise<TaskProps[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data ?? [];
}
