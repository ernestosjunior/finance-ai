"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const nav = [
  { path: "/", label: "Dashboard" },
  { path: "/transactions", label: "Transações" },
  { path: "/subscription", label: "Assinatura" },
];

const Header = () => {
  const pathname = usePathname();

  const dontRender = ["/login"];

  if (dontRender.includes(pathname)) return null;

  return (
    <header className="w-full border-b border-solid border-[#FFFFFF14]">
      <div className="container flex h-[72px] w-full items-center justify-between py-4 sm:px-0">
        <div className="flex items-center gap-10">
          <Link href="/">
            <Image src="/logo.svg" alt="Finance AI" width={133} height={39} />
          </Link>
          {React.Children.toArray(
            nav.map((link) => (
              <Link
                href={link.path}
                className={
                  pathname === link.path ? "font-bold text-primary" : ""
                }
              >
                {link.label}
              </Link>
            )),
          )}
        </div>

        <UserButton showName />
      </div>
    </header>
  );
};

export default Header;
