import { useMemo, useState } from "react";
import { range } from "utils/range";

export interface IPage {
  value: number;
  label: string;
}

interface PaginationProps {
  currentPage: number;
  count: number;
  pageSize: number;
  siblings?: number;
}

export function usePagination({
  currentPage,
  count,
  pageSize,
  siblings = 6,
}: PaginationProps) {
  const pagination: IPage[] = useMemo(() => {
    const totalPageCount = Math.ceil(count / pageSize);

    const leftSiblingIndex = Math.max(currentPage - siblings, 1);
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblings;
      let leftRange = range(1, leftItemCount);

      return [
        ...leftRange,
        { value: leftRange[leftRange.length - 1].value + 1, label: "..." },
        {
          value: totalPageCount,
          label: totalPageCount.toString(),
        },
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [
        {
          value: firstPageIndex,
          label: firstPageIndex.toString(),
        },
        {
          value: rightRange[0].value - 2,
          label: "...",
        },
        ...rightRange,
      ];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        {
          value: firstPageIndex,
          label: firstPageIndex.toString(),
        },
        {
          value: middleRange[0].value - 2,
          label: "...",
        },
        ...middleRange,
        {
          value: middleRange[middleRange.length - 1].value + 1,
          label: "...",
        },
        {
          value: lastPageIndex,
          label: lastPageIndex.toString(),
        },
      ];
    }

    return [];
  }, [count, currentPage, pageSize, siblings]);

  return {
    totalPageCount: Math.ceil(count / pageSize),
    pagination,
  };
}
