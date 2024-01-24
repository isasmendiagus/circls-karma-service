#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = 'circls';
    var msg = JSON.stringify({
      user_id: 'f0fd7773-83b8-4cb6-a81e-475d657ba249',
      origin_verb: 'POST',
      origin_endpoint: '/forum/comments',
    });

    channel.assertQueue(queue, {
      durable: false,
    });
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(' [x] Sent %s', msg);
  });
  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
