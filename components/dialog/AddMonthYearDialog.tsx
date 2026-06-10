import { trpc } from "@/lib/trpc/client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";

const AddMonthYearDialog = ({
  selectedMonthYear,
  type,
}: {
  selectedMonthYear: string;
  type: string;
}) => {
  const [open, setOpen] = useState(false);
  const [transaction, setTransaction] = useState({
    title: "",
    amount: 0,
  });

  const utils = trpc.useUtils();

  const { mutate: createTransaction, isPending } =
    trpc.transaction.addTransaction.useMutation({
      onSuccess: () => {
        setOpen(false);
        setTransaction({
          title: "",
          amount: 0,
        });
        utils.transaction.getAll.invalidate();
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transaction.title || !transaction.amount) return;
    createTransaction({
      monthYear: selectedMonthYear,
      type: type,
      ...transaction,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-zinc-200 text-xs sm:text-sm hover:bg-white/60 hover:text-zinc-900 cursor-pointer px-2 sm:px-3"
        >
          <Plus className="size-4 mr-1" />
          {type === "income" ? "Add Income" : "Add Expense"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-zinc-800/60 border-0 text-zinc-100">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-zinc-200 capitalize">
              New {type}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Add a new {type} for {selectedMonthYear}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-6">
            <Field>
              <label htmlFor="monthYear" className="text-sm font-medium">
                {type === "income" ? "Income" : "Expense"} Title
              </label>
              <Input
                id="title"
                placeholder="e.g. Salary, Rent, etc."
                value={transaction.title}
                onChange={(e) =>
                  setTransaction({ ...transaction, title: e.target.value })
                }
                className="bg-black/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-500 mt-2"
                required
              />
            </Field>
            <Field className="mt-2">
              <label htmlFor="note" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g. 1000"
                value={transaction.amount || ""}
                onChange={(e) =>
                  setTransaction({
                    ...transaction,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="bg-black/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 resize-none focus-visible:ring-zinc-500 mt-2"
                required
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-6 border-0">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="hover:bg-zinc-800 text-zinc-300 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-white text-black hover:bg-zinc-200 cursor-pointer"
            >
              {isPending ? <Spinner className="mr-2 h-4 w-4" /> : null}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMonthYearDialog;
