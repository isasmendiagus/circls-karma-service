import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export function SchemaValidatorMiddleware(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (e) {
      //TODO: here we can improve error login and print a friendly message
      // (according the environment to avoid leaking info in prod)

      // @ts-ignore
      res.status(400).json({ error: 'Bad Request' });
    }
  };
}
