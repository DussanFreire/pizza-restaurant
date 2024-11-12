"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { MealInterface } from "./interfaces";

function isInvalid(text: string) {
  return !text || !text.trim();
}

export async function shareMeal(
  _prevState: { message: string },
  formData: FormData
) {
  const meal: MealInterface = {
    title: formData.get("title") as string,
    image: formData.get("image") as File,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };
  if (
    isInvalid(meal.title) ||
    isInvalid(meal.summary) ||
    isInvalid(meal.creator) ||
    isInvalid(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    isInvalid(meal.instructions)
  ) {
    return { message: "Invalid input" };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
