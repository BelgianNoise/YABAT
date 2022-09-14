import { CategoryType } from "./category";
import { Month } from "./month";

export interface Entry {
  id: string;
  categories: CategoryType[];
  amount: number;
  year: number;
  month: Month;
  description: string;
}
