"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Copy, Lightbulb, Wand2, Package, ChevronLeft, ChevronRight, Upload } from "lucide-react";

type Lesson = {
  id: string; title: string; coreThinking: string; workflowType: string;
  promptTemplate: string; contentJson: string; courseId: string; sortOrder: number;
  course: { id: string; title: string; category: string };
  skillCard: { name: string; rarity: string; description: string } | null;
};

type CourseLesson = { id: string; title: string; sortOrder: number };

interface Content {
  phase1: { title: string; steps: { title: string; child: string; teacher: string }[] };
  phase2: { title: string; options: { name: string; input: string; output: string }[]; keyMoment: string };
  phase3: { title: string; steps: string[] };
}

export function LearnContent({ lesson, courseLessons }: { lesson: Lesson; courseLessons: CourseLesson[] }) {
  const content: Content = JSON.parse(lesson.contentJson);
  const [completed, setCompleted] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const currentIndex = courseLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  const handleComplete = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }
    await fetch("/api/lessons/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: lesson.id, userId: user.id }),
    });
    setCompleted(true);
    router.refresh();
  }, [lesson.id, supabase, router]);

  const copyPrompt = () => {
    navigator.clipboard.writeText(lesson.promptTemplate || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-1">{lesson.course?.title}</p>
        <h1 className="text-2xl font-bold mb-2">第 {lesson.sortOrder} 节 · {lesson.title}</h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="gap-1"><Lightbulb className="h-3 w-3" />{lesson.coreThinking}</Badge>
          {lesson.skillCard && (
            <Badge variant="secondary">{lesson.skillCard.rarity === "LEGENDARY" ? "传说" : lesson.skillCard.rarity === "EPIC" ? "史诗" : "稀有"}卡牌 · {lesson.skillCard.name}</Badge>
          )}
        </div>
      </div>

      {/* Lesson Navigation */}
      <div className="flex items-center justify-between mb-8">
        {prevLesson ? (
          <Button variant="ghost" size="sm" onClick={() => router.push(`/courses/${lesson.courseId}/learn?lesson=${prevLesson.id}`)}>
            <ChevronLeft className="h-4 w-4 mr-1" />{prevLesson.title}
          </Button>
        ) : <div />}
        <span className="text-sm text-muted-foreground">{currentIndex + 1} / {courseLessons.length}</span>
        {nextLesson ? (
          <Button variant="ghost" size="sm" onClick={() => router.push(`/courses/${lesson.courseId}/learn?lesson=${nextLesson.id}`)}>
            {nextLesson.title}<ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : <div />}
      </div>

      {/* Three Phases */}
      <Tabs defaultValue="phase1" className="mb-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phase1" className="gap-1"><Lightbulb className="h-4 w-4" />灵感</TabsTrigger>
          <TabsTrigger value="phase2" className="gap-1"><Wand2 className="h-4 w-4" />共创</TabsTrigger>
          <TabsTrigger value="phase3" className="gap-1"><Package className="h-4 w-4" />输出</TabsTrigger>
        </TabsList>

        <TabsContent value="phase1">
          <Card>
            <CardHeader><CardTitle>{content.phase1.title}阶段（AI 零介入）</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {content.phase1.steps.map((step, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <h4 className="font-medium mb-2">步骤 {i + 1}：{step.title}</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-primary/5 p-3">
                      <p className="font-medium text-primary mb-1">孩子做什么</p>
                      <p className="text-muted-foreground">{step.child}</p>
                    </div>
                    <div className="rounded bg-accent/10 p-3">
                      <p className="font-medium text-accent-foreground mb-1">老师做什么</p>
                      <p className="text-muted-foreground">{step.teacher}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase2">
          <Card>
            <CardHeader><CardTitle>{content.phase2.title}阶段（AI 出选项，孩子决策）</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {content.phase2.options.map((opt, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <h4 className="font-medium mb-2">{opt.name}</h4>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="rounded bg-muted p-3">
                      <p className="font-medium mb-1">孩子输入</p>
                      <p className="text-muted-foreground">{opt.input}</p>
                    </div>
                    <div className="rounded bg-muted p-3">
                      <p className="font-medium mb-1">AI 产出</p>
                      <p className="text-muted-foreground">{opt.output}</p>
                    </div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                <p className="font-medium text-primary mb-1">关键教学时刻</p>
                <p className="text-sm text-muted-foreground">{content.phase2.keyMoment}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase3">
          <Card>
            <CardHeader><CardTitle>{content.phase3.title}阶段</CardTitle></CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {content.phase3.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">{i + 1}</span>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Prompt Template */}
      {lesson.promptTemplate && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Wand2 className="h-4 w-4" />AI Prompt 模板</CardTitle>
            <CardDescription>复制后替换 `{ }` 内的内容，喂给 AI 生图工具</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2">
              <code className="flex-1 rounded bg-muted p-3 text-sm break-all">{lesson.promptTemplate}</code>
              <Button variant="outline" size="icon" onClick={copyPrompt}>
                {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Button */}
      <div className="text-center">
        {completed ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">已完成本节！+30 EXP</span>
          </div>
        ) : (
          <Button size="lg" onClick={handleComplete} className="gap-2">
            <CheckCircle className="h-5 w-5" />标记完成
          </Button>
        )}
      </div>
    </div>
  );
}
