export interface User {
  email: string;
  password: string;
}

export interface UserSignup extends User {
  passwordConfirm: string;
}
