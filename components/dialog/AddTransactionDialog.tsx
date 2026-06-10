"use client";

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
import { Input } from "../ui/input";
import { Field, FieldGroup } from "../ui/field";
import { Plus } from "lucide-react";
import { trpc } from "@/lib/trpc/client";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

const AddTransactionDialog = () => {
  const [open, setOpen] = useState(false);
  const [monthYear, setMonthYear] = useState("");
  const [note, setNote] = useState("");

  const utils = trpc.useUtils();

  const { mutate: createMonthYear, isPending } =
    trpc.transaction.createMonthYear.useMutation({
      onSuccess: () => {
        setOpen(false);
        setMonthYear("");
        setNote("");
        utils.transaction.getAll.invalidate();
      },
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!monthYear) return;
    createMonthYear({
      monthYear,
      note,
      totalIncome: 0,
      totalExpense: 0,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-zinc-200 text-sm font-medium hover:bg-white/60 hover:text-zinc-900 h-9 cursor-pointer"
        >
          <Plus className="size-4 mr-1" />
          Add Month
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-zinc-800/60 border-0 text-zinc-100">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>New Month</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Create a new monthly cash flow statement.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-6">
            <Field>
              <label htmlFor="monthYear" className="text-sm font-medium">
                Month & Year
              </label>
              <Input
                id="monthYear"
                placeholder="e.g. June 2026"
                value={monthYear}
                onChange={(e) => setMonthYear(e.target.value)}
                className="bg-black/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-500 mt-2"
                required
              />
            </Field>
            <Field className="mt-2">
              <label htmlFor="note" className="text-sm font-medium">
                Note (Optional)
              </label>
              <Textarea
                id="note"
                placeholder="Any notes for this month..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="bg-black/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 resize-none focus-visible:ring-zinc-500 mt-2"
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

export default AddTransactionDialog;
