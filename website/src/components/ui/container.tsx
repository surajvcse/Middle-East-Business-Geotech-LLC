import type { HTMLAttributes, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div className={["container", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
