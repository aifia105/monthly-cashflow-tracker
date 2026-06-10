import DashboardTableContent from "@/components/dashboard/DashboardTableContent";
import DashboardTableHeader from "@/components/dashboard/DashboardTableHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const page = () => {
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
        <Button
          variant={"ghost"}
          className="text-zinc-200 text-sm font-medium hover:bg-white/60 hover:text-zinc-900 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          Add Month
        </Button>
      </div>
      <div className="w-full h-full border border-zinc-400 rounded-xl p-3 sm:p-4 relative bg-linear-to-bl shadow-lg from-zinc-800/20 to-black/20">
        <DashboardTableHeader />
        <DashboardTableContent />
      </div>
    </section>
  );
};

export default page;
