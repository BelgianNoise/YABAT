export var MainCategory;
(function (MainCategory) {
    MainCategory["INCOME"] = "INCOME";
    MainCategory["EXPENSE"] = "EXPENSE";
    MainCategory["SAVINGS"] = "SAVINGS";
})(MainCategory || (MainCategory = {}));
export var InvestmentCategory;
(function (InvestmentCategory) {
    InvestmentCategory["INVESTMENT"] = "INVESTMENT";
    InvestmentCategory["STOCKS"] = "STOCKS";
    InvestmentCategory["CRYPTO"] = "CRYPTO";
})(InvestmentCategory || (InvestmentCategory = {}));
export var IncomeCategory;
(function (IncomeCategory) {
    IncomeCategory["SALARY"] = "SALARY";
    IncomeCategory["SOCIAL_BENEFITS"] = "SOCIAL_BENEFITS";
    IncomeCategory["MEAL_VOUCHERS"] = "MEAL_VOUCHERS";
    IncomeCategory["REPAYMENT"] = "REPAYMENT";
    IncomeCategory["SECOND_HAND_SALE"] = "SECOND_HAND_SALE";
})(IncomeCategory || (IncomeCategory = {}));
export var SavingsCategory;
(function (SavingsCategory) {
    SavingsCategory["REGULAR_SAVINGS"] = "REGULAR_SAVINGS";
    SavingsCategory["PENSION"] = "PERSION";
})(SavingsCategory || (SavingsCategory = {}));
export var RecurringCategory;
(function (RecurringCategory) {
    RecurringCategory["RENT"] = "RENT";
    RecurringCategory["MORTGAGE"] = "MORTGAGE";
    RecurringCategory["INSURANCE"] = "INSURANCE";
    RecurringCategory["HOUSE_INSURANCE"] = "HOUSE_INSURANCE";
    RecurringCategory["CAR_INSURANCE"] = "CAR_INSURANCE";
    RecurringCategory["HEALTH_INSURANCE"] = "HEALTH_INSURANCE";
    RecurringCategory["CREDIT_CARD"] = "CREDIT_CARD";
    RecurringCategory["UTILITIES"] = "UTILITIES";
    RecurringCategory["WATER"] = "WATER";
    RecurringCategory["ELECTRIC"] = "ELECTRIC";
    RecurringCategory["NATURAL_GAS"] = "NATURAL_GAS";
    RecurringCategory["GAS"] = "GAS";
    RecurringCategory["INTERNET"] = "INTERNET";
    RecurringCategory["PHONE"] = "PHONE";
    RecurringCategory["SUBSCRIPTION"] = "SUBSCRIPTION";
})(RecurringCategory || (RecurringCategory = {}));
export var ExpenseCategory;
(function (ExpenseCategory) {
    ExpenseCategory["RECURRING"] = "RECURRING";
    ExpenseCategory["HEALTH"] = "HEALTH";
    ExpenseCategory["HOSPITAL"] = "HOSPITAL";
    ExpenseCategory["MEDICATION"] = "MEDICATION";
    ExpenseCategory["GROCERIES"] = "GROCERIES";
    ExpenseCategory["HOME"] = "HOME";
    ExpenseCategory["TAKE_OUT"] = "TAKE_OUT";
    ExpenseCategory["LEISURE"] = "LEISURE";
    ExpenseCategory["VACATION"] = "VACATION";
    ExpenseCategory["GAMES"] = "GAMES";
    ExpenseCategory["CLOTHES"] = "CLOTHES";
    ExpenseCategory["TRANSPORTATION"] = "TRANSPORTATION";
    ExpenseCategory["OTHER"] = "OTHER";
})(ExpenseCategory || (ExpenseCategory = {}));
export const Category = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, MainCategory), IncomeCategory), ExpenseCategory), SavingsCategory), InvestmentCategory), RecurringCategory);
export function convertCategoryToString(cat) {
    return cat
        .split('_')
        .map((s) => `${s.charAt(0)}${s.toLowerCase().slice(1)}`)
        .join(' ');
}
export function convertStringToCategory(string) {
    return string.split(' ').join('_').toUpperCase();
}
export const mainCategories = Object.keys(MainCategory);
