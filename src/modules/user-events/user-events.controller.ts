import { userEventsServiceCreate } from './user-events.service';
import { UserEvent } from './user-events.schema';
import { ConsumeMessage } from 'amqplib';

/**
 * This is a controller that receives messages from AMQP queue
 * @param message
 */
export async function createUserEvent(message: ConsumeMessage) {
  try {
    const userEvent = JSON.parse(message.content.toString()) as UserEvent;
    return await userEventsServiceCreate(userEvent);
  } catch (e) {
    console.error(e);
  }
}
