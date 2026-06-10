import React from "react";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const DashboardTableHeader = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-start mb-2">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-zinc-200 text-lg font-medium capitalize tracking-wide">
            Month Year
          </h3>
          <p className="text-zinc-400 text-sm">2026-10-10</p>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant={"outline"}
            className="text-zinc-700 text-sm sm:text-lg mr-1 sm:mr-3 font-medium p-2 bg-black"
          >
            <span className="text-green-700">1400$</span>
          </Badge>
          <Badge
            variant={"ghost"}
            className="hidden sm:flex text-zinc-400 text-sm font-medium bg-black hover:bg-white/60 hover:text-zinc-900 cursor-pointer"
          >
            Hide Details
          </Badge>
          <Button variant={"ghost"} className="bg-black cursor-pointer">
            <Trash2 className="size-4 text-red-400" />
          </Button>
        </div>
      </div>

      {/* Fields — 2-col grid on mobile, 4-col row on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 mt-2">
        <div className="flex flex-col gap-2">
          <label className="text-zinc-200 text-sm font-normal uppercase">
            Month
          </label>
          <Input
            readOnly
            placeholder="--/--/----"
            className="border border-zinc-400 text-zinc-400 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-200 text-sm font-normal uppercase">
            Income
          </label>
          <Input
            readOnly
            placeholder="00.00$"
            className="border border-zinc-400 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-zinc-200 text-sm font-normal uppercase">
            Expenses
          </label>
          <Input
            readOnly
            placeholder="00.00$"
            className="border border-zinc-400 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        {/* Notes spans full width on mobile, normal on desktop */}
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
          <label className="text-zinc-200 text-sm font-normal uppercase">
            Notes
          </label>
          <Textarea
            readOnly
            placeholder="Notes about this month"
            className="border border-zinc-400 text-zinc-200 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 resize-none"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardTableHeader;
