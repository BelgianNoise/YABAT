import { Month } from "./month";

export interface Entry {
  id: string;
  categories: string[];
  amount: number;
  year: number;
  month: Month;
  description: string;
}
