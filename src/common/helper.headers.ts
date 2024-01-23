import { Request } from 'express';

export function normalizeHeader(headerName: string, req: Request): string[] {
  const headerValue = req.headers[headerName.toLowerCase()];
  if (!headerValue) return [];

  return Array.isArray(headerValue) ? headerValue : [headerValue];
}
