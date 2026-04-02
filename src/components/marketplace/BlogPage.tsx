'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/lib/store';
import { blogPosts } from '@/lib/data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export default function BlogPage() {
  const { viewBlog } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    const q = searchQuery.toLowerCase();
    return blogPosts.filter(
      post =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
          <BookOpen className="size-7 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Solar Energy Blog</h1>
        <p className="mt-2 text-muted-foreground">
          Expert guides, tips, and insights on solar energy
        </p>
      </div>

      {/* Search */}
      <div className="mx-auto mb-8 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-full pl-10 pr-4"
          />
        </div>
      </div>

      {/* Blog Grid */}
      {filteredPosts.length === 0 ? (
        <div className="py-16 text-center">
          <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground/30" />
          <h3 className="text-lg font-medium">No articles found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search term</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
              onClick={() => viewBlog(post.slug)}
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                  <BookOpen className="size-12 text-primary/30" />
                </div>
                <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground hover:bg-primary">
                  Article
                </Badge>
              </div>

              <CardContent className="p-5">
                {/* Date & Author */}
                <div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="size-3" />
                    {post.author}
                  </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
              </CardContent>

              <CardFooter className="border-t px-5 py-3">
                <Button
                  variant="ghost"
                  className="ml-auto gap-1 text-sm text-primary hover:text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewBlog(post.slug);
                  }}
                >
                  Read More <ArrowRight className="size-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
