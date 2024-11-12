import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";
import AcquirePlanButton from "./_components/acquire-plan-button";
import { getCurrentMonthTransactions } from "../_data/get-current-month-transactions";
import { getUser } from "../_data/get-user";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const user = await getUser();
  const currentMonthTransactions = await getCurrentMonthTransactions();
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan == "premium";

  return (
    <main className="container space-y-6 py-6">
      <h1 className="text-2xl font-bold">Assinatura</h1>

      <div className="flex gap-6">
        <Card className="w-[450px]">
          <CardHeader className="border-b border-solid py-8">
            <h2 className="text-center text-2xl font-semibold">Plano Básico</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">0</span>
              <div className="text-2xl text-muted-foreground">/mês</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>
                Apenas 10 transações por mês ({currentMonthTransactions}/10)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <XIcon />
              <p>Relatórios de IA</p>
            </div>
          </CardContent>
        </Card>

        <Card className="w-[450px]">
          <CardHeader className="relative border-b border-solid py-8">
            {hasPremiumPlan && (
              <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                Ativo
              </Badge>
            )}
            <h2 className="text-center text-2xl font-semibold">
              Plano Premium
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">R$</span>
              <span className="text-6xl font-semibold">19</span>
              <div className="text-2xl text-muted-foreground">/mês</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-8">
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Transações ilimitadas</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="text-primary" />
              <p>Relatórios de IA</p>
            </div>
            <AcquirePlanButton />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default SubscriptionPage;
