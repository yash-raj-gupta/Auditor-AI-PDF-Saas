import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import { z } from "zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user.id || !user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id, // kinde user id is being used here
          email: user.email,
        },
      });
    }

    return { success: true };
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx; // we pass userId seperately because if we get it from user.id then its type will be string|null so in order for more type safety we did that

    return await db.file.findMany({
      where: {
        userId,
      },
    });
  }),
  deleteFile: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { userId } = ctx;

      const file = await db.file.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if(!file) throw new TRPCError({ code: "NOT_FOUND" });

      await db.file.delete({
        where: {
            id: input.id,
        }
      })

      return file
    }),
});

export type AppRouter = typeof appRouter;
