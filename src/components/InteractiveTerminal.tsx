"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ChevronRight, Play } from "lucide-react";
import { PERSONAL_INFO, METRICS, TECHNICAL_SKILLS } from "../constants";

type LogEntry = {
  type: "input" | "output" | "error";
  text: string;
};

const SUGGESTIONS = ["help", "about", "metrics", "skills", "experience"];

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: "output", text: "Initializing Android adb development terminal..." },
    { type: "output", text: "Connected to device: abdelrahman-nasr-phone [Android 14, SDK 34]" },
    { type: "output", text: "Type 'help' or click any button below to query credentials." },
  ]);
  
  const terminalScreenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalScreenRef.current) {
      terminalScreenRef.current.scrollTop = terminalScreenRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (commandText: string) => {
    const cmd = commandText.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...logs, { type: "input" as const, text: `adb shell ${commandText}` }];

    switch (cmd) {
      case "help":
        newLogs.push({
          type: "output",
          text: `Available commands:\n  help        - List all commands\n  about       - Professional summary\n  metrics     - Extract system credibility metrics\n  skills      - List programming languages & tools\n  experience  - Show latest career positions\n  clear       - Clear screen logs`,
        });
        break;
      case "about":
        newLogs.push({
          type: "output",
          text: `${PERSONAL_INFO.name}\n${PERSONAL_INFO.title}\n\n${PERSONAL_INFO.summary}`,
        });
        break;
      case "metrics":
        const metricsStr = METRICS.map(
          (m) => `  [+] ${m.label}: ${m.value} (${m.description})`
        ).join("\n");
        newLogs.push({
          type: "output",
          text: `SYSTEM CREDIBILITY METRICS:\n${metricsStr}`,
        });
        break;
      case "skills":
        const skillsStr = TECHNICAL_SKILLS.map(
          (cat) => `  [${cat.category}]\n    ${cat.skills.join(", ")}`
        ).join("\n\n");
        newLogs.push({
          type: "output",
          text: `TECHNICAL STACK & COMPETENCY:\n${skillsStr}`,
        });
        break;
      case "experience":
        newLogs.push({
          type: "output",
          text: `WORK EXPERIENCE SUMMARY:\n  1. Almyaar (Sep 2025 - Present) - Android Team Lead (Taxi Alwatani & Student Way)\n  2. SAGA / Schoolie (Jun 2025 - Present) - Solo Android Developer (40+ White-Label schools)\n  3. Develop Network (Sep 2024 - May 2025) - Android Developer\n  4. Self-Employed (Feb 2020 - Present) - Rafiqy Solo Product Creator`,
        });
        break;
      case "clear":
        setLogs([]);
        setInput("");
        return;
      default:
        newLogs.push({
          type: "error",
          text: `adb: command not found: '${commandText}'. Type 'help' for available command queries.`,
        });
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-md border border-zinc-800 bg-zinc-950/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-xs leading-relaxed relative">
      {/* Corner engineering brackets */}
      <div className="absolute top-1 left-1.5 text-[8px] text-zinc-600 select-none font-mono">SYS_0x4F8</div>
      <div className="absolute top-1 right-1.5 text-[8px] text-zinc-600 select-none font-mono">VER_1.0.5</div>
      
      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-zinc-800/80 mt-3">
        <div className="flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-700"></span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 tracking-wider font-mono">
          <Terminal className="w-3 h-3 text-accent-android" />
          <span>ADB_SHELL // abdelrahman.nasr</span>
        </div>
        <div className="w-12"></div> {/* spacer */}
      </div>

      {/* Terminal Screen Logs */}
      <div 
        ref={terminalScreenRef}
        className="p-5 h-[280px] overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-800 select-text"
        onClick={() => inputRef.current?.focus()}
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${
              log.type === "input"
                ? "text-cyan-400 font-semibold"
                : log.type === "error"
                ? "text-red-400"
                : "text-gray-300"
            }`}
          >
            {log.type === "input" && (
              <span className="text-gray-500 mr-2">visitor@nasr-android-device:~$</span>
            )}
            {log.text}
          </div>
        ))}
      </div>

      {/* Interactive Command Input Form */}
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center px-5 py-3.5 bg-gray-950 border-t border-gray-800/60"
      >
        <ChevronRight className="w-4 h-4 text-cyan-400 mr-2" />
        <span className="text-gray-400 mr-2 select-none">adb shell</span>
        <input
          ref={inputRef}
          id="adb-input"
          name="adb-input"
          aria-label="ADB shell command input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command (e.g. help)..."
          className="flex-grow bg-transparent text-white focus:outline-none caret-cyan-400 placeholder-gray-600 font-mono text-sm"
        />
        <button
          type="submit"
          className="p-2.5 text-gray-400 hover:text-cyan-400 transition-colors flex items-center justify-center"
          aria-label="Run command"
        >
          <Play className="w-4 h-4" />
        </button>
      </form>

      {/* Suggestion Shortcuts */}
      <div className="px-5 py-3 bg-gray-900/40 border-t border-gray-800/40 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-gray-400 mr-2 select-none">Quick query:</span>
        {SUGGESTIONS.map((sug) => (
          <button
            key={sug}
            onClick={() => handleCommand(sug)}
            className="px-2.5 py-1.5 rounded text-xs font-mono bg-gray-850 hover:bg-emerald-500/10 hover:text-accent-android text-gray-400 border border-gray-800 hover:border-emerald-500/30 transition-all cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>
    </div>
  );
}
