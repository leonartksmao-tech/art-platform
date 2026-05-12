"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";

type Comment = {
  id: string; content: string; createdAt: string;
  profile: { nickname: string | null; avatarUrl: string | null } | null;
  replies: {
    id: string; content: string; createdAt: string;
    profile: { nickname: string | null; avatarUrl: string | null } | null;
  }[];
};

export function CommentSection({ workId, initialComments }: { workId: string; initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handlePost = async () => {
    if (!content.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }
    setLoading(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workId, userId: user.id, content }),
    });
    const newComment = await res.json();
    setComments([newComment, ...comments]);
    setContent("");
    setLoading(false);
  };

  const handleReply = async (parentId: string) => {
    if (!replyContent.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth"); return; }
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workId, userId: user.id, content: replyContent, parentId }),
    });
    const newReply = await res.json();
    setComments(comments.map((c) => c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c));
    setReplyingTo(null);
    setReplyContent("");
  };

  return (
    <div className="space-y-6">
      {/* Post comment */}
      <div className="space-y-3">
        <Textarea placeholder="写下你的评论..." value={content} onChange={(e) => setContent(e.target.value)} rows={3} />
        <Button onClick={handlePost} disabled={loading || !content.trim()} size="sm">
          {loading ? "发送中..." : "发表评论"}
        </Button>
      </div>

      {/* Comment list */}
      {comments.map((comment) => (
        <div key={comment.id} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{comment.profile?.nickname?.charAt(0) ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{comment.profile?.nickname ?? "匿名"}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
              <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="text-xs text-muted-foreground hover:text-primary mt-1">
                回复
              </button>
            </div>
          </div>

          {/* Replies */}
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex items-start gap-3 ml-10">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">{reply.profile?.nickname?.charAt(0) ?? "?"}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{reply.profile?.nickname ?? "匿名"}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(reply.createdAt)}</span>
                </div>
                <p className="text-sm mt-1">{reply.content}</p>
              </div>
            </div>
          ))}

          {/* Reply form */}
          {replyingTo === comment.id && (
            <div className="ml-10 space-y-2">
              <Textarea placeholder="写下回复..." value={replyContent} onChange={(e) => setReplyContent(e.target.value)} rows={2} />
              <div className="flex gap-2">
                <Button onClick={() => handleReply(comment.id)} size="sm">回复</Button>
                <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>取消</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
