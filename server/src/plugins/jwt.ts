import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from "fastify";
import { supabase } from "../utils/supabase";

declare module "fastify" {
  interface FastifyInstance {
    user: {
      user_id: string;
    };
  }
}

export default fp(async (fastify, opts) => {
  fastify.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
          reply.code(401).send({ message: "Unauthorized" });
        }
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error) {
          reply.code(401).send({ message: "Unauthorized" });
        }
        fastify.user = {
          user_id: user?.id!,
        };
      } catch (err) {
        reply.send(err);
      }
    },
  );
});

declare module "fastify" {
  export interface FastifyInstance {
    authenticate(): Promise<void>;
  }
}