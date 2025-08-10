import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FC, ReactNode } from 'react';

type DataLoadErrorProperties = {
  error: FetchBaseQueryError | SerializedError;
};
export const DataLoadError: FC<DataLoadErrorProperties> = ({
  error,
}): ReactNode => {
  let status: string | number = '';
  if ('status' in error) {
    status = error.status;
  }

  if (status === 404) {
    return <p>No data was found by provided parameters</p>;
  }

  if (+status >= 500) {
    return <p>Internal server error. Please try to use app later.</p>;
  }

  return <p>{'data' in error ? JSON.stringify(error.data) : undefined}</p>;
};
