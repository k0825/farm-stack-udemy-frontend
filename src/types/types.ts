export interface Task {
  id: string;
  title: string;
  description: string;
}

export interface UserInfo {
  email: string;
  password: string;
}

export interface CsrfToken {
  csrf_token: string;
}
