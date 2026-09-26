import { useQuery } from "@tanstack/react-query";

import AddTransactionDialog from "@/components/transactions/AddTransactionDialog";

import TransactionsTable from "@/components/transactions/TransactionsTable";

import { getTransactions } from "@/lib/api/transactionApi";

import { getErrorMessage } from "@/utils/errorUtils";

const Transactions = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Manage your income and expenses.
          </p>
        </div>

        <div className="w-full sm:w-auto">
          <AddTransactionDialog />
        </div>
      </div>

      <TransactionsTable transactions={data?.transactions || []} />
    </div>
  );
};

export default Transactions;
