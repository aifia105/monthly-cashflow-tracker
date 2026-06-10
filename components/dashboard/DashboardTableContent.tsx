import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";

const DashboardTableContent = () => {
  return (
    /* Stack on mobile, side-by-side on sm+ */
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Income Table */}
      <div className="flex-1 flex flex-col gap-2 border border-zinc-400 rounded-xl p-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-zinc-400 text-xs sm:text-sm font-normal uppercase tracking-wide">
            income items
          </span>
          <div className="flex items-center gap-1">
            <Badge
              variant={"outline"}
              className="text-zinc-700 text-xs sm:text-sm mr-1 font-medium p-2 bg-black"
            >
              <span className="text-green-700">1400$</span>
            </Badge>
            <Button
              variant={"ghost"}
              className="text-zinc-200 text-xs sm:text-sm hover:bg-white/60 hover:text-zinc-900 cursor-pointer px-2 sm:px-3"
            >
              <Plus className="size-3" />
              <span className="hidden xs:inline sm:inline">Add income</span>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Table className="text-zinc-200">
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i} className="border-zinc-800">
                  <TableCell className="w-[65%] sm:w-[70%] py-2 px-2 sm:px-3">
                    <Input
                      readOnly
                      placeholder="Income label"
                      className="border border-zinc-700 bg-transparent text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    />
                  </TableCell>
                  <TableCell className="w-[35%] sm:w-[30%] py-2 px-2 sm:px-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Input
                        readOnly
                        placeholder="00.00$"
                        className="border border-zinc-700 bg-transparent text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="shrink-0 cursor-pointer hover:bg-transparent"
                      >
                        <Trash2 className="size-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="flex-1 flex flex-col gap-2 border border-zinc-400 rounded-xl p-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-zinc-400 text-xs sm:text-sm font-normal uppercase tracking-wide">
            expense items
          </span>
          <div className="flex items-center gap-1">
            <Badge
              variant={"outline"}
              className="text-zinc-700 text-xs sm:text-sm mr-1 font-medium p-2 bg-black"
            >
              <span className="text-red-500">800$</span>
            </Badge>
            <Button
              variant={"ghost"}
              className="text-zinc-200 text-xs sm:text-sm hover:bg-white/60 hover:text-zinc-900 cursor-pointer px-2 sm:px-3"
            >
              <Plus className="size-3" />
              <span className="hidden xs:inline sm:inline">Add expense</span>
            </Button>
          </div>
        </div>

        <div className="overflow-hidden">
          <Table className="text-zinc-200">
            <TableBody>
              {[1, 2, 3].map((i) => (
                <TableRow key={i} className="border-zinc-800">
                  <TableCell className="w-[65%] sm:w-[70%] py-2 px-2 sm:px-3">
                    <Input
                      readOnly
                      placeholder="Expense label"
                      className="border border-zinc-700 bg-transparent text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    />
                  </TableCell>
                  <TableCell className="w-[35%] sm:w-[30%] py-2 px-2 sm:px-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Input
                        readOnly
                        placeholder="00.00$"
                        className="border border-zinc-700 bg-transparent text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                      />
                      <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="shrink-0 cursor-pointer hover:bg-transparent"
                      >
                        <Trash2 className="size-4 text-red-400" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTableContent;
