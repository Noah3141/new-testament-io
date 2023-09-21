import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const sessionRouter = createTRPCRouter({
    signIn: publicProcedure
        .input(z.object({ email: z.string(), password: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const userForInput = await ctx.db.user.findUnique({
                where: { email: input.email },
            });
        }),
});
