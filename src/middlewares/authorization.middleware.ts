import { Request, Response, NextFunction } from 'express';
import { normalizeHeader } from '../common/helper.headers';

type Roles = 'ADMIN' | 'USER';

export function RoleMiddleware(allowedRoles: Roles[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRoles = normalizeHeader('x-user-roles', req);

    if (!userRoles.length) {
      return res.status(401).json({ error: 'User Role not found in headers' });
    }

    //Flat the array userRoles
    const rolesArray = userRoles.reduce<string[]>((acc, curr) => [...acc, ...curr.split(',')], []);
    const hasRequiredRole = rolesArray.some((role) => allowedRoles.includes(role.trim() as Roles));

    if (!hasRequiredRole) {
      return res.status(403).json({ error: 'Access Denied' });
    }

    next();
  };
}
