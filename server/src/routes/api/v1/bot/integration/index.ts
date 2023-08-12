import { FastifyPluginAsync } from "fastify";
import { createIntergationHandler, pauseOrResumeIntergationHandler } from "./handlers/post.handler";
import { createIntergationSchema, pauseOrResumeIntergationSchema } from "./schema";
import { getChannelsByProvider } from "./handlers/get.handler";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  // create integration for channel
  fastify.post("/:id", {
    schema: createIntergationSchema,
    onRequest: [fastify.authenticate],
  }, createIntergationHandler);
  // pause or resume integration
  fastify.post("/:id/toggle", {
    schema: pauseOrResumeIntergationSchema,
    onRequest: [fastify.authenticate],
  }, pauseOrResumeIntergationHandler);


  // return all bot channels
  fastify.get("/:id", {
    onRequest: [fastify.authenticate],
  }, getChannelsByProvider);

};

export default root;
