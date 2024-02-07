import * as yup from 'yup';
import { en } from '@/locales/en';
import { CreateUpdateMovieFieldNames } from '@/components/movies/types';

export const validationCreateUpdateMovieSchema = yup.object().shape({
  [CreateUpdateMovieFieldNames.TITLE]: yup.string().required(en.fieldRequired),
  [CreateUpdateMovieFieldNames.PUBLISHING_YEAR]: yup.string().required(en.fieldRequired),
  [CreateUpdateMovieFieldNames.POSTER]: yup.mixed().required(en.fieldRequired)
});
