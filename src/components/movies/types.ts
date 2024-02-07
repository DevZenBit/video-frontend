export enum CreateUpdateMovieFieldNames {
  TITLE = 'Title',
  PUBLISHING_YEAR = 'PublishingYear',
  POSTER = 'Poster'
}

export interface CreateUpdateMovieValuesProps {
  [CreateUpdateMovieFieldNames.TITLE]: string;
  [CreateUpdateMovieFieldNames.PUBLISHING_YEAR]: string;
  [CreateUpdateMovieFieldNames.POSTER]: File | null | string;
}
