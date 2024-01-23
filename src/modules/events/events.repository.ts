import { prismaClient } from '../../orm';
import { Prisma } from '@prisma/client';

export async function create(data: Prisma.EventCreateInput) {
  return await prismaClient.event.create({ data });
}

export async function deleteEvent(id: number) {
  return prismaClient.event.delete({ where: { id } });
}

export async function getById(id: number) {
  return prismaClient.event.findFirst({ where: { id } });
}

export async function getAll() {
  return prismaClient.event.findMany();
}
