"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { MenuIcon } from "lucide-react";

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
      <div className="container flex h-[72px] w-full items-center justify-between py-4 sm:px-4">
        <div className="flex items-center gap-4 sm:gap-10">
          <Link href="/">
            <Image src="/logo.svg" alt="Finance AI" width={133} height={39} />
          </Link>
          <div className="hidden sm:flex sm:items-center sm:gap-10">
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
          <div className="sm:hidden">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <MenuIcon />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col gap-10 p-8">
                    {React.Children.toArray(
                      nav.map((link) => (
                        <Link
                          href={link.path}
                          className={
                            pathname === link.path
                              ? "font-bold text-primary"
                              : ""
                          }
                        >
                          {link.label}
                        </Link>
                      )),
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <UserButton showName />
      </div>
    </header>
  );
};

export default Header;
