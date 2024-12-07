export interface User {
    name: string;
    email: string;
    password: string;
  }

  export interface Task {
    title: string;
    description: string;
    user_id: number;
  }
