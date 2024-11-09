import { ReactNode } from "react";

export interface MealInterface {
  id: string;
  title: string;
  slug: ReactNode;
  image: string;
  summary: string;
  creator: string;
}
