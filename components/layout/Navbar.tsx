"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

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
    <nav className="sticky top-0 z-50 nav-pro">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-extrabold text-sm">猫</span>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">猫猫老师 AI 创作教室</span>
          <span className="font-bold text-lg tracking-tight sm:hidden">AI 创作教室</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/courses">
            <span className="btn-pro btn-pro-ghost px-3 py-1.5 text-sm">课程</span>
          </Link>
          <Link href="/gallery">
            <span className="btn-pro btn-pro-ghost px-3 py-1.5 text-sm">作品</span>
          </Link>
          <Link href="/create">
            <span className="btn-pro btn-pro-ghost px-3 py-1.5 text-sm">AI 生图</span>
          </Link>

          {user ? (
            <Link href="/profile">
              <span className="btn-pro btn-pro-ghost px-3 py-1.5 text-sm">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/80 text-white text-xs font-bold mr-1.5">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
                我的
              </span>
            </Link>
          ) : (
            <Link href="/auth">
              <span className="btn-pro btn-pro-primary px-4 py-1.5 text-sm ml-2">登录</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
