import { prismaClient } from '../../orm';
import { Event } from './events.schema';
import { Prisma } from '@prisma/client';

export async function create(data: Prisma.EventCreateInput) {
  return prismaClient.event.create({ data });
}

export async function deleteEvent(id: string) {
  return prismaClient.event.delete({ where: { id } });
}

export async function getById(id: string) {
  return prismaClient.event.findFirst({ where: { id } });
}

export async function getAll() {
  return prismaClient.event.findMany();
}

export async function getByOrigin(event: Event) {
  return prismaClient.event.findFirst({
    where: { AND: [{ origin_endpoint: event.origin_endpoint }, { origin_verb: event.origin_verb }] },
  });
}
