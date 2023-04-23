export interface Household {
  id: string;
  created_at: Date;
  name: string;
  users: User[];
  owner_id: string;
}

export interface User {
  id: string;
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Invite {
  id: string;
  created_at: Date;
  household: Household;
  household_id: string;
  user_id: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Item {
  id: string;
  created_at: Date;
  name: string;
  household_id: string;
}

export interface ListItem {
  id: string;
  created_at: Date;
  item: Item;
  item_id: string;
  household_id: string;
  completed_at: Date | null;
  complete: boolean;
  details: string;
}

export interface Meal {
  id: string;
  created_at: Date;
  name: string;
  household_id: string;
  description: string;
  items: Item[];
}

export interface PlannedMeal {
  id: string;
  created_at: Date;
  meal: Meal;
  meal_id: string;
  household_id: string;
  date: Date;
  added_list_item_ids: string[] | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  firstName: string;
  lastName: string;
}
