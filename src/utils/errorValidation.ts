import { object, ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

interface ResponseErrors {
  message: string;
}

interface ErrorData {
  message: string;
}

export function errorValidation(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.forEach((error: ValidationError) => {
    if(error.path)
      ValidationErrors[error.path] = error.message;
  });
  return ValidationErrors;
}

export function formatError(err: any): ResponseErrors[] {
  const ValidationErrors: ResponseErrors[] = [];

  try {
    const { response } = err;
    const { data } = response;

    if (data.length > 0) {
      data.forEach((e: ErrorData) => {
        ValidationErrors.push({ message: e.message });
      });
    } else {
      ValidationErrors.push({
        message: 'Ocorreu um erro ao executar a operação!',
      });
    }
  } catch (error) {
    console.log('ERROR', error);
    ValidationErrors.push({
      message: 'Ocorreu um erro ao executar a operação!',
    });
  }
  return ValidationErrors;
}
