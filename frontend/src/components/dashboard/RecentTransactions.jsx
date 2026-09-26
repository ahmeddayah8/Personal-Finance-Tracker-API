import {
  ArrowDownLeft,
  ArrowUpRight,
  ReceiptText,
} from "lucide-react";

const RecentTransactions = ({ transactions = [] }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <ReceiptText className="h-6 w-6 text-muted-foreground" />
        </div>

        <h3 className="font-semibold">No transactions yet</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Your recent transactions will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Transactions
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest income and expenses.
          </p>
        </div>

        <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
          {transactions.length} transactions
        </span>
      </div>

      {/* Transactions */}
      <div className="divide-y">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction._id}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-muted/40"
            >
              {/* Icon */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  isIncome
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {isIncome ? (
                  <ArrowDownLeft className="h-5 w-5" />
                ) : (
                  <ArrowUpRight className="h-5 w-5" />
                )}
              </div>

              {/* Transaction info */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold">
                  {transaction.title}
                </h3>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium capitalize">
                    {transaction.category}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p
                  className={`font-bold ${
                    isIncome
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {isIncome ? "+" : "-"}$
                  {Number(transaction.amount).toLocaleString()}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {isIncome ? "Income" : "Expense"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;