"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { upsertTransactionSchema } from "./schema";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpsertTransactionCreateInput {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (
  params: UpsertTransactionCreateInput,
) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const payload = {
    ...params,
    userId,
  };

  await db.transaction.upsert({
    update: payload,
    create: payload,
    where: {
      id: params.id ?? "",
    },
  });

  revalidatePath("/transactions");
};
