import * as Joi from "Joi";
import { string } from 'joi';
import { Types } from 'mongoose';

const objectIdValidator = (value: string, helper: any): any => {
  if (Types.ObjectId.isValid(value)) {
    return true;
  } else {
    return helper.message("Value must be valid ObjectId");
  }
}

export const validateCreateUserDTO = Joi.object({
  Username: Joi.string().min(4).max(128).alphanum().trim().lowercase().required(),
  Password: Joi.string().min(6).max(255).required()
});

export const validateAuthorizeUserDTO = Joi.object({
  Username: Joi.string().min(4).max(128).alphanum().trim().lowercase().required(),
  Password: Joi.string().min(6).max(255).required()
});

export const validateCreateTodoDTO = Joi.object({
  Title: Joi.string().min(1).max(255).required(),
  Description: Joi.string().max(255 * 255).allow(null, '').required(),
  Status: Joi.bool().required(),
  ExpirationDate: Joi.date().timestamp().allow(null).required(),
  AssignedUserIds: Joi.array().items(string().hex()).unique().required()
});

export const validateUpdateTodoDTO = Joi.object({
  Id: Joi.string().required(),
  Title: Joi.string().min(1).max(255).required(),
  Description: Joi.string().max(255 * 255).allow(null, '').required(),
  Status: Joi.bool().required(),
  ExpirationDate: Joi.date().timestamp().allow(null).required(),
  AssignedUserIds: Joi.array().items(string().hex()).unique().required()
});
