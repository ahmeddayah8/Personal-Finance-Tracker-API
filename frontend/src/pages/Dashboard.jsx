import { useQuery } from "@tanstack/react-query";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

import SummaryCard from "@/components/dashboard/SummaryCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

import { getMonthlySummary, getTransactions } from "@/lib/api/transactionApi";

import { getErrorMessage } from "@/utils/errorUtils";

const Dashboard = () => {
  // Current month: example "2026-09"
  const currentMonth = new Date().toISOString().slice(0, 7);

  // =========================
  // MONTHLY SUMMARY
  // =========================
  const {
    data: summaryData,
    isLoading: summaryLoading,
    isError: summaryError,
    error: summaryErrorData,
  } = useQuery({
    queryKey: ["monthly-summary", currentMonth],
    queryFn: () => getMonthlySummary(currentMonth),
  });

  // =========================
  // TRANSACTIONS
  // =========================
  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    isError: transactionsError,
    error: transactionsErrorData,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

 
  // TRANSACTIONS DATA
 
  const transactions = transactionsData?.transactions || [];

  
 

  const summary = summaryData?.summary || summaryData || {};

  const income = Number(summary.totalIncome ?? summary.income ?? 0);

  const expense = Number(
    summary.totalExpense ??
      summary.totalExpenses ??
      summary.expense ??
      summary.expenses ??
      0,
  );

  const balance = Number(summary.balance ?? income - expense);


  
  // ERROR
  
  if (summaryError || transactionsError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-600">
          {getErrorMessage(summaryErrorData || transactionsErrorData)}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
     
          {/* DASHBOARD HEADER */}
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <p className="mt-1 text-muted-foreground">
          Track your income, expenses and recent transactions.
        </p>
      </div>

     
          {/* SUMMARY CARDS */}
    
      {summaryLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-36 animate-pulse rounded-2xl bg-muted" />
          <div className="h-36 animate-pulse rounded-2xl bg-muted" />
          <div className="h-36 animate-pulse rounded-2xl bg-muted" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Income */}
          <SummaryCard
            title="Total Income"
            amount={income}
            icon={ArrowUpRight}
            type="income"
          />

          {/* Expenses */}
          <SummaryCard
            title="Total Expenses"
            amount={expense}
            icon={ArrowDownRight}
            type="expense"
          />

          {/* Balance */}
          <SummaryCard
            title="Balance"
            amount={balance}
            icon={Wallet}
            type="balance"
          />
        </div>
      )}

      
          {/* RECENT TRANSACTIONS */}
      
      <section>
        {transactionsLoading ? (
          <div className="rounded-2xl border bg-card p-8 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Loading transactions...
            </p>
          </div>
        ) : (
          <RecentTransactions transactions={transactions.slice(0, 5)} />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
