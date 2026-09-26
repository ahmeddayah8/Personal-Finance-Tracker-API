import { Pencil, Trash2 } from "lucide-react";

import EditTransactionDialog from "./EditTransactionDialog";
import DeleteTransactionDialog from "./DeleteTransactionDialog";

const TransactionsTable = ({ transactions = [] }) => {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border bg-card p-10 text-center">
        <p className="font-semibold">No transactions yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Add your first income or expense.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =========================
          MOBILE
      ========================= */}
      <div className="space-y-3 md:hidden">
        {transactions.map((transaction) => {
          const isIncome = transaction.type === "income";

          return (
            <div
              key={transaction._id}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">
                    {transaction.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>

                <p
                  className={`shrink-0 text-lg font-bold ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isIncome ? "+" : "-"}$
                  {Number(transaction.amount).toLocaleString()}
                </p>
              </div>

              {/* CATEGORY + TYPE */}
              <div className="mt-4 flex justify-between items-center gap-2">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                  {transaction.category}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                    isIncome
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  {transaction.type}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="mt-4 flex items-center justify-end gap-2 border-t pt-3">
                <EditTransactionDialog transaction={transaction} />

                <DeleteTransactionDialog transaction={transaction} />
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================
          DESKTOP TABLE
      ========================= */}
      <div className="hidden overflow-hidden rounded-2xl border bg-card shadow-sm md:block">
        <table className="w-full">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Title
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Category
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Type
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Amount
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {transactions.map((transaction) => {
              const isIncome = transaction.type === "income";

              return (
                <tr
                  key={transaction._id}
                  className="transition-colors hover:bg-muted/30"
                >
                  <td className="px-5 py-4 font-medium">{transaction.title}</td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize">
                      {transaction.category}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                        isIncome
                          ? "bg-green-500/10 text-green-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>

                  <td
                    className={`px-5 py-4 text-right font-bold ${
                      isIncome ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isIncome ? "+" : "-"}$
                    {Number(transaction.amount).toLocaleString()}
                  </td>

                  <td className="px-5 py-4">
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <EditTransactionDialog transaction={transaction} />

                        <DeleteTransactionDialog transaction={transaction} />
                      </div>
                    </td>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;
