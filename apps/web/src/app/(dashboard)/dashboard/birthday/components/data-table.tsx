/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsVerticalIcon,
} from '@radix-ui/react-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  Copy,
  HeartCrack,
  HeartHandshake,
  Loader2,
  PenLine,
  Plus,
  QrCode,
  TrashIcon,
  User,
} from 'lucide-react'
import * as React from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { verifyBirthday } from '@/utils/verifyBirthday'

import { deleteBirthdayMutation } from '../mutation/delete-birthday-mutation'
import { CreatePerson } from './create-birthday-person'
import { BdayPersonProps, PersonProps } from './types'
import { UpdatePerson } from './update-birthday-person'

export function DataTable({ data: dataBirthdayPerson }: BdayPersonProps) {
  const queryClient = useQueryClient()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const { isPending, mutateAsync: deletePersonMutation } = useMutation({
    mutationFn: deleteBirthdayMutation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['birthday'] }),
  })

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const handleDeleteBirthdayPerson = async (person: PersonProps) => {
    if (person) {
      try {
        const response = await deletePersonMutation(person)

        if (response.data) {
          toast.success(`The ${person.name} person deleted`, {
            description: 'Your person has been deleted successfully.',
          })
        }
      } catch (error: any) {
        toast.error(
          `${error.response.data.message}` || `${error.response.message}`,
          {
            description:
              'An error occurred while deleting the person. Maybe you dont have permission to do this action.',
          },
        )
      }
    }
  }

  const columns: ColumnDef<PersonProps | any>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'birthDate',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Birthday
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{verifyBirthday(row.getValue('birthDate'))}</div>,
    },
    {
      accessorKey: 'gender',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Gender
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue('gender')}</div>
      ),
    },
    {
      accessorKey: 'maritalStatus',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Matiral Status
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div>
          {row.getValue('maritalStatus') === 'Married' ||
          row.getValue('maritalStatus') === 'married' ? (
            <div className="flex items-center gap-2">
              Married
              <HeartHandshake className="mr-2 h-4 w-4" />
            </div>
          ) : row.getValue('maritalStatus') === 'Single' ||
            row.getValue('maritalStatus') === 'single' ? (
            <div className="flex items-center gap-2">
              Single
              <User className="mr-2 h-4 w-4" />
            </div>
          ) : row.getValue('maritalStatus') === 'Divorced' ||
            row.getValue('maritalStatus') === 'divorced' ? (
            <div className="flex items-center gap-2">
              Divorced
              <HeartCrack className="mr-2 h-4 w-4" />
            </div>
          ) : (
            'Single'
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const person = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <UpdatePerson person={person}>
                <DropdownMenuLabel className="flex cursor-pointer rounded-md hover:bg-muted">
                  <PenLine className="mr-3 h-4 w-4" />
                  Edit
                </DropdownMenuLabel>
              </UpdatePerson>
              <DropdownMenuItem className="cursor-pointer">
                <QrCode className="mr-3 h-4 w-4" />
                QR Code
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Copy className="mr-3 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteBirthdayPerson(person)}
                className="cursor-pointer text-rose-500 hover:text-white focus:bg-rose-600 focus:text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="mr-3 h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <>
                    <TrashIcon className="mr-3 h-4 w-4" />
                    Delete
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: dataBirthdayPerson,
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
      <div className="items-center gap-2 py-4 md:flex">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            table.getColumn('name')?.setFilterValue(event.target.value)
          }}
          className="mb-2 w-full md:mb-0 md:w-auto"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="mb-2 ml-auto w-full md:mb-0 md:w-auto"
            >
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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

        <CreatePerson>
          <Button
            variant="birthday"
            size="sm"
            className="w-full text-white md:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create 🎉
          </Button>
        </CreatePerson>
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
                            header.getContext(),
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
