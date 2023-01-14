export interface Household {
  id: string;
  created_at: Date;
  name: string;
  users: User[];
}

export interface User {
  id: string;
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
}
