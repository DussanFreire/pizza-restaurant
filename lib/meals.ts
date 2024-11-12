import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";
import stream from "stream";
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

export async function saveMeal(meal: MealInterface) {
  const FOLDER_PATH = "public/images";
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const imageFile = meal.image as File;
  const extension = imageFile.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}-${meal.slug}.${extension}`;
  const stream = fs.createWriteStream(`${FOLDER_PATH}/${fileName}`);
  const bufferedImage = await imageFile.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });
  meal.image = `/images/${fileName}`;
  db.prepare(
    `
    INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
