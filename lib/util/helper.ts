import { colorsgreylight, colorsprimarydark } from "../styles/colors";
import { Category, CategoryType } from "./models/category";
import { Entry } from "./models/entry";

export function hasCategory(entry: Entry, category: CategoryType): boolean {
  return entry.categories.includes(category);
}

export function hasCategories(entry: Entry, categories: CategoryType[]): boolean {
  return categories.every((c) => hasCategory(entry, c));
}

export function filterByCategories(entries: Entry[], cats: CategoryType[]): Entry[] {
  return entries.reduce<Entry[]>(
    (prev, curr) => hasCategories(curr, cats) ? [ ...prev, curr ] : prev,
    [],
  );
}

export function filterByCategory(entries: Entry[], cat: CategoryType): Entry[] {
  return filterByCategories(entries, [ cat ]);
}

export function getTotal(entries: Entry[], cat?: CategoryType): number {
  return entries.map((e) => cat ? hasCategory(e, cat) ? e.amount : 0 : e.amount).reduce((p, c) => p + c, 0);
}

export function totalIncome(entries: Entry[]): number {
  return getTotal(entries, Category.INCOME);
}

export function totalExpenses(entries: Entry[]): number {
  return getTotal(entries, Category.EXPENSE);
}

export function totalSavings(entries: Entry[]): number {
  return getTotal(entries, Category.SAVINGS);
}

export function totalNetto(entries: Entry[]): number {
  return totalIncome(entries) - totalExpenses(entries) - totalSavings(entries);
}

export function parseToOutput(num: number): string {
  return `€ ${num.toFixed(2)}`;
}

export function groupForPieChart(entries: Entry[]): Record<string, { amount: number, color: string }> {
  let result = {};
  for(const [cat, color] of Object.entries({
    [Category.RENT]: '#0096FF',
    [Category.MORTGAGE]: 'blue',
    [Category.INSURANCE]: 'pink',
    [Category.UTILITIES]: 'yellow',
    [Category.INTERNET]: 'lightblue',
    [Category.HEALTH]: 'red',
    [Category.HOME]: 'pink',
    [Category.GROCERIES]: 'green',
    [Category.TAKE_OUT]: 'orange',
    [Category.LEISURE]: 'lightyellow',
    [Category.CLOTHES]: 'brown',
    [Category.TRANSPORTATION]: 'yellow',
    [Category.SUBSCRIPTION]: colorsprimarydark,
  })) {
    const total = getTotal(entries, Category[cat]);
    if (total > 0) {
      result[cat] = { amount: total, color };
      entries = entries.filter((e) => !hasCategory(e, Category[cat]));
    }
  }
  // Order descending
  result = Object.entries(result)
    .sort(([,a],[,b]) => (b as { amount: number }).amount - (a as { amount: number }).amount)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
  result[Category.OTHER] = { amount: getTotal(entries, Category.EXPENSE), color: colorsgreylight };
  return result;
}