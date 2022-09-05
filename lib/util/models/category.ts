export enum Category {
  INCOME = 'INCOME',
    SALARY = 'SALARY',
    SOCIAL_BENEFITS = 'SOCIAL_BENEFITS',
    MEAL_VOUCHERS = 'MEAL_VOUCHERS',
    REPAYMENT = 'REPAYMENT',
    SECOND_HAND_SALE = 'SECOND_HAND_SALE',

  EXPENSE = 'EXPENSE',
    RECURRING = 'RECURRING',
      RENT = 'RENT',
      MORTGAGE = 'MORTGAGE',
      INSURANCE = 'INSURANCE',
        HOUSE_INSURANCE = 'HOUSE_INSURANCE',
        CAR_INSURANCE = 'CAR_INSURANCE',
        HEALTH_INSURANCE = 'HEALTH_INSURANCE',
      CREDIT_CARD = 'CREDIT_CARD',
      UTILITIES = 'UTILITIES',
        WATER = 'WATER',
        ELECTRIC = 'ELECTRIC',
        NATURAL_GAS = 'NATURAL_GAS',
        GAS = 'GAS',
      INTERNET = 'INTERNET',
      PHONE = 'PHONE',
    SUBSCRIPTION = 'SUBSCRIPTION',
    INVESTMENT = 'INVESTMENT', // Could also apply for INCOME
      STOCKS = 'STOCKS',
      CRYPTO = 'CRYPTO',
    HEALTH = 'HEALTH',
      HOSPITAL = 'HOSPITAL',
      MEDICATION = 'MEDICATION',
    GROCERIES = 'GROCERIES',
    TAKE_OUT = 'TAKE_OUT',
    LEISURE = 'LEISURE',
      VACATION = 'VACATION',
      GAMES = 'GAMES',
      BOARD_GAMES = 'BOARD_GAMES',
    CLOTHES = 'CLOTHES',
    TRANSPORTATION = 'TRANSPORTATION',
  
  SAVINGS = 'SAVINGS',
    REGULAR_SAVINGS = 'REGULAR_SAVINGS',
    PENSION = 'PERSION',
  
  OTHER = 'OTHER',
}

export function convertCategoryToString(cat: Category | string): string {
  return cat
    .split('_')
    .map((s: string) => `${s.charAt(0)}${s.toLowerCase().slice(1)}`)
    .join(' ');
}

export function convertStringToCategory(string: string): string {
  return string.split(' ').join('_').toUpperCase();
}

export const mainCategories: Category[] = [Category.INCOME,Category.EXPENSE,Category.SAVINGS];