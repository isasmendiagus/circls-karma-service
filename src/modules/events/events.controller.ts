import { Request, Response } from 'express';
import { create, getAll } from './events.repository';
import { Event } from './events.schema';
export async function get(req: Request, res: Response): Promise<void> {
  const events: Event[] = await getAll();
  res.send(events);
}

export async function post(req: Request, res: Response): Promise<void> {
  try {
    const event: Event = req.body;
    const newEvent = await create(event);
    res.send(newEvent);
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
}
