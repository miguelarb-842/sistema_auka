import type { VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

import Link from "next/link";
import { buttonVariants } from "@heroui/styles";

import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  isIconOnly,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, fullWidth, isIconOnly }),
        className,
      )}
      {...props}
    />
  );
}
