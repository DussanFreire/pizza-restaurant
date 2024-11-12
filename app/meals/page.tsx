import Link from "next/link";

import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicius meals, created
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. it is easy and fun !
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share Your Favorite Recipe</Link>
        </p>
      </header>

      <main className={classes.main}>
        <Suspense
          fallback={<div className={classes.loading}>Fetching meals...</div>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

async function Meals() {
  const meals = await getMeals();
  console.log(meals);
  return <MealsGrid meals={meals} />;
}
