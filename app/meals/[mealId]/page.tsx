import { getMeal } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from "./page.module.css";

type PageProps = {
  params: {
    mealId: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const { mealId } = await params;
  const meal: MealInterface = await getMeal(mealId);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}
async function Page({ params }: PageProps) {
  const { mealId } = await params;

  const meal: MealInterface = await getMeal(mealId);
  if (!meal) notFound();
  const formattedInstructions = meal.instructions.replaceAll(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image alt={meal.title} src={meal.image as string} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: formattedInstructions }}
        ></p>
      </main>
    </>
  );
}

export default Page;
