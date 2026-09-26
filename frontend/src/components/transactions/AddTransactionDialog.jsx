import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createTransaction } from "@/lib/api/transactionApi";
import { getErrorMessage } from "@/utils/errorUtils";

const AddTransactionDialog = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    Description: "",
    amount: "",
    type: "",
    category: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const mutation = useMutation({
    mutationFn: createTransaction,

    onSuccess: () => {
      // Refresh transaction list
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      // Refresh dashboard summary
      queryClient.invalidateQueries({
        queryKey: ["monthly-summary"],
      });

      setFormData({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: new Date().toISOString().slice(0, 10),
      });

      setOpen(false);
    },
  });

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      ...formData,

      // Backend Zod expects a number
      amount: Number(formData.amount),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Transaction
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>

          <DialogDescription>Add a new income or expense.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mutation.isError && (
            <p className="text-sm text-destructive">
              {getErrorMessage(mutation.error)}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              name="title"
              placeholder="ciwaan"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>

            <Input
              id="amount"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="$50"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>

            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value,
                }))
              }
              className="
              h-10 w-full rounded-lg border border-input
              bg-background px-3 text-foreground
              outline-none
              focus:border-ring focus:ring-2 focus:ring-ring/50
              dark:[color-scheme:dark]
              "
            >
              <option value="">Select type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>

            <Input
              id="category"
              name="category"
              placeholder="Food"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>

            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="
              bg-background
              text-foreground
              dark:[color-scheme:dark]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
