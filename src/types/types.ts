export interface BalanceBase {
  balance: number;
}

export interface BalanceBaseSchema {
  balance: number;
  mining_power: number | null; // 22
}

export interface CardBase {
  title: string;
  info: string;
  image: CustomImageField | null;
  backdrop: string;
  id: number;
  level_map: CardsLevelMapBase[];
  is_bought: boolean;
  is_available: boolean;
  purchase_cost: number;
  user_card: UserCardsBase | null;
}

export interface CardsLevelMapBase {
  level: number;
  power: number;
  upgrade_cost: number;
}

export interface CustomImageField {
  url: string;
  filename: string;
  upload_storage: string;
  file_id: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface KarmaBase {
  id: number;
  title: string;
  info: string;
  goal: number;
  current: number;
  image: CustomImageField | null;
  backdrop: string;
  min_donation: number;
  status: KarmaStatus;
  income_percent: number;
  category: KarmaCategoryBase | null;
  is_donated: boolean | null;
  donate_amount: number | null;
}

export interface KarmaCategoryBase {
  name: string;
}

export interface KarmaDonateBase {
  karma_id: number | null;
  initial_amount: number;
  amount: number;
}

export interface KarmaDonateIn {
  karma_id: number;
  amount: number;
}

export interface KarmaDonateOut {
  karma: KarmaBase;
  balance: BalanceBaseSchema;
}

export type KarmaStatus = "active" | "completed" | "cancelled";

export type Language = "en" | "ru";

export interface MiningBase {
  amount: number;
  status: MiningStatus;
  start_time: string;
  end_time: string;
  is_claimed: boolean;
}

export interface MiningStartOut {
  amount: number;
  status: MiningStatus;
  start_time: string;
  end_time: string;
  is_claimed: boolean;
  balance: BalanceBaseSchema | null;
}

export type MiningStatus = "pending" | "completed" | "cancelled";

export interface ReferralsClaimSchema {
  id: number | null;
  user_id: number;
  username: string | null;
  referrer_id: number | null;
  is_banned: boolean;
  is_deleted: boolean;
  referral_code: string | null;
  claimable: number;
  referrals: UserReferrals[] | null;
  balance: BalanceBaseSchema | null;
}

export interface SettingsBase {
  language: Language;
  vibration: boolean;
  animation: boolean;
}

export interface SettingsUpdate {
  language: Language;
  vibration: boolean;
  animation: boolean;
}

export enum TaskAction {
  tg_subscription_check = "tg_subscription_check",
  redirect_tg = "redirect_tg",
  redirect_tg_code = "redirect_tg_code",
  redirect_other = "redirect_other",
  redirect_other_code = "redirect_other_code",
  tg_story = "tg_story",
  special = "special",
}

export interface TaskBaseSchema {
  url: string;
  name: string;
  description: string;
  reward: number;
  code_required: boolean;
  id: number;
  category: string | null;
  social: string | null;
  is_done: boolean;
  parent_task_id: number | null;
  action: TaskAction;
}

export interface TaskGroupBaseSchema {
  name: string;
  description: string | null;
  is_active: boolean;
  tasks: TaskBaseSchema[] | null;
}

export interface TasksOut {
  groups: TaskGroupBaseSchema[] | null;
  solo_tasks: TaskBaseSchema[] | null;
  tasks: TaskBaseSchema[] | null;
}

export interface UserBase {
  id: number | null;
  user_id: number;
  username: string | null;
  referrer_id: number | null;
  is_banned: boolean;
  is_deleted: boolean;
  referral_code: string | null;
}

export interface Population {
  population: number;
  births_year: number;
  births_today: number;
  deaths_year: number;
  deaths_today: number;
  net_population_growth_year: number;
  net_population_growth_today: number;
}
export interface UserCardsBase {
  card_id: number | null;
  level: number;
  power: number;
  upgrade_cost: number;
  max_level: boolean;
}

export type UserGetFields =
  | "balance"
  | "settings"
  | "user_cards"
  | "done_tasks"
  | "karma_donates"
  | "minings"
  | "referrer"
  | "only"
  | "all";

export interface UserGetSchema {
  id: number | null;
  user_id: number;
  username: string | null;
  referrer_id: number | null;
  is_banned: boolean;
  is_deleted: boolean;
  referral_code: string | null;
  balance: BalanceBaseSchema | null;
  settings: SettingsBase;
  done_tasks: UserTasksBase[];
  user_cards: UserCardsBase[];
  karma_donates: KarmaDonateBase[];
  minings: MiningBase[];
  referrer: UserBase | null;
  last_check_in: string;
  streak: number;
}

export interface UserReferralIncomeSchema {
  username: string;
  user_id: number;
  total_income: number | null;
  claimed_income: number | null;
  unclaimed_income: number | null;
  user_image_url: string | null;
}

export interface UserReferrals {
  id: number | null;
  user_id: number;
  username: string | null;
  referrer_id: number | null;
  is_banned: boolean;
  is_deleted: boolean;
  referral_code: string | null;
  claimable: number;
  referrals: UserReferralIncomeSchema[] | null;
}

export interface UserTasksBase {
  task_id: number | null;
  completed_at: string;
}

export interface UserUpdate {
  referrer_id: number | null;
}
