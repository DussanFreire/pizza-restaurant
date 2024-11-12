"use server";
import { MealInterface } from "./interfaces";
import { supabase } from "./supabase";

const TABLE_NAME = "meals";

export async function getMeals(): Promise<MealInterface[]> {
  const { data: meals, error } = await supabase.from(TABLE_NAME).select("*");
  if (error) {
    console.error(error);
    throw new Error("Meals could not be loaded");
  }
  return meals as MealInterface[];
}
export async function getMeal(id: string): Promise<MealInterface> {
  const { data: meal, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(error);
    throw new Error("Meals could not be loaded");
  }
  return meal as MealInterface;
}

export async function saveMeal(meal: MealInterface) {
  const imageName = `${Math.random()}-${(meal.image as File).name}`
    .replaceAll("/", "")
    .replaceAll(" ", "")
    .replaceAll(" ", "");
  const imagePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/meal/${imageName}`;

  const query = supabase
    .from(TABLE_NAME)
    .insert([{ ...meal, image: imagePath }]);
  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Meal could not be created");
  }

  const { error: storageError } = await supabase.storage
    .from("meal")
    .upload(imageName, meal.image);

  if (storageError) {
    await supabase.from(TABLE_NAME).delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Meal image could not be uploaded and the meal was not created"
    );
  }
  return data;
}
