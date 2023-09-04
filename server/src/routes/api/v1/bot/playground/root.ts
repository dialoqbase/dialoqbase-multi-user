import { FastifyPluginAsync } from "fastify";
import {
  chatRequestHandler,
  chatRequestStreamHandler,
  getPlaygroundHistoryByBotId,
  getPlaygroundHistoryByBotIdAndHistoryId,
} from "./handlers";
import {
  chatPlaygroundHistoryIdSchema,
  chatPlaygroundHistorySchema,
  chatRequestSchema,
  chatRequestStreamSchema,
} from "./schema";

const root: FastifyPluginAsync = async (fastify, _): Promise<void> => {
  fastify.post("/:id", {
    schema: chatRequestSchema,
    onRequest: [fastify.authenticate],
  }, chatRequestHandler);

  fastify.post("/:id/stream", {
    schema: chatRequestStreamSchema,
    onRequest: [fastify.authenticate],
    logLevel: "silent",
  }, chatRequestStreamHandler);

  fastify.get("/:id/history", {
    schema: chatPlaygroundHistorySchema,
    onRequest: [fastify.authenticate],
  }, getPlaygroundHistoryByBotId);

  fastify.get("/:id/history/:history_id", {
    schema: chatPlaygroundHistoryIdSchema,
    onRequest: [fastify.authenticate],
  }, getPlaygroundHistoryByBotIdAndHistoryId);
};

export default root;
