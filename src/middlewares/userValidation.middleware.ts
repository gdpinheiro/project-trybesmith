import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import User from '../interfaces/user.interface';

const schema = Joi.object({
  username: Joi.string().min(3).empty().required()
    .messages({
      'any.required': '400|Username is required',
      'string.base': '422|Username must be a string',
      'string.min': '422|Username must be longer than 2 characters',
      'string.empty': '422|Username must not be empty',
    }),
  classe: Joi.string().min(3).empty().required()
    .messages({
      'any.required': '400|Classe is required',
      'string.base': '422|Classe must be a string',
      'string.min': '422|Classe must be longer than 2 characters',
      'string.empty': '422|Classe must not be empty',
    }),
  level: Joi.number().strict().greater(0).integer()
    .required()
    .messages({
      'any.required': '400|Level is required',
      'number.base': '422|Level must be a number',
      'number.greater': '422|Level must be greater than 0',
    }),
  password: Joi.string().min(8).empty().required()
    .messages({
      'any.required': '400|Password is required',
      'string.base': '422|Password must be a string',
      'string.min': '422|Password must be longer than 7 characters',
      'string.empty': '422|Password must not be empty',
    }),
});

const userValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = req.body;
    const { error } = schema.validate(user);
    if (error) {
      const [code, message] = error.details[0].message.split('|');
      return res.status(parseInt(code, 10)).json({ error: message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default userValidation;
