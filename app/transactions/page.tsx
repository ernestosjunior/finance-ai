import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});

  return (
    <main className="container space-y-6">
      <div className="flex w-full items-center justify-between pt-6">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon />
        </Button>
      </div>
      <DataTable
        columns={transactionColumns}
        data={transactions.map((transaction) => ({
          ...transaction,
          amount: Number(transaction.amount),
          date: transaction.date.toString(),
        }))}
      />
    </main>
  );
};

export default TransactionsPage;
