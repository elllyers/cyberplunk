"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Loader2, Search, Zap, Database, Globe } from "lucide-react";

interface SearchResult {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  rank: number;
  date: string;
  favicon: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      {/* Data stream effects */}
      <div className="data-stream"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-destructive rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12 scanline">
          <div className="mb-6 relative">
            <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-4">
              <img
                src="/cyber-logo.png"
                alt="CYBER SEARCH"
                className="w-full h-full object-contain neon-text"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-primary neon-text mb-2 glitch">
                CYBER
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold text-accent neon-text glitch">
                SEARCH
              </h2>
            </div>
          </div>
          <p className="text-muted-foreground text-lg md:text-xl font-mono mb-4">
            [NEURAL INTERFACE ACTIVATED]
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge
              variant="outline"
              className="cyber-border text-primary animate-pulse"
            >
              <Zap className="w-3 h-3 mr-1" />
              ONLINE
            </Badge>
            <Badge
              variant="outline"
              className="cyber-border text-accent animate-pulse delay-1000"
            >
              <Database className="w-3 h-3 mr-1" />
              CONNECTED
            </Badge>
            <Badge
              variant="outline"
              className="cyber-border text-secondary animate-pulse delay-2000"
            >
              <Globe className="w-3 h-3 mr-1" />
              GLOBAL
            </Badge>
          </div>
        </header>

        {/* Search Interface */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="cyber-border bg-card/50 backdrop-blur-sm p-8 scanline">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                type="text"
                placeholder="ENTER SEARCH QUERY_"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-background/50 border-primary/50 text-foreground placeholder:text-muted-foreground font-mono text-lg cyber-border terminal-cursor"
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                className="bg-primary hover:bg-primary/80 text-primary-foreground font-mono font-bold cyber-border px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    SEARCHING...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    SEARCH
                  </>
                )}
              </Button>
            </div>

            {searched && (
              <div className="mt-4 text-center">
                <p className="text-muted-foreground font-mono text-sm">
                  {results.length > 0
                    ? `FOUND ${results.length} RESULTS`
                    : "NO RESULTS FOUND"}
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-4">
            <Separator className="bg-primary/20" />
            <h3 className="text-2xl font-bold text-primary neon-text font-mono mb-6">
              SEARCH RESULTS
            </h3>

            {results.map((result, index) => (
              <Card
                key={index}
                className="cyber-border bg-card/30 backdrop-blur-sm p-6 hover:bg-card/50 transition-all duration-300 scanline group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-primary neon-text font-mono group-hover:text-accent transition-colors">
                        {result.name}
                      </h4>
                      <p className="text-sm text-muted-foreground font-mono mb-2">
                        {result.url}
                      </p>
                      <p className="text-foreground font-mono leading-relaxed">
                        {result.snippet}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="ml-4 cyber-border text-secondary"
                    >
                      #{result.rank}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>{result.host_name}</span>
                    <span>{result.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
