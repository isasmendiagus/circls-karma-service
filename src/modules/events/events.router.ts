import express from 'express';
import config from '../../config';
import { get, post } from './events.controller';
import { RoleMiddleware } from '../../middlewares/authorization.middleware';
import { SchemaValidatorMiddleware } from '../../middlewares/schema_validator.middleware';
import { eventSchema } from './events.schema';

/**
 * Express router for events routes.
 * - Only users with the 'ADMIN' role can access these routes.
 * - Access control is managed via `RoleMiddleware`, which checks the 'X-User-Role' header.
 * - The 'X-User-Id' and 'X-User-Roles' headers are set by the API gateway after user session validation,
 *   ensuring authenticated and authorized access and preventing bypassing of authentication.
 */
const router = express.Router();
router.get(config.apiPrefix + '/events', RoleMiddleware(['ADMIN']), get);
router.post(config.apiPrefix + '/events', RoleMiddleware(['ADMIN']), SchemaValidatorMiddleware(eventSchema), post);

export default router;
