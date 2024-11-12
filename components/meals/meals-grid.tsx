import React from "react";
import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";

interface Props {
  meals: Array<MealInterface>;
}
function MealsGrid({ meals }: Props) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}

export default MealsGrid;
