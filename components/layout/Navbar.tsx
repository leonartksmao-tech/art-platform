"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-[#1a1a2e] border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-extrabold text-sm">猫</span>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">猫猫老师 AI 创作教室</span>
          <span className="font-bold text-lg tracking-tight sm:hidden">AI 创作教室</span>
        </Link>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link href="/courses">课程</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link href="/gallery">作品</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link href="/create">AI 生图</Link>
          </Button>

          {user ? (
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link href="/profile">
                <Avatar className="h-5 w-5 mr-1.5 bg-primary/80">
                  <AvatarFallback className="text-[10px] text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                我的
              </Link>
            </Button>
          ) : (
            <Button size="sm" className="ml-2" asChild>
              <Link href="/auth">登录</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
