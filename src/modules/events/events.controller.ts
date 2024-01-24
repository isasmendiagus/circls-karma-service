import { Request, Response } from 'express';
import { eventRepositoryCreate, eventRepositoryGetAll, eventRepositoryUpdate } from './events.repository';
import { Event } from './events.schema';

//TODO: Here we can call the event service instead of calling the repository
export async function eventControllerRead(req: Request, res: Response): Promise<void> {
  try {
    const newEvent = await eventRepositoryGetAll();
    res.send(newEvent);
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function eventControllerCreate(req: Request, res: Response): Promise<void> {
  try {
    const event: Event = req.body;
    const newEvent = await eventRepositoryCreate(event);
    res.send(newEvent);
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function eventControllerUpdate(req: Request, res: Response): Promise<void> {
  try {
    const event: Event = req.body;

    if (!event.id) {
      res.status(400).send({ error: 'Bad Request' });
    }

    const newEvent = await eventRepositoryUpdate(event);
    res.send(newEvent);
  } catch (e) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
}
