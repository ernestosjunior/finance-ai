import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  iconBg?: string;
  title: string;
  amount: number;
  size?: "sm" | "lg";
  translucid?: boolean;
}

const SummaryCard = ({
  title,
  icon,
  amount,
  size = "sm",
  iconBg = "#0F0E11",
  translucid = false,
}: SummaryCardProps) => {
  const titleClass = {
    sm: "text-muted-foreground",
    lg: "text-white opacity-70",
  };

  const amountClass = {
    sm: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <Card className={translucid ? "bg-[#161716]" : ""}>
      <CardHeader className="flex-row items-center gap-4">
        <div
          className={`flex items-center justify-center rounded-[8.5px] bg-[${iconBg}] p-[10px]`}
        >
          {icon}
        </div>
        <p className={titleClass[size]}>{title}</p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <p className={`font-bold ${amountClass[size]}`}>
          {new Intl.NumberFormat("pt-BR", {
            currency: "BRL",
            style: "currency",
            maximumFractionDigits: 2,
          }).format(amount)}
        </p>
        {size === "lg" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
