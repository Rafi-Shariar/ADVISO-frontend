import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/shared/Adviso_logo.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { img: 28, text: "text-lg" },
  md: { img: 36, text: "text-xl" },
  lg: { img: 48, text: "text-2xl" },
};

const Logo = ({
  className,
  imageClassName,
  showText = true,
  size = "lg",
}: LogoProps) => {
  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-90 select-none",
        className
      )}
    >
      <Image
        src={logo}
        alt="ADVISO Logo"
        width={currentSize.img}
        height={currentSize.img}
        priority
        className={cn("object-contain", imageClassName)}
      />

      {showText && (
        <span
          className={cn(
            "font-extrabold tracking-tight text-foreground font-sans",
            currentSize.text
          )}
        >
          ADVISO
        </span>
      )}
    </Link>
  );
};

export default Logo;