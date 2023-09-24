import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { Commentary, CommentaryRating } from "@prisma/client";

export const commentaryRouter = createTRPCRouter({
    upsert: protectedProcedure
        .input(
            z.object({
                scriptureId: z.string(),
                title: z.string(),
                link: z.string(),
                content: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const commentary: Commentary = await ctx.db.commentary.upsert({
                where: {
                    authorId_scriptureId: {
                        authorId: ctx.session.user.id,
                        scriptureId: input.scriptureId,
                    },
                },
                create: {
                    link: input.link,
                    authorId: ctx.session.user.id,
                    content: input.content,
                    title: input.title,
                    scriptureId: input.scriptureId,
                },
                update: {
                    authorId: ctx.session.user.id,
                    content: input.content,
                    title: input.title,
                    scriptureId: input.scriptureId,
                },
            });

            return commentary;
        }),

    getSessionUsersForScriptureId: protectedProcedure
        .input(z.object({ scriptureId: z.string() }))
        .query(async ({ input, ctx }) => {
            const commentary: Commentary | null =
                await ctx.db.commentary.findUnique({
                    where: {
                        authorId_scriptureId: {
                            scriptureId: input.scriptureId,
                            authorId: ctx.session.user.id,
                        },
                    },
                });

            return commentary;
        }),

    deleteSessionUsersForScriptureId: protectedProcedure
        .input(z.object({ scriptureId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const commentary: Commentary | null =
                await ctx.db.commentary.delete({
                    where: {
                        authorId_scriptureId: {
                            scriptureId: input.scriptureId,
                            authorId: ctx.session.user.id,
                        },
                    },
                });

            return commentary;
        }),

    addRating: protectedProcedure
        .input(
            z.object({
                rating: z.number(),
                commentaryId: z.string(),
                scriptureId: z.string(),
                authorId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const commentaryRating: CommentaryRating =
                await ctx.db.commentaryRating.create({
                    data: {
                        commentaryAuthorId: input.authorId,
                        commentaryScriptureId: input.scriptureId,
                        value: input.rating,
                        raterId: ctx.session.user.id,
                    },
                });
            return commentaryRating;
        }),

    removeRating: protectedProcedure
        .input(
            z.object({
                commentaryId: z.string(),
                scriptureId: z.string(),
                authorId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const deletedRating: CommentaryRating =
                await ctx.db.commentaryRating.delete({
                    where: {
                        commentaryAuthorId_commentaryScriptureId_raterId: {
                            commentaryAuthorId: input.authorId,
                            commentaryScriptureId: input.scriptureId,
                            raterId: ctx.session.user.id,
                        },
                    },
                });

            return deletedRating;
        }),

    getAllByUserId: publicProcedure
        .input(z.object({ userId: z.string().optional() }))
        .query(async ({ ctx, input }) => {
            if (!input.userId) {
                return null;
            }

            const commentaries: Commentary[] = await ctx.db.commentary.findMany(
                {
                    where: { authorId: input.userId },
                    orderBy: [
                        { createdAt: "desc" },
                        { rating: { sort: "desc", nulls: "last" } },
                    ],
                    include: { ratings: true },
                },
            );

            return commentaries;
        }),
});
