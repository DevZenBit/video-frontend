import * as yup from 'yup';
import { en } from '@/locales/en';
import { LoginFieldNames } from '@/components/auth/types';

export const validationSignInSchema = yup.object().shape({
  [LoginFieldNames.EMAIL]: yup.string().email(en.invalidEmail).required(en.fieldRequired),
  [LoginFieldNames.PASSWORD]: yup.string().min(8).required(en.passwordRequired),
  [LoginFieldNames.REMEMBER_ME]: yup.boolean()
});
