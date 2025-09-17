import { Failure, Success } from './result-type';

export const success: <T>(data: T) => Success<T> = (data) => ({
  success: true,
  data,
});

export const failure: <E>(error: E) => Failure<E> = (error) => ({
  success: false,
  error,
});
