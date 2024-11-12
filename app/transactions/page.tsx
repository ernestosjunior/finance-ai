import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

const TransactionsPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const transactions = await db.transaction.findMany({
    where: { userId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <main className="container space-y-6 py-6 sm:px-4">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
      </div>
      <DataTable
        columns={transactionColumns}
        data={JSON.parse(JSON.stringify(transactions))}
      />
    </main>
  );
};

export default TransactionsPage;
