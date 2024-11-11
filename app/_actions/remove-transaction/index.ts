import { auth } from "@clerk/nextjs/server";
import { removeTransactionSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface RemoveTransactionInput {
  id: string;
}

export const removeTransaction = async (params: RemoveTransactionInput) => {
  removeTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const transaction = await db.transaction.findUnique({
    where: {
      id: params.id,
      userId,
    },
  });

  if (!transaction) {
    throw new Error("Transaction not found.");
  }

  await db.transaction.delete({
    where: {
      id: params.id,
    },
  });

  revalidatePath("/transactions");
};
