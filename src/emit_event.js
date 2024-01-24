#!/usr/bin/env node
const amqp = require('amqplib');

const getArgValue = (flag) => {
  const index = process.argv.indexOf(flag);
  return index > -1 ? process.argv[index + 1] : null;
};

const origin_endpoint = getArgValue('--origin_endpoint');
const origin_verb = getArgValue('--origin_verb');
const user_id = getArgValue('--user_id');
const queue_name = getArgValue('--queue_name');
const amqp_url = getArgValue('--amqp_url');

async function emitEvent() {
  try {
    const conn = await amqp.connect(amqp_url);
    const ch = await conn.createChannel();

    const event = {
      origin_endpoint,
      origin_verb,
      user_id,
    };

    await ch.assertQueue(queue_name, { durable: false });
    ch.sendToQueue(queue_name, Buffer.from(JSON.stringify(event)));

    console.log(`Event sent: ${JSON.stringify(event)}`);

    setTimeout(() => {
      ch.close();
      conn.close();
    }, 500);
  } catch (error) {
    console.error('Error emitting event:', error);
  }
}

if (origin_endpoint && origin_verb && user_id && queue_name && amqp_url) {
  emitEvent();
} else {
  console.log('Please provide all required arguments.');
}
