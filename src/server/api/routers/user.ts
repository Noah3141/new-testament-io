import { CommentaryRating, type Commentary, type User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const users: User[] = await ctx.db.user.findMany({});
        return users;
    }),
    getAllWithWhetherSubscribed: publicProcedure.query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany({
            include: { followedBy: { where: { id: ctx.session?.user.id } } },
        });

        const usersWithWhetherSubscribedTo = users.map((user) => {
            const isSubscribedTo: boolean = user.followedBy.some(
                (user) => user.id === ctx.session?.user.id,
            );
            const userWithWhetherSubscribedTo = {
                ...user,
                subscribedTo: isSubscribedTo,
            };
            return userWithWhetherSubscribedTo;
        });

        return usersWithWhetherSubscribedTo;
    }),

    getSession: protectedProcedure.query(async ({ ctx }) => {
        const user: User | null = await ctx.db.user.findUnique({
            where: { id: ctx.session.user.id },
        });

        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Session user does not correspond to a user",
            });
        }

        return user;
    }),

    getbyId: publicProcedure
        .input(
            z.object({
                userId: z.string().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            if (!input.userId) {
                return null;
            }

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
            const user: User = await ctx.db.user.update({
                where: { id: input.subscribeToId },
                data: {
                    followedBy: { connect: { id: ctx.session.user.id } },
                },
            });
            return user;
        }),

    getSubscriptionsUsers: protectedProcedure.query(async ({ ctx }) => {
        const subscribedToUsers: User[] = await ctx.db.user.findMany({
            where: { followedBy: { some: { id: ctx.session.user.id } } },
        });
        return subscribedToUsers;
    }),

    getSubscriptionsUsersWithRecentCommentary: protectedProcedure.query(
        async ({ ctx }) => {
            const subscribedToUsers: (User & {
                commentaries: (Commentary & { ratings: CommentaryRating[] })[];
            })[] = await ctx.db.user.findMany({
                where: { followedBy: { some: { id: ctx.session.user.id } } },
                include: {
                    commentaries: {
                        take: 3,
                        orderBy: { createdAt: "desc" },
                        include: { ratings: true },
                    },
                },
            });
            return subscribedToUsers;
        },
    ),

    isSubscribedToId: publicProcedure
        .input(z.object({ subscribeToId: z.string().optional() }))
        .query(async ({ ctx, input }) => {
            if (!ctx.session) {
                throw new TRPCError({ code: "PRECONDITION_FAILED" });
            }

            if (!input.subscribeToId) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }

            const user = await ctx.db.user.findUnique({
                where: {
                    id: input.subscribeToId,
                    AND: {
                        followedBy: { some: { id: ctx.session.user.id } },
                    },
                },
            });

            if (!user) {
                return { subscribed: false };
            } else {
                return { subscribed: true };
            }
        }),

    toggleSubscribeForSessionToUserId: protectedProcedure
        .input(z.object({ subscribeToId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const subscribedTo: User | null = await ctx.db.user.findUnique({
                where: {
                    id: input.subscribeToId,
                    AND: { followedBy: { some: { id: ctx.session.user.id } } },
                },
            });

            if (!subscribedTo) {
                // We must not be subscribed, and so, subscribe:
                const targetUser: User = await ctx.db.user.update({
                    where: { id: input.subscribeToId },
                    data: {
                        followedBy: { connect: { id: ctx.session.user.id } },
                    },
                });
                return { subscriptionBefore: false, subscriptionNow: true };
            } else {
                const targetUser: User = await ctx.db.user.update({
                    where: { id: input.subscribeToId },
                    data: {
                        followedBy: { disconnect: { id: ctx.session.user.id } },
                    },
                });
                return { subscriptionBefore: true, subscriptionNow: false };
            }
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
