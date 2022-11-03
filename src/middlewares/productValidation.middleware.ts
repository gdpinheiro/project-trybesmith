import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Product from '../interfaces/product.interface';

const schema = Joi.object({
  name: Joi.string().min(2).empty().required()
    .messages({
      'any.required': '400|Name is required',
      'string.base': '422|Name must be a string',
      'string.min': '422|Name must be longer than 2 characters',
      'string.empty': '422|Name must not be empty',
    }),

  amount: Joi.string().min(2).empty().required()
    .messages({
      'any.required': '400|Amount is required',
      'string.base': '422|Amount must be a string',
      'string.min': '422|Amount must be longer than 2 characters',
      'string.empty': '422|Amount must not be empty',
    }),
});

const productValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = req.body;
    const { error } = schema.validate(product);
    if (error) {
      const [code, message] = error.details[0].message.split('|');
      return res.status(parseInt(code, 10)).json({ error: message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default productValidation;
