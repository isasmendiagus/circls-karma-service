import { getByOrigin } from '../events/events.repository';
import { create } from './user-events.repository';
import config from '../../config/index';
import { UserEvent } from './user-events.schema';
import { prismaClient } from '../../orm';

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
    user: {
      connectOrCreate: {
        where: { id: userEvent.user_id },
        create: { id: userEvent.user_id, karma_score: config.defaultKarmaScore },
      },
    },
  });

  await prismaClient.user.update({
    where: { id: userEvent.user_id },
    data: { karma_score: { increment: event.weight } },
  });
}
