import React, { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { TableStyled } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { IUser } from "@/types/user.types";
import { Button, ButtonGroup, CircleButton } from "@/components/Button";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import { InputField } from "@/components/Form";
import { useDeleteUser, useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import pencil from "@/assets/pencil.svg";
import trash from "@/assets/trash-can.svg";
import sortUp from "@/assets/sort-up.svg";
import sortDown from "@/assets/sort-down.svg";
import sort from "@/assets/sort.svg";

export default function UserTableList() {
  const router = useRouter();
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch users
  const { data: usersData, isRefetching } = useUsers(currentPage, pageSize);
  const deleteUser = useDeleteUser(currentPage);

  const { totalPageCount, pagination } = usePagination({
    currentPage,
    count: usersData?.count || -1,
    pageSize,
    siblings: 1,
  });

  const columnHelper = createColumnHelper<IUser>();

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => "#",
        enableSorting: false,
        enableGlobalFilter: false,
        size: 60,
      },
      {
        accessorKey: "firstName",
        header: () => "First Name",
        enableSorting: true,
        enableColumnFilter: true,
        size: 100,
      },
      {
        accessorKey: "lastName",
        header: () => "Last Name",
        enableSorting: true,
        enableGlobalFilter: true,
        size: 100,
      },
      {
        accessorKey: "username",
        header: () => "Username",
        enableSorting: true,
        enableGlobalFilter: true,
        size: 140,
      },
      {
        accessorKey: "email",
        header: () => "Email",
        enableSorting: true,
        enableGlobalFilter: true,
        size: 220,
      },
      {
        accessorKey: "permissions",
        header: () => "Permissions",
        accessorFn: (data) => {
          return data.permissions.map((item) => item.Permission.name).join(",");
        },
        cell: (props) => {
          return props.row.original.permissions.length > 0 ? (
            props.row.original.permissions.map((permission) => {
              return (
                <div key={permission.Permission.id}>
                  {permission.Permission.name}
                </div>
              );
            })
          ) : (
            <div style={{ fontStyle: "italic" }}>No permissions.</div>
          );
        },
        enableSorting: false,
        enableGlobalFilter: true,
        size: 140,
      },
      {
        accessorKey: "status",
        header: () => "Status",
        cell: (props) => (
          <Badge variant={props.row.original.status}>
            {props.row.original.status}
          </Badge>
        ),
        enableSorting: true,
        enableGlobalFilter: true,
        size: 100,
      },
      {
        accessorKey: "createdAt",
        header: () => "Created",
        enableSorting: true,
        enableGlobalFilter: false,
        size: 160,
      },
      {
        accessorKey: "updatedAt",
        header: () => "Updated",
        enableSorting: true,
        enableGlobalFilter: false,
        size: 160,
      },
      {
        id: "actions",
        header: () => "Actions",
        cell: (props) => {
          return (
            <ButtonGroup>
              <CircleButton
                onClick={() => {
                  router.push(
                    `/users/${props.row.original.id}`,
                    `/users/${props.row.original.id}`,
                    {
                      shallow: true,
                    }
                  );
                }}
              >
                <Image src={pencil} alt="Menu" width={16} height={16} />
              </CircleButton>
              <CircleButton
                onClick={() => {
                  deleteUser.mutate(props.row.original.id);
                }}
              >
                <Image src={trash} alt="Menu" width={16} height={16} />
              </CircleButton>
            </ButtonGroup>
          );
        },
        enableSorting: false,
        enableGlobalFilter: false,
        size: 80,
      },
    ],
    [deleteUser, router]
  );

  const table = useReactTable({
    data: usersData?.users || [],
    columns,
    state: {
      globalFilter,
      sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageCount: usersData?.count || -1,
    manualPagination: true,
  });

  return (
    <Card>
      <div className="card-header">
        {pagination.length > 0 && (
          <Pagination
            pagination={pagination}
            current={currentPage}
            showNumbering={false}
            totalPageCount={totalPageCount}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        )}
        <InputField
          onChange={(e) => {
            setGlobalFilter(e.currentTarget.value);
          }}
          placeholder="Search..."
        />
        <div className="card-actions">
          <Button
            variant="primary"
            onClick={() => {
              router.push("/users/new");
            }}
          >
            Create new
          </Button>
        </div>
      </div>
      <TableStyled className={isRefetching ? "refetching" : ""}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  align="left"
                  style={{
                    width: header.getSize(),
                    maxWidth: header.getSize(),
                    minWidth: header.getSize(),
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "column cursor-pointer select-none"
                          : "column",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && (
                        <span className="sort-icon">
                          {!header.column.getIsSorted() && (
                            <Image
                              src={sort}
                              alt="Sort"
                              width={16}
                              height={16}
                            />
                          )}
                          {header.column.getIsSorted() === "asc" && (
                            <Image
                              src={sortDown}
                              alt="Sort"
                              width={16}
                              height={16}
                            />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <Image
                              src={sortUp}
                              alt="Sort"
                              width={16}
                              height={16}
                            />
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableStyled>
      {pagination.length > 0 && (
        <TableStyled>
          <tfoot>
            <tr>
              <td colSpan={8}>
                <Pagination
                  pagination={pagination}
                  current={currentPage}
                  totalPageCount={totalPageCount}
                  onPageChange={(newPage) => setCurrentPage(newPage)}
                />
              </td>
            </tr>
          </tfoot>
        </TableStyled>
      )}
    </Card>
  );
}
