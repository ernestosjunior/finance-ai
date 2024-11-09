"use client";

import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useState } from "react";

interface EditTransactionButton {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButton) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const setDialogOpen = () => setDialogIsOpen(true);

  return (
    <>
      <Button
        onClick={setDialogOpen}
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <PencilIcon />
      </Button>
      <UpsertTransactionDialog
        transactionId={transaction.id}
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          date: new Date(transaction.date),
        }}
      />
    </>
  );
};

export default EditTransactionButton;
