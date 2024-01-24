# Circls Karma Service

## Dependencies
An AMQP server is required for message queuing. The service can be run locally using the following Docker image for RabbitMQ:

```bash
docker run -d --name dev-rabbit --hostname rabbitmq-dev -p 15672:15672 -p 5672:5672 rabbitmq:management
```

The administration panel can be accessed at http://localhost:15672/.

Default credentials:
```
User: guest
Password: guest
```

## Compilation and Execution
To compile and run the service, use the following commands:

```npm
npm run build && npm run start
```


## Configuration
Check the .env.example file to see the parameters that need to be configured.

This repository uses RabbitMQ to receive events from other microservices. It is important to first register the events that the service expects using the HTTP API.


### Adding an Event to the Karma Service
To register an event to the Karma Service, you can use the following curl command:
```
curl -H "X-User-Roles: ADMIN" -H "Content-Type: application/json" -d '{"name":"new_comment", "weight":5, "origin_endpoint": "/forum/comment", "origin_verb":"POST"}' http://localhost:3000/events
```

### Expected Message Interface in the AMQP Queue
A direct AMQP exchange is used. The structure of the expected messages is as follows:

```typescript
export interface UserEvent {
    origin_endpoint: string;
    origin_verb: string;
    user_id: string; // UUID
}
```

## Simulating Event Emission from Another Microservice
To simulate the emission of an event from another microservice, you can use the emit_event.js script. Here is an example of how to use this script:

```
node ./src/emit_event.js --origin_endpoint /forum/comments --origin_verb POST --user_id 123e4567-e89b-12d3-a456-426614174000 --queue_name karma --amqp_url amqp://localhost

```

This command simulates the event of a user posting a comment on the forum, which is then sent to the specified AMQP queue.

