import { useState } from "react";
import { Trash2, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { deleteTransaction } from "@/lib/api/transactionApi";

const DeleteTransactionDialog = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteTransaction(transaction._id),

    onSuccess: async () => {
      setOpen(false);

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["monthly-summary"],
      });
    },

    onError: (error) => {
      console.error("DELETE ERROR:", error?.response?.data || error);
    },
  });

  return (
    <>
      {/* DELETE ICON */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        title="Delete transaction"
        className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="size-5" />
      </Button>

      {/* DELETE MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl border bg-background p-6 text-foreground shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-3 top-3"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </Button>

            {/* TITLE */}
            <h2 className="text-xl font-bold">Delete transaction?</h2>

            {/* DESCRIPTION */}
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {transaction.title}
              </span>
              ? This action cannot be undone.
            </p>

            {/* ERROR */}
            {mutation.isError && (
              <div className="mt-4 rounded-lg bg-red-500/10 p-3">
                <p className="text-sm text-red-500">
                  {mutation.error?.response?.data?.message ||
                    "Failed to delete transaction."}
                </p>
              </div>
            )}

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={mutation.isPending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={mutation.isPending}
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => mutation.mutate()}
              >
                {mutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteTransactionDialog;
