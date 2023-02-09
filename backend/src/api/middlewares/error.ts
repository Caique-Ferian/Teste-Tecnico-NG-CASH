import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

enum ErrorTypes {
  alreadyExists = 'alreadyExists',
  badRequestUser = 'badRequestUser',
  badRequestPassword = 'badRequestPassword',
  notFound = 'notFound',
  badRequestLogin = 'badRequestLogin',
  notAllowedTransaction = 'notAllowedTransaction',
}

type ErrorResponseObject = {
  code: number,
  error: string,
};

type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject
};

const errorCatalog: ErrorCatalog = {
  alreadyExists: {
    code: 409,
    error: 'Usuário já existente.',
  },
  badRequestUser: {
    code: 400,
    error: 'O usuário deve conter no mínimo 3 caracteres.',
  },
  badRequestPassword: {
    code: 400,
    error: 'A senha deve conter uma letra maiúscula um número e possuir no mínimo 8 caracteres.',
  },
  notFound: {
    code: 404,
    error: 'Usuário não encontrado.',
  },
  badRequestLogin: {
    code: 400,
    error: 'Senha incorreta!',
  },
  notAllowedTransaction: {
    code: 400,
    error: 'Não é possível fazer transferência para si mesmo e/ou valor insuficiente.',
  },
};

const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const keyError = err.message as keyof typeof ErrorTypes;
  const mappedError = errorCatalog[keyError];
  if (mappedError) {
    const { code, error } = mappedError;
    return res.status(code).json({ error });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandler;
