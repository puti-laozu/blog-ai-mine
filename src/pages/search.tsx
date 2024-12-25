import { useState } from 'react';
import Head from 'next/head';
import { Post } from '../types/post';
import PostCard from '../components/posts/PostCard';
import SearchBar from '../components/search/SearchBar';

export default function SearchPage() {
  const [results, setResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <Head>
        <title>搜索 - 我的博客</title>
      </Head>

      <div className="space-y-8">
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        
        <div className="grid gap-6">
          {results.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {results.length === 0 && !isSearching && (
            <p className="text-gray-500 text-center">输入关键词开始搜索</p>
          )}
        </div>
      </div>
    </>
  );
} 