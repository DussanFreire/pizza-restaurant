export interface MealInterface {
  id?: string;
  instructions: string;
  title: string;
  image: string | File;
  creator_email: string;
  creator: string;
  summary: string;
}
