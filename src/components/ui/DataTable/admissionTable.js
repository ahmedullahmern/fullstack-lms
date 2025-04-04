"use client"

// import * as React from "react"
import { useState } from "react"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, EyeIcon, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { updateAdmission } from "@/actions/admissions"
// const data = [
//     {
//         id: "1",
//         batchName: "Batch A",
//         status: "ongoing",
//         trainer: "John Doe",
//         noOfStudents: 25,
//         course: "Web and App Development",
//     },
//     {
//         id: "2",
//         batchName: "Batch B",
//         status: "pending",
//         trainer: "Jane Smith",
//         noOfStudents: 20,
//         course: "App Development",
//     },
//     {
//         id: "3",
//         batchName: "Batch C",
//         status: "completed",
//         trainer: "Alice Johnson",
//         noOfStudents: 30,
//         course: "Python Development",
//     },

// ]


export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "course",
        header: ({ column }) => {
            return (
                <Button
                    variant="course"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "course")}
                >
                    <div className="text-right">Course</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("course")?.title}</div>,
    },
    {
        accessorKey: "batch",
        header: ({ column }) => {
            return (
                <Button
                    variant="batch"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "batch")}
                >
                    <div className="text-right">Batch</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue("batch")?.title}</div>,
    },
    {
        accessorKey: "status",
        header: () => <div className="capitalize text-center">Status</div>,
        cell: ({ row }) => (
            <div>{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "startDate",
        header: () => <div className="capitalize text-center">Start Date</div>,
        cell: ({ row }) => (
            <div>{row.getValue("startDate")}</div>
        ),
    },
    {
        accessorKey: "endDate",
        header: () => <div className="capitalize text-center">End Date</div>,
        cell: ({ row }) => (
            <div>{row.getValue("endDate")}</div>
        ),
    },
    {
        accessorKey: "Detail",
        header: () => <div className="capitalize text-center">Detail</div>,
        cell: ({ row }) => {
            const admission = row.original;
            return (
                <Link href={`/admin/admissions/${admission._id}`}>
                    <EyeIcon />
                </Link>
            )
        },
    },
    {
        accessorKey: "status",
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const admission = row.original;
            return (
                <div className="flex gap-5">
                    <Select
                        defaultValue={row.getValue("status")}
                        onValueChange={async (value) => {
                            console.log("value=>", value);
                            console.log("id=>", admission._id);
                            await updateAdmission(admission._id, value);
                        }}
                    >
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">pending</SelectItem>
                            <SelectItem value="open">open</SelectItem>
                            <SelectItem value="close">close</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            );
        },
    },
    // {
    //     id: "actions",
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const course = row.original

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Courses</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         onClick={() => navigator.clipboard.writeText(course.id)}
    //                     >
    //                         Copy Batch Name
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem>View Detailes</DropdownMenuItem>
    //                     <DropdownMenuItem>Change Status</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     },
    // },
]

export function AdmissionTable({ admission }) {
    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] =
        useState({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: admission,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter course..."
                    value={(table.getColumn("course")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("course")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Filter batchName..."
                    value={(table.getColumn("title")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns?.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows?.length} of{" "}
                    {table.getFilteredRowModel().rows?.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
