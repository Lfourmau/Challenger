"use client";
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function StatCard({title, description, data}){
	return (
<Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center justify-center gap-4">
			<h1 className="font-bold text-4xl">{data}</h1>
          </div>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
	)
}