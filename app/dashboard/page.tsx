"use client";

import DashboardTableContent from "@/components/dashboard/DashboardTableContent";
import DashboardTableHeader from "@/components/dashboard/DashboardTableHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState, useEffect } from "react";
import AddTransactionDialog from "@/components/dialog/AddTransactionDialog";
import { trpc } from "@/lib/trpc/client";
import { Spinner } from "@/components/ui/spinner";

const page = () => {
  const { data: monthYears, isLoading } = trpc.transaction.getAll.useQuery();
  const [selectedMonthYear, setSelectedMonthYear] = useState<string>("");

  useEffect(() => {
    if (monthYears && monthYears.length > 0 && !selectedMonthYear) {
      setSelectedMonthYear(monthYears[0].monthYear);
    }
  }, [monthYears, selectedMonthYear]);

  const currentDocument = monthYears?.find(
    (my: any) => my.monthYear === selectedMonthYear,
  );

  return (
    <section className="relative z-10 w-full px-3 sm:px-6 flex flex-col gap-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-3 sm:gap-0">
        <div className="flex flex-col gap-2">
          <h3 className="text-zinc-500 text-lg sm:text-2xl font-medium uppercase tracking-wide">
            monthly cash flow statement
          </h3>
          <p className="text-zinc-400 text-sm">
            Log actuals to understand the delta between your plan and reality.
          </p>
        </div>
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {monthYears && monthYears.length > 0 && (
            <select
              value={selectedMonthYear}
              onChange={(e) => setSelectedMonthYear(e.target.value)}
              className="bg-black border border-zinc-700 text-zinc-200 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block p-2 outline-none h-9"
            >
              {monthYears.map((my: any) => (
                <option
                  className="text-zinc-200 rounded-md"
                  key={my._id}
                  value={my.monthYear}
                >
                  {my.monthYear}
                </option>
              ))}
            </select>
          )}
          <AddTransactionDialog />
        </div>
      </div>

      {isLoading ? (
        <Button
          variant="outline"
          className="text-zinc-100 border-0 text-lg mt-20 items-center "
          disabled
          size="lg"
        >
          <Spinner data-icon="inline-start" className="size-8" />
          Loading...
        </Button>
      ) : currentDocument ? (
        <div className="w-full h-full border border-zinc-400 rounded-xl p-3 sm:p-4 relative bg-linear-to-bl shadow-lg from-zinc-800/20 to-black/20 mb-6">
          <DashboardTableHeader data={currentDocument} />
          <DashboardTableContent
            data={currentDocument}
            selectedMonthYear={selectedMonthYear}
          />
        </div>
      ) : (
        <div className="text-zinc-400 mt-20 text-lg text-center border border-zinc-800 rounded-xl p-8 bg-zinc-900/20">
          No monthly cash flow statements found. Click "Add Month" to get
          started.
        </div>
      )}
    </section>
  );
};

export default page;
