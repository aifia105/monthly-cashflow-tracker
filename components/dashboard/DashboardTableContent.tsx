import React from "react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import AddMonthYearDialog from "../dialog/AddMonthYearDialog";

const DashboardTableContent = ({
  data,
  selectedMonthYear,
}: {
  data: any;
  selectedMonthYear: string;
}) => {
  const incomes =
    data.transactions?.filter((t: any) => t.type === "income") || [];
  const expenses =
    data.transactions?.filter((t: any) => t.type === "expense") || [];

  return (
    /* Stack on mobile, side-by-side on sm+ */
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      {/* Income Table */}
      <div className="flex-1 flex flex-col gap-2 border border-zinc-400 rounded-xl p-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-zinc-400 text-xs sm:text-sm font-normal uppercase tracking-wide">
            income items
          </span>
          <div className="flex items-center gap-1">
            <Badge
              variant={"outline"}
              className="text-zinc-700 text-xs sm:text-sm mr-1 font-medium p-2 bg-black"
            >
              <span className="text-green-700">{data.totalIncome || 0}$</span>
            </Badge>
            <AddMonthYearDialog
              selectedMonthYear={selectedMonthYear}
              type="income"
            />
          </div>
        </div>

        <div className="overflow-hidden">
          <Table className="text-zinc-200">
            <TableBody>
              {incomes.length === 0 && (
                <TableRow className="border-0">
                  <TableCell
                    colSpan={2}
                    className="text-center text-zinc-500 py-4"
                  >
                    No income items
                  </TableCell>
                </TableRow>
              )}
              {incomes.map((t: any) => (
                <TableRow key={t._id} className="border-0">
                  <TableCell className="w-[65%] sm:w-[70%] py-2 px-2 sm:px-3">
                    <Input
                      readOnly
                      value={t.title}
                      placeholder="Income label"
                      className="border-0 bg-zinc-900 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    />
                  </TableCell>
                  <TableCell className="w-[35%] sm:w-[30%] py-2 px-2 sm:px-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Input
                        readOnly
                        value={`${t.amount}$`}
                        placeholder="00.00$"
                        className="border-0 bg-zinc-900 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
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
              <span className="text-red-500">{data.totalExpense || 0}$</span>
            </Badge>
            <AddMonthYearDialog
              selectedMonthYear={selectedMonthYear}
              type="expense"
            />
          </div>
        </div>

        <div className="overflow-hidden">
          <Table className="text-zinc-200">
            <TableBody>
              {expenses.length === 0 && (
                <TableRow className="border-0">
                  <TableCell
                    colSpan={2}
                    className="text-center text-zinc-500 py-4"
                  >
                    No expense items
                  </TableCell>
                </TableRow>
              )}
              {expenses.map((t: any) => (
                <TableRow key={t._id} className="border-0">
                  <TableCell className="w-[65%] sm:w-[70%] py-2 px-2 sm:px-3">
                    <Input
                      readOnly
                      value={t.title}
                      placeholder="Expense label"
                      className="border-0 bg-zinc-900 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    />
                  </TableCell>
                  <TableCell className="w-[35%] sm:w-[30%] py-2 px-2 sm:px-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Input
                        readOnly
                        value={`${t.amount}$`}
                        placeholder="00.00$"
                        className="border-0 bg-zinc-900 text-zinc-200 h-9 w-full cursor-default focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
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
