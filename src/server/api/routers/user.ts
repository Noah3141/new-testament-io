import { Commentary, User } from "@prisma/client";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getbyId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const user: User | null = await ctx.db.user.findUnique({
                where: {
                    id: input.userId,
                },
            });

            return user;
        }),

    addToIdAsSubscriber: protectedProcedure
        .input(z.object({ subscribeToId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const kek = await ctx.db.user.update({
                where: { id: input.subscribeToId },
                data: {
                    followedBy: { connect: { id: ctx.session.user.id } },
                },
            });
            return kek;
        }),

    getSubscriptionsUsers: protectedProcedure.query(async ({ ctx }) => {
        const subscribedToUsers: User[] = await ctx.db.user.findMany({
            where: { followedBy: { every: { id: ctx.session.user.id } } },
        });
        return subscribedToUsers;
    }),

    getSubscriptionCommentaries: protectedProcedure.query(async ({ ctx }) => {
        const subscribedToUsers: User[] = await ctx.db.user.findMany({
            where: { followedBy: { every: { id: ctx.session.user.id } } },
        });

        const commentaries: (Commentary & { User: User })[] =
            await ctx.db.commentary.findMany({
                where: {
                    authorId: {
                        in: subscribedToUsers.map((user: User) => user.id),
                    },
                },
                include: { User: true },
                take: 10,
                orderBy: { createdAt: "desc" },
            });

        return commentaries;
    }),
});
