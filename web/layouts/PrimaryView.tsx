import React from "react";

interface PrimaryViewProps {
  children: React.ReactNode;
}

export default function PrimaryView({ children }: PrimaryViewProps) {
  return <div>{children}</div>;
}
