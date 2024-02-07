export enum LoginFieldNames {
  EMAIL = 'Email',
  PASSWORD = 'Password',
  REMEMBER_ME = 'RememberMe'
}

export interface LoginValuesProps {
  [LoginFieldNames.EMAIL]: string;
  [LoginFieldNames.PASSWORD]: string;
  [LoginFieldNames.REMEMBER_ME]?: boolean;
}
