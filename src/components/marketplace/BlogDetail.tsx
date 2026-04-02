'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { blogPosts, getBlogBySlug } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  Calendar,
  User,
  BookOpen,
  Clock,
} from 'lucide-react';

export default function BlogDetail() {
  const { selectedBlogSlug, viewBlog, navigate } = useAppStore();

  const currentPost = useMemo(
    () => (selectedBlogSlug ? getBlogBySlug(selectedBlogSlug) : undefined),
    [selectedBlogSlug]
  );

  const otherPosts = useMemo(
    () => blogPosts.filter(p => p.slug !== selectedBlogSlug),
    [selectedBlogSlug]
  );

  if (!currentPost) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground/30" />
        <h2 className="text-xl font-semibold">Article Not Found</h2>
        <p className="mt-1 text-muted-foreground">The article you are looking for does not exist.</p>
        <Button className="mt-4" onClick={() => navigate('blog')}>
          <ArrowLeft className="mr-2 size-4" /> Back to Blog
        </Button>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const readTime = Math.ceil(currentPost.content.split('</p>').length * 1.5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={() => navigate('blog')}
      >
        <ArrowLeft className="size-4" /> Back to Blog
      </Button>

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <button
          onClick={() => navigate('home')}
          className="transition-colors hover:text-foreground"
        >
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate('blog')}
          className="transition-colors hover:text-foreground"
        >
          Blog
        </button>
        <span>/</span>
        <span className="truncate text-foreground">{currentPost.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <article className="lg:col-span-2">
          {/* Featured Image */}
          <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="flex aspect-[16/9] items-center justify-center">
              <BookOpen className="size-20 text-primary/20" />
            </div>
          </div>

          {/* Title & Meta */}
          <div className="mb-6">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/10">
              Solar Energy
            </Badge>
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl">
              {currentPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {currentPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {formatDate(currentPost.createdAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {readTime} min read
              </span>
            </div>
          </div>

          <Separator className="mb-8" />

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-muted-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: currentPost.content }}
          />
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:col-span-1">
          {/* Other Posts */}
          <Card>
            <CardContent className="p-5">
              <h3 className="mb-4 font-semibold">More Articles</h3>
              <div className="space-y-4">
                {otherPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => viewBlog(post.slug)}
                    className="group flex gap-3 text-left w-full"
                  >
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="size-5 text-muted-foreground/50" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA Card */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="size-6 text-primary" />
              </div>
              <h3 className="mb-1 font-semibold">Need Expert Advice?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Talk to our solar energy specialists for personalized recommendations.
              </p>
              <Button
                className="w-full"
                onClick={() => navigate('consultation')}
              >
                Get Consultation
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
