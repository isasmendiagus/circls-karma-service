import { prismaClient } from '../../orm';
import { Prisma } from '@prisma/client';

export async function create(data: Prisma.UserEventCreateInput) {
  return prismaClient.userEvent.create({ data });
}
