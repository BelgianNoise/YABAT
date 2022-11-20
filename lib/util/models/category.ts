export enum MainCategory {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  SAVINGS = 'SAVINGS',
}

export enum InvestmentCategory {
  INVESTMENT = 'INVESTMENT',
  STOCKS = 'STOCKS',
  CRYPTO = 'CRYPTO',
}

export enum IncomeCategory {
  SALARY = 'SALARY',
  SOCIAL_BENEFITS = 'SOCIAL_BENEFITS',
  MEAL_VOUCHERS = 'MEAL_VOUCHERS',
  REPAYMENT = 'REPAYMENT',
  SECOND_HAND_SALE = 'SECOND_HAND_SALE',
}

export enum SavingsCategory {
  REGULAR_SAVINGS = 'REGULAR_SAVINGS',
  PENSION = 'PERSION',
}

export enum RecurringCategory {
  RECURRING = 'RECURRING',
  RENT = 'RENT',
  MORTGAGE = 'MORTGAGE',
  LOAN = 'LOAN',
  INSURANCE = 'INSURANCE',
    HOUSE_INSURANCE = 'HOUSE_INSURANCE',
    CAR_INSURANCE = 'CAR_INSURANCE',
    HEALTH_INSURANCE = 'HEALTH_INSURANCE',
    LOAN_BALANCE_INSURANCE = 'LOAN_BALANCE_INSURANCE',
  CREDIT_CARD = 'CREDIT_CARD',
  UTILITIES = 'UTILITIES',
    WATER = 'WATER',
    ELECTRIC = 'ELECTRIC',
    NATURAL_GAS = 'NATURAL_GAS',
    GAS = 'GAS',
  INTERNET = 'INTERNET',
  PHONE = 'PHONE',
  SUBSCRIPTION = 'SUBSCRIPTION',
}

export enum ExpenseCategory {
  HEALTH = 'HEALTH',
    HOSPITAL = 'HOSPITAL',
    MEDICATION = 'MEDICATION',
  GROCERIES = 'GROCERIES',
  HOME = 'HOME',
  TAKE_OUT = 'TAKE_OUT',
  LEISURE = 'LEISURE',
    VACATION = 'VACATION',
    GAMES = 'GAMES',
  CLOTHES = 'CLOTHES',
  TRANSPORTATION = 'TRANSPORTATION',
}

export enum GeneralCategory {
  GIFT = 'GIFT',
  OTHER = 'OTHER',
}

export type CategoryType = MainCategory | IncomeCategory | ExpenseCategory | GeneralCategory | SavingsCategory | InvestmentCategory | RecurringCategory;
export const Category = {
  ...MainCategory,
  ...IncomeCategory,
  ...ExpenseCategory,
  ...GeneralCategory,
  ...SavingsCategory,
  ...InvestmentCategory,
  ...RecurringCategory,
}

export function convertCategoryToString(cat: CategoryType | string): string {
  return cat
    .split('_')
    .map((s: string) => `${s.charAt(0)}${s.toLowerCase().slice(1)}`)
    .join(' ');
}

export function convertStringToCategory(string: string): string {
  return string.split(' ').join('_').toUpperCase();
}

export const mainCategories: CategoryType[] = Object.keys(MainCategory) as CategoryType[];