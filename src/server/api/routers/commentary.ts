import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { type Commentary, type CommentaryRating } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const commentaryRouter = createTRPCRouter({
    upsert: protectedProcedure
        .input(
            z.object({
                scriptureId: z.string(),
                title: z.string(),
                link: z.string(),
                content: z.string(),
                scriptureTitle: z.string(),
                scriptureVerse: z.string(),
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
                    scriptureTitle: input.scriptureTitle,
                    scriptureVerse: input.scriptureVerse,
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

    getRatingForAuthorIdSriptureIdbySessionId: protectedProcedure
        .input(z.object({ scriptureId: z.string(), authorId: z.string() }))
        .query(async ({ ctx, input }) => {
            const rating: CommentaryRating | null =
                await ctx.db.commentaryRating.findUnique({
                    where: {
                        commentaryAuthorId_commentaryScriptureId_raterId: {
                            commentaryAuthorId: input.authorId,
                            commentaryScriptureId: input.scriptureId,
                            raterId: ctx.session.user.id,
                        },
                    },
                });

            return rating;
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

    getForUserIdAndScriptureId: publicProcedure
        .input(
            z.object({
                authorId: z.string(),
                scriptureId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const commentaryWithRatings = await ctx.db.commentary.findUnique({
                where: {
                    authorId_scriptureId: {
                        authorId: input.authorId,
                        scriptureId: input.scriptureId,
                    },
                },
                include: { ratings: true },
            });
            return commentaryWithRatings;
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
                ratings: z.object({
                    closeness: z.number().optional(),
                    coherent: z.number().optional(),
                    comprehensible: z.number().optional(),
                    comprehensive: z.number().optional(),
                    deep: z.number().optional(),
                    practical: z.number().optional(),
                }),
                scriptureId: z.string(),
                authorId: z.string(),
            }),
        )
        .mutation(
            async ({
                ctx,
                input: {
                    authorId,
                    scriptureId,
                    ratings: {
                        closeness,
                        coherent,
                        comprehensible,
                        comprehensive,
                        deep,
                        practical,
                    },
                },
            }) => {
                if (
                    !closeness ||
                    !coherent ||
                    !comprehensible ||
                    !comprehensive ||
                    !deep ||
                    !practical
                ) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Please rate along all dimensions!",
                    });
                }
                const commentaryRating: CommentaryRating =
                    await ctx.db.commentaryRating.upsert({
                        create: {
                            closeness: closeness,
                            coherent: coherent,
                            comprehensible: comprehensible,
                            comprehensive: comprehensive,
                            deep: deep,
                            practical: practical,
                            raterId: ctx.session.user.id,
                            commentaryAuthorId: authorId,
                            commentaryScriptureId: scriptureId,
                        },
                        update: {
                            closeness: closeness,
                            coherent: coherent,
                            comprehensible: comprehensible,
                            comprehensive: comprehensive,
                            deep: deep,
                            practical: practical,
                        },
                        where: {
                            commentaryAuthorId_commentaryScriptureId_raterId: {
                                commentaryAuthorId: authorId,
                                commentaryScriptureId: scriptureId,
                                raterId: ctx.session.user.id,
                            },
                        },
                    });

                const authorsRatings: CommentaryRating[] =
                    await ctx.db.commentaryRating.findMany({
                        where: { commentaryAuthorId: authorId },
                    });

                let sum = 0;
                const profileRating = authorsRatings.forEach((rating) => {
                    let ratingSum = 0;
                    ratingSum += rating.closeness;
                    ratingSum += rating.coherent;
                    ratingSum += rating.comprehensible;
                    ratingSum += rating.comprehensive;
                    ratingSum += rating.deep;
                    ratingSum += rating.practical;

                    ratingSum /= 6;

                    sum += ratingSum;
                });

                sum /= authorsRatings.length;

                await ctx.db.user.update({
                    where: { id: authorId },
                    data: { rating: sum },
                });

                return commentaryRating;
            },
        ),

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

            const commentaries: (Commentary & {
                ratings: CommentaryRating[];
            })[] = await ctx.db.commentary.findMany({
                where: { authorId: input.userId },
                orderBy: [
                    { createdAt: "desc" },
                    { rating: { sort: "desc", nulls: "last" } },
                ],
                include: { ratings: true },
            });

            return commentaries;
        }),
});
