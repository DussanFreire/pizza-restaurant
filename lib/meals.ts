import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals(): Promise<MealInterface[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all() as MealInterface[];
}

export function getMeal(id: string): MealInterface {
  return db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(id) as MealInterface;
}

export function saveMeal(meal: MealInterface) {
  const slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
}
