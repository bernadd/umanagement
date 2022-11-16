import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { TableStyled } from "@/components/Table";
import { usePagination } from "@/hooks/usePagination";
import { usePermissions } from "@/hooks/usePermissions";
import { IPermission } from "@/types/permission.type";

export default function PermissionsTableList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isRefetching } = usePermissions(currentPage, pageSize);

  const columnHelper = createColumnHelper<IPermission>();
  const columns = useMemo(() => {
    return [
      columnHelper.accessor("id", {
        header: () => "#",
        cell: (info) => info.getValue(),
        size: 20,
      }),
      columnHelper.accessor("name", {
        header: () => "Permission Name",
        cell: (info) => info.getValue(),
      }),
    ];
  }, [columnHelper]);

  const { totalPageCount, pagination } = usePagination({
    currentPage,
    count: data?.count || -1,
    pageSize,
    siblings: 1,
  });

  const table = useReactTable({
    data: data?.permissions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    pageCount: data?.count || -1,
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
              router.push("/permissions/new");
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
                    ...(header.getSize() && {
                      width: header.getSize(),
                      maxWidth: header.getSize(),
                      minWidth: header.getSize(),
                    }),
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ fontStyle: "italic" }}>
                No data found.
              </td>
            </tr>
          )}
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
