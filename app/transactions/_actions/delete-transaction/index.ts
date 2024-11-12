"use server";

import { db } from "@/app/_lib/prisma";
import { DeleteTransactionInput, deleteTransactionSchema } from "./schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (params: DeleteTransactionInput) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized.");
  }

  deleteTransactionSchema.parse(params);

  await db.transaction.delete({
    where: {
      id: params.transactionId,
      userId,
    },
  });

  revalidatePath("/transactions");
  revalidatePath("/");
};
