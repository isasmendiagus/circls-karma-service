import { prismaClient } from '../../orm';
import { Prisma } from '@prisma/client';

export async function userEventsRepositoryCreate(data: Prisma.UserEventCreateInput) {
  return prismaClient.userEvent.create({ data });
}
