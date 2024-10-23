"use client"; 

import Image from "next/image";
import { Button } from "@/components/ui/button"
import PostChall from "@/components/customForms/postChall"
import DisplayStats from "@/components/stats/displayStats";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StatsPage() {
  const [portal, setPortal] = useState("")
  const handlePortalChange = (newPortal) => {
		setPortal(newPortal)
	};
  return (
    <div className="[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <form className="w-full">
				<div className="mt-4">
					<label>Portal</label>
					<Select onValueChange={handlePortalChange}>
						<SelectTrigger>
							<SelectValue placeholder="Select portal" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Kywo sport" className="cursor-pointer">Kywo sport</SelectItem>
							<SelectItem value="Kywo e-sport" className="cursor-pointer">Kywo e-sport</SelectItem>
						</SelectContent>
					</Select>
				</div>

			</form>
        <DisplayStats portal={portal}></DisplayStats>
      </main>
    </div>
  );
}
