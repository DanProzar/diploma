export enum AUTH_TYPE {
  Login = 'login',
  Register = 'register'
}

export interface IRegisterData {
  email: string
  password: string
  name: string
  surname: string
  phone: string
}

export interface IRLoginData {
  email: string
  password: string
}

export interface IEditProfileData extends Partial<Omit<IRegisterData, 'password'>> {}
