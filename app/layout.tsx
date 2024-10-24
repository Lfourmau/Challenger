import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Challenger",
  description: "Internal admin tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} //can add 'dark' in the classname here to pass in darkmode
        >
        <NavigationMenu className="sticky top-0 z-50">
          <NavigationMenuList>
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <NavigationMenuTrigger>Post data</NavigationMenuTrigger>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <NavigationMenuLink href="/">Add challenge</NavigationMenuLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavigationMenuLink href="/add_category">Add category</NavigationMenuLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <NavigationMenuLink href="/add_activity">Add activity</NavigationMenuLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavigationMenuTrigger>Administration</NavigationMenuTrigger>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <NavigationMenuLink href="/admin/challenges">Challenges</NavigationMenuLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavigationMenuLink href="/admin/videos">Videos</NavigationMenuLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <NavigationMenuLink href="/admin/users">Users</NavigationMenuLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>


              <NavigationMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavigationMenuTrigger>Stats</NavigationMenuTrigger>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <NavigationMenuLink href="/stats">Overview</NavigationMenuLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
        <Toaster position="bottom-center" />
        {children}
      </body>
    </html>
  );
}
