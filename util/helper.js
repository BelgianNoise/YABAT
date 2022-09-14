import { colorsgreylight, colorsprimarydark } from "../styles/colors";
import { Category } from "./models/category";
export function hasCategory(entry, category) {
    return entry.categories.includes(category);
}
export function hasCategories(entry, categories) {
    return categories.every((c) => hasCategory(entry, c));
}
export function filterByCategories(entries, cats) {
    return entries.reduce((prev, curr) => hasCategories(curr, cats) ? [...prev, curr] : prev, []);
}
export function filterByCategory(entries, cat) {
    return filterByCategories(entries, [cat]);
}
export function getTotal(entries, cat) {
    return entries.map((e) => cat ? hasCategory(e, cat) ? e.amount : 0 : e.amount).reduce((p, c) => p + c, 0);
}
export function totalIncome(entries) {
    return getTotal(entries, Category.INCOME);
}
export function totalExpenses(entries) {
    return getTotal(entries, Category.EXPENSE);
}
export function totalSavings(entries) {
    return getTotal(entries, Category.SAVINGS);
}
export function totalNetto(entries) {
    return totalIncome(entries) - totalExpenses(entries) - totalSavings(entries);
}
export function parseToOutput(num) {
    return `€ ${num.toFixed(2)}`;
}
export function groupForPieChart(entries) {
    let result = {};
    for (const [cat, color] of Object.entries({
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
    result[Category.OTHER] = { amount: getTotal(entries, Category.EXPENSE), color: colorsgreylight };
    return result;
}
