import { useEffect, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateTransaction } from "@/lib/api/transactionApi";
import { getErrorMessage } from "@/utils/errorUtils";

const EditTransactionDialog = ({ transaction }) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title || "",
        amount: transaction.amount || "",
        type: transaction.type || "expense",
        category: transaction.category || "",
        date: transaction.date
          ? new Date(transaction.date).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [transaction]);

  const mutation = useMutation({
    mutationFn: updateTransaction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["monthly-summary"],
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
      id: transaction._id,

      transactionData: {
        ...formData,
        amount: Number(formData.amount),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="Edit transaction"
        >
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit Transaction
          </DialogTitle>

          <DialogDescription>
            Update your transaction information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {mutation.isError && (
            <p className="text-sm text-destructive">
              {getErrorMessage(mutation.error)}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor={`title-${transaction._id}`}>
              Title
            </Label>

            <Input
              id={`title-${transaction._id}`}
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`amount-${transaction._id}`}>
              Amount
            </Label>

            <Input
              id={`amount-${transaction._id}`}
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Type</Label>

            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((previous) => ({
                  ...previous,
                  type: value,
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="income">
                  Income
                </SelectItem>

                <SelectItem value="expense">
                  Expense
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`category-${transaction._id}`}>
              Category
            </Label>

            <Input
              id={`category-${transaction._id}`}
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`date-${transaction._id}`}>
              Date
            </Label>

            <Input
              id={`date-${transaction._id}`}
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Transaction"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransactionDialog;