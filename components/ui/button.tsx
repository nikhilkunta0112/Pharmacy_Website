import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import type { AnchorHTMLAttributes } from "react";
const button = cva("button", {
  variants: {
    variant: {
      primary: "button-primary",
      secondary: "button-secondary",
      light: "button-light",
    },
  },
  defaultVariants: { variant: "primary" },
});
export function Button({
  variant,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof button>) {
  return <a className={twMerge(button({ variant }), className)} {...props} />;
}
