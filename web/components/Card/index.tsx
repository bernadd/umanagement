import React from "react";
import styled from "styled-components";

const CardStyled = styled.div`
  display: flex;
  flex-direction: column;

  .card-header {
    background-color: white;
    border-radius: 4px 4px 0 0;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .card-actions {
      margin-left: auto;
    }
  }
`;

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <CardStyled>{children}</CardStyled>;
}
