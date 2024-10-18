import Image from "next/image";
import { Button } from "@/components/ui/button"
import PostChall from "@/components/customForms/postChall"
import PostCategory from "@/components/customForms/postCategory";

export default function AdminChallenges() {
  return (
    <div className="[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <PostCategory />
      </main>
    </div>
  );
}
