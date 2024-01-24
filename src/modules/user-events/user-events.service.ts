import { getByOrigin } from '../events/events.repository';
import { create } from './user-events.repository';
import config from '../../config/index';
export interface UserEvent {
  origin_endpoint: string;
  origin_verb: string;
  user_id: string; //uuid
}

export async function addUserEvent(userEvent: UserEvent) {
  //Get id of the event in the catalog.
  const event = await getByOrigin({
    origin_verb: userEvent.origin_verb,
    origin_endpoint: userEvent.origin_endpoint,
    weight: 0,
    name: '',
  });

  //If event does not exist throw an error
  if (!event) throw new Error('Event not found');

  await create({
    event: { connect: { id: event.id } },
    weight: event.weight,
    user: { connectOrCreate: { where: { id: userEvent.user_id }, create: { karma_score: config.defaultKarmaScore } } },
  });
}
