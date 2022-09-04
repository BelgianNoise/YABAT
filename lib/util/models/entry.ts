import { Month } from "./month";

export interface Entry {
  categories: string[];
  amount: number;
  year: number;
  month: Month;
  description: string;
}
