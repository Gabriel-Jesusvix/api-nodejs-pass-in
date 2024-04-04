import fastifySwagger from '@fastify/swagger';
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { CheckIn } from "./routes/check-in";
import { createEvent } from "./routes/create-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { getEvent } from "./routes/get-event";
import { getEventAttendees } from "./routes/get-event-attendees";
import { registerForEvent } from "./routes/register-for-event";


const app = fastify()
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o back-end da aplicação pass.in',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform,
})


app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(CheckIn)
app.register(getEventAttendees)

app.listen({
  port: 3333
}).then(() => console.log('HTTP server running!'))