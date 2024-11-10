import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SummaryCards from "./components/summary-cards";
import TimeSelect from "./components/time-select";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "./components/transactions-pie-chart";
import ExpensesPerCategory from "./components/expenses-per-category";

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
    <main className="container space-y-6 py-6 sm:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="grid grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          <SummaryCards {...dashboard} />
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
