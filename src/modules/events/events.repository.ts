import { prismaClient } from '../../orm';
import { Event } from './events.schema';
import { Prisma } from '@prisma/client';

export async function eventRepositoryCreate(data: Prisma.EventCreateInput) {
  return prismaClient.event.create({ data });
}

export async function eventRepositoryGetAll() {
  return prismaClient.event.findMany();
}

export async function eventRepositoryGetByOrigin(event: Partial<Event>) {
  return prismaClient.event.findFirst({
    where: { AND: [{ origin_endpoint: event.origin_endpoint }, { origin_verb: event.origin_verb }] },
  });
}

export async function eventRepositoryUpdate(event: Partial<Event>) {
  return prismaClient.event.update({
    data: event,
    where: { id: event.id },
  });
}
