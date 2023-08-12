import { FastifyReply, FastifyRequest } from "fastify";

import { GetBotRequestById } from "./types";

export const getBotByIdEmbeddingsHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;
  const user_id = request.server.user.user_id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }

  const source = await prisma.botSource.count({
    where: {
      botId: id,
      isPending: true,
    },
  });

  return {
    inProgress: source > 0,
    public_id: bot.publicId,
  };
};

export const getBotByIdAllSourcesHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;
  const user_id = request.server.user.user_id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }

  const sources = await prisma.botSource.findMany({
    where: {
      botId: id,
      type: {
        not: "crawl",
      },
    },
  });

  return {
    data: sources,
  };
};

export const getBotByIdHandler = async (
  request: FastifyRequest<GetBotRequestById>,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const id = request.params.id;
  const user_id = request.server.user.user_id;

  const bot = await prisma.bot.findFirst({
    where: {
      id,
      user_id,
    },
  });

  if (!bot) {
    return reply.status(404).send({
      message: "Bot not found",
    });
  }
  return {
    data: bot,
  };
};

export const getAllBotsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const prisma = request.server.prisma;
  const user_id = request.server.user.user_id;

  const bots = await prisma.bot.findMany({
    where: {
      user_id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bots;
};
