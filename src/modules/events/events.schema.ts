import Joi from 'joi';

export interface Event {
  name: string;
  weight: number;
  origin_endpoint: string;
  origin_verb: string;
}
export const eventSchema = Joi.object<Event>({
  name: Joi.string().required(),
  weight: Joi.number().integer().required(),
  origin_endpoint: Joi.string().required(),
  origin_verb: Joi.string().required(),
});
