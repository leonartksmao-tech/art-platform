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
    <nav className="sticky top-0 z-50 nav-glass">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-foreground shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-white font-extrabold text-xs">M</span>
          <span className="font-bold text-base tracking-tight hidden sm:inline">MAO ART STUDIO</span>
          <span className="font-bold text-base tracking-tight sm:hidden">MAO ART</span>
        </Link>

        <div className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="搜索课程..."
            className="search-minimal"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs" asChild>
            <Link href="/courses">课程</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs" asChild>
            <Link href="/gallery">作品</Link>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs" asChild>
            <Link href="/create">AI 生图</Link>
          </Button>

          {user ? (
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs" asChild>
              <Link href="/profile">
                <Avatar className="h-5 w-5 mr-1 bg-primary/80">
                  <AvatarFallback className="text-[10px] text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                我的
              </Link>
            </Button>
          ) : (
            <Button size="sm" className="ml-2 bg-primary hover:bg-[#d04a40] text-xs" asChild>
              <Link href="/auth">登录</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
