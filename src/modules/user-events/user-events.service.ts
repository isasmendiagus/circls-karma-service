import { userEventsRepositoryCreate } from './user-events.repository';
import config from '../../config/index';
import { UserEvent } from './user-events.schema';
import { prismaClient } from '../../orm';
import { eventRepositoryGetByOrigin } from '../events/events.repository';

export async function userEventsServiceCreate(userEvent: UserEvent) {
  //Get id of the event in the catalog.
  const event = await eventRepositoryGetByOrigin({
    origin_verb: userEvent.origin_verb,
    origin_endpoint: userEvent.origin_endpoint,
  });

  //If event does not exist throw an error
  if (!event) throw new Error('Event not found');

  await userEventsRepositoryCreate({
    event: { connect: { id: event.id } },
    weight: event.weight,
    user: {
      connectOrCreate: {
        where: { id: userEvent.user_id },
        create: { id: userEvent.user_id, karma_score: config.defaultKarmaScore },
      },
    },
  });

  //TODO: Create a user module to handle this query
  await prismaClient.user.update({
    where: { id: userEvent.user_id },
    data: { karma_score: { increment: event.weight } },
  });
}
