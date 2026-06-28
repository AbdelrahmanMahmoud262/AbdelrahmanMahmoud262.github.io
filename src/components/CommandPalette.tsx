"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search as LucideSearch, Sparkles, Terminal, ArrowRight, CornerDownLeft, Info, HelpCircle } from "lucide-react";
import { Search } from "@/lib/search";
import { SearchResult } from "@/lib/search/types";
import { PaletteCommand } from "@/lib/command/types";
import { NavigationCommandProvider } from "@/lib/command/providers/navigation";
import { ActionCommandProvider } from "@/lib/command/providers/action";
import { Analytics } from "@/lib/analytics";
import { AnalyticsEvent } from "@/lib/analytics/events";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

type FilteredItem = 
  | { type: "command"; data: PaletteCommand }
  | { type: "search"; data: SearchResult };

const POPULAR_TOPICS = [
  "Jetpack Compose",
  "Clean Architecture",
  "Architecture Decisions",
  "Offline-First Data Sync",
  "Ktor",
  "Coroutines"
];

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [commands, setCommands] = useState<PaletteCommand[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize commands and hotkeys
  useEffect(() => {
    const navProvider = new NavigationCommandProvider(router);
    const actionProvider = new ActionCommandProvider((msg) => showToast(msg));
    setCommands([...navProvider.getCommands(), ...actionProvider.getCommands()]);
  }, [router]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
      setSearchResults([]);
      Analytics.track(AnalyticsEvent.SearchOpened);
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = getFilteredItems().length;
    if (totalItems === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % totalItems);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const itemsList = getFilteredItems();
      if (itemsList[selectedIndex]) {
        executeItem(itemsList[selectedIndex]);
      }
    }
  };

  // Perform search queries
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      const results = await Search.query(query);
      setSearchResults(results);
      
      Analytics.track(AnalyticsEvent.SearchQuery, { query, resultsCount: results.length });
      if (results.length === 0) {
        Analytics.track(AnalyticsEvent.SearchNoResults, { query });
      }
    };

    const timer = setTimeout(performSearch, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Get items matching input state
  const getFilteredItems = (): FilteredItem[] => {
    const filteredCommands = commands.filter(cmd =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    const commandList: FilteredItem[] = filteredCommands.map(cmd => ({
      type: "command",
      data: cmd
    }));

    const searchList: FilteredItem[] = searchResults.map(res => ({
      type: "search",
      data: res
    }));

    return [...commandList, ...searchList];
  };

  const executeItem = (item: FilteredItem) => {
    if (item.type === "command") {
      item.data.action();
      Analytics.track(AnalyticsEvent.SearchResultClicked, { id: item.data.id, type: "command" });
    } else {
      router.push(item.data.url);
      Analytics.track(AnalyticsEvent.SearchResultClicked, { url: item.data.url, type: item.data.type });
    }
    onClose();
  };

  if (!isOpen) return null;

  const itemsList = getFilteredItems();

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Main Panel */}
      <div 
        ref={dialogRef}
        className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col max-h-[70vh] font-sans animate-fadeIn relative"
        onKeyDown={handleKeyDown}
      >
        {/* Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 right-4 bg-zinc-900 border border-[#00e5ff]/30 text-white px-4 py-2 rounded shadow-lg text-xs font-mono flex items-center gap-2 z-50 animate-fadeIn select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-center px-4 border-b border-zinc-850">
          <LucideSearch className="w-5 h-5 text-zinc-500 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or query (e.g. Compose)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full py-4 bg-transparent text-white focus:outline-none placeholder-zinc-600 text-sm font-sans leading-none"
          />
          <span className="text-[10px] font-mono text-zinc-500 uppercase select-none tracking-widest bg-zinc-900 px-2 py-1 rounded border border-zinc-800 flex-shrink-0">
            ESC
          </span>
        </div>

        {/* Search Results / Command List */}
        <div className="flex-grow overflow-y-auto p-2 min-h-[250px] max-h-[400px] scrollbar-thin scrollbar-thumb-zinc-800">
          {itemsList.length > 0 ? (
            <div className="space-y-4">
              {/* Commands Section */}
              {itemsList.some(i => i.type === "command") && (
                <div>
                  <div className="px-3 py-2 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest select-none">
                    SYSTEM COMMANDS
                  </div>
                  <div className="space-y-0.5">
                    {itemsList.map((item, idx) => {
                      if (item.type !== "command") return null;
                      const cmd = item.data;
                      const isSelected = idx === selectedIndex;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => executeItem(item)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-left transition-all ${
                            isSelected 
                              ? "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20" 
                              : "text-zinc-300 hover:bg-zinc-900/40 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Terminal className={`w-4 h-4 ${isSelected ? "text-[#00e5ff]" : "text-zinc-500"}`} />
                            <span className="text-xs font-medium font-mono">{cmd.title}</span>
                          </div>
                          {cmd.shortcut && (
                            <span className="text-[9px] font-mono text-zinc-500 uppercase bg-zinc-900/50 px-1.5 py-0.5 rounded border border-zinc-850">
                              {cmd.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Content Section */}
              {itemsList.some(i => i.type === "search") && (
                <div>
                  <div className="px-3 py-2 text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest select-none">
                    KNOWLEDGE GRAPH SEARCH MATCHES
                  </div>
                  <div className="space-y-0.5">
                    {itemsList.map((item, idx) => {
                      if (item.type !== "search") return null;
                      const res = item.data;
                      const isSelected = idx === selectedIndex;
                      return (
                        <button
                          key={res.id}
                          onClick={() => executeItem(item)}
                          className={`w-full flex flex-col px-3 py-3 rounded text-left transition-all border ${
                            isSelected 
                              ? "bg-[#00e5ff]/10 text-white border-[#00e5ff]/20" 
                              : "text-zinc-300 hover:bg-zinc-900/40 border-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-mono font-bold text-[#00e5ff] uppercase px-1.5 py-0.5 rounded bg-[#00e5ff]/5 border border-[#00e5ff]/10">
                                {res.type}
                              </span>
                              <span className="text-xs font-bold leading-snug">{res.title}</span>
                            </div>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                              {res.category}
                            </span>
                          </div>
                          {res.excerpt && (
                            <p className="text-[11px] text-zinc-400 mt-1 line-clamp-1">
                              {res.excerpt}
                            </p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : query ? (
            // No Results State
            <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-500 font-mono gap-3 select-none">
              <Info className="w-8 h-8 text-zinc-700 animate-pulse" />
              <div className="space-y-1">
                <p className="text-xs font-bold">No Graph Entities Match &quot;{query}&quot;</p>
                <p className="text-[10px] text-zinc-650">Verify spelling or search architectural terms.</p>
              </div>
            </div>
          ) : (
            // Initial Suggestions State
            <div className="p-4 space-y-6">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest select-none">
                  <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
                  <span>Popular Search Topics</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1.5">
                  {POPULAR_TOPICS.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setQuery(topic)}
                      className="px-3 py-1.5 rounded text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-[#00e5ff]/30 transition-all font-mono"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-zinc-900 pt-5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest select-none">
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Keyboard Shortcuts</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] font-mono text-zinc-500">
                  <div className="flex justify-between items-center py-0.5 border-b border-zinc-900/60">
                    <span>Open Palette</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-850">⌘K or /</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-zinc-900/60">
                    <span>Navigation Commands</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-850">G then [H/A/B]</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-zinc-900/60">
                    <span>Move Highlight</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-850">▲ / ▼</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-zinc-900/60">
                    <span>Confirm Action</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-850">ENTER</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/40 border-t border-zinc-850 text-[10px] font-mono text-zinc-500 select-none">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Select
            </span>
            <span className="flex items-center gap-1">
              <ArrowRight className="w-3 h-3" /> Navigate
            </span>
          </div>
          <span>ADB Shell Search 1.0</span>
        </div>
      </div>
    </div>
  );
}
