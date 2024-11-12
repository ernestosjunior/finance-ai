import { auth } from "@clerk/nextjs/server";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { getUser } from "../get-user";

export const canUserAddTransaction = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await getUser();

  if (user.publicMetadata.subscriptionPlan === "premium") {
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
