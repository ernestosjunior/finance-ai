import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./components/summary-cards";
import TimeSelect from "./components/time-select";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "./components/transactions-pie-chart";
import ExpensesPerCategory from "./components/expenses-per-category";
import LastTransactions from "./components/last-transactions";

interface HomePageProps {
  searchParams: {
    month: string;
  };
}

const HomePage = async ({ searchParams: { month } }: HomePageProps) => {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    const currentMonth = new Date().getMonth() + 1;

    redirect(`/?month=${currentMonth}`);
  }

  const dashboard = await getDashboard(month);

  return (
    <main className="container space-y-6 py-6 sm:px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-1 gap-6 overflow-hidden xl:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards
            balance={dashboard.balance}
            depositsTotal={dashboard.depositsTotal}
            expensesTotal={dashboard.expensesTotal}
            investmentsTotal={dashboard.investmentsTotal}
          />
          <div className="grid grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TransactionsPieChart
              depositsTotal={dashboard.depositsTotal}
              expensesTotal={dashboard.expensesTotal}
              investmentsTotal={dashboard.investmentsTotal}
              typesPercentage={dashboard.typesPercentage}
            />
            <ExpensesPerCategory
              expensesPerCategory={JSON.parse(
                JSON.stringify(dashboard.totalExpensePerCategory),
              )}
            />
          </div>
        </div>
        <LastTransactions
          lastTransactions={JSON.parse(
            JSON.stringify(dashboard.lastTransactions),
          )}
        />
      </div>
    </main>
  );
};

export default HomePage;
