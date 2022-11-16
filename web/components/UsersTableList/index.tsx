import React, { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";
import { TableStyled } from "@/components/Table";
import { Badge } from "@/components/Badge";
import { IUser } from "@/types/user.types";
import { Button, ButtonGroup, CircleButton } from "@/components/Button";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import { useDeleteUser, useUsers } from "@/hooks/useUsers";
import { usePagination } from "@/hooks/usePagination";
import pencil from "@/assets/pencil.svg";
import trash from "@/assets/trash-can.svg";

export default function UserTableList() {
  const router = useRouter();
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

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        header: () => "#",
        cell: (info) => info.getValue(),
        size: 20,
      }),
      columnHelper.accessor("firstName", {
        header: () => "First Name",
        cell: (info) => info.getValue(),
        size: 80,
      }),
      columnHelper.accessor("lastName", {
        header: () => "Last Name",
        cell: (info) => info.getValue(),
        size: 80,
      }),
      columnHelper.accessor("username", {
        header: () => "Username",
        cell: (info) => info.getValue(),
        size: 140,
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
        cell: (info) => info.getValue(),
        size: 220,
      }),
      columnHelper.accessor("permissions", {
        header: () => "Permissions",
        cell: (props) => {
          return props.getValue().length > 0 ? (
            props.getValue().map((permission) => {
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
        size: 140,
      }),
      columnHelper.accessor("status", {
        header: () => "Status",
        cell: (info) => (
          <Badge variant={info.getValue()}>{info.getValue()}</Badge>
        ),
        size: 100,
      }),
      columnHelper.accessor("createdAt", {
        header: () => "Created",
        cell: (info) => format(parseISO(info.getValue()), "MM/dd/yyyy h:mm a"),
        size: 160,
      }),
      columnHelper.accessor("updatedAt", {
        header: () => "Updated",
        cell: (info) => format(parseISO(info.getValue()), "MM/dd/yyyy h:mm a"),
        size: 160,
      }),
      columnHelper.display({
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
        size: 80,
      }),
    ];
  }, [columnHelper, deleteUser, router]);

  const table = useReactTable({
    data: usersData?.users || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
