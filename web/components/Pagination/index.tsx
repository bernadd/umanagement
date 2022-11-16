import Image from "next/image";
import React, { useMemo } from "react";
import styled from "styled-components";
import { CircleButton } from "@/components/Button";
import { IPage } from "@/hooks/usePagination";
import arrowLeftLong from "@/assets/arrow-left-long.svg";
import arrowRightLong from "@/assets/arrow-right-long.svg";

export const PaginationStyled = styled.div`
  display: flex;
  padding: 10px;
`;

interface PaginationProps {
  pagination: IPage[];
  current: number;
  totalPageCount: number;
  showNextPrevButtons?: boolean;
  showNumbering?: boolean;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  pagination,
  current,
  totalPageCount,
  showNextPrevButtons = true,
  showNumbering = true,
  onPageChange,
}: PaginationProps) {
  const canGetPrevPage = useMemo(() => {
    return current === 1;
  }, [current]);

  const canGetNextPage = useMemo(() => {
    return totalPageCount === current;
  }, [totalPageCount, current]);

  return (
    <PaginationStyled>
      {showNextPrevButtons && (
        <CircleButton
          onClick={() => onPageChange(current - 1)}
          disabled={canGetPrevPage}
        >
          <Image src={arrowLeftLong} alt="Back" width={16} height={16} />
        </CircleButton>
      )}
      {showNumbering &&
        pagination.map((page, index) => {
          return (
            <CircleButton
              key={index}
              onClick={() => onPageChange(page.value)}
              variant={page.value === current ? "primary" : "white"}
            >
              {page.label}
            </CircleButton>
          );
        })}
      {showNextPrevButtons && (
        <CircleButton
          onClick={() => onPageChange(current + 1)}
          disabled={canGetNextPage}
        >
          <Image src={arrowRightLong} alt="Back" width={16} height={16} />
        </CircleButton>
      )}
    </PaginationStyled>
  );
}
