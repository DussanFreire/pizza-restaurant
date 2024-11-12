"use server";

import { saveMeal } from "./meals";

export async function shareMeal(formData: FormData) {
  const meal: MealInterface = {
    title: formData.get("title") as string,
    image: formData.get("image") as File,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };
  await saveMeal(meal);
}
