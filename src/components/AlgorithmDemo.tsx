import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  measureExecutionTime,
  getComplexityClass,
} from "@/lib/pascalAlgorithms";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Play, RotateCcw, Clock, Layers } from "lucide-react";

interface TestResult {
  id: string;
  size: number;
  iterativeTime: number;
  recursiveTime: number | null;
  timestamp: Date;
}

interface AlgorithmDemoProps {
  onHistoryUpdate?: (history: TestResult[]) => void;
}

export const AlgorithmDemo = ({ onHistoryUpdate }: AlgorithmDemoProps) => {
  const [inputSize, setInputSize] = useState<number>(10);
  const [isRunning, setIsRunning] = useState(false);
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  const [history, setHistory] = useState<TestResult[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Update chart data when history changes
    const data = history.map((result) => ({
      size: result.size,
      iterative: Number(result.iterativeTime.toFixed(4)),
      recursive: result.recursiveTime !== null ? Number(result.recursiveTime.toFixed(4)) : null,
    }));
    setChartData(data);
    onHistoryUpdate?.(history);
  }, [history, onHistoryUpdate]);

  const runTest = async () => {
    if (inputSize < 1 || inputSize > 30) {
      return;
    }

    setIsRunning(true);

    // Small delay for UI feedback
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Run iterative
    const iterativeResult = measureExecutionTime("iterative", inputSize);

    // Run recursive only for small inputs
    let recursiveTime: number | null = null;
    if (inputSize <= 20) {
      const recursiveResult = measureExecutionTime("recursive", inputSize);
      recursiveTime = recursiveResult.time;
    }

    const newResult: TestResult = {
      id: Date.now().toString(),
      size: inputSize,
      iterativeTime: iterativeResult.time,
      recursiveTime,
      timestamp: new Date(),
    };

    setCurrentResult(newResult);
    setHistory((prev) => [...prev, newResult]);
    setIsRunning(false);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentResult(null);
    setChartData([]);
  };

  const runBatchTest = async () => {
    setIsRunning(true);
    const sizes = [5, 10, 15, 20, 25];
    
    for (const size of sizes) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      
      const iterativeResult = measureExecutionTime("iterative", size);
      let recursiveTime: number | null = null;
      
      if (size <= 20) {
        const recursiveResult = measureExecutionTime("recursive", size);
        recursiveTime = recursiveResult.time;
      }

      const newResult: TestResult = {
        id: Date.now().toString() + size,
        size,
        iterativeTime: iterativeResult.time,
        recursiveTime,
        timestamp: new Date(),
      };

      setHistory((prev) => [...prev, newResult]);
    }
    
    setIsRunning(false);
  };

  return (
    <div className="space-y-8">
      {/* Input Controls */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Pengujian Algoritma
        </h3>
        
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="inputSize">Jumlah Baris (n)</Label>
            <Input
              id="inputSize"
              type="number"
              min={1}
              max={30}
              value={inputSize}
              onChange={(e) => setInputSize(Number(e.target.value))}
              className="w-32"
            />
          </div>
          
          <Button
            onClick={runTest}
            disabled={isRunning}
            variant="hero"
          >
            <Play className="w-4 h-4" />
            {isRunning ? "Menjalankan..." : "Jalankan Test"}
          </Button>
          
          <Button
            onClick={runBatchTest}
            disabled={isRunning}
            variant="outline"
          >
            Batch Test (5-25)
          </Button>
          
          <Button
            onClick={clearHistory}
            variant="ghost"
            className="text-muted-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>

        {inputSize > 20 && (
          <p className="text-sm text-muted-foreground mt-3">
            ⚠️ Untuk n &gt; 20, algoritma rekursif terlalu lambat dan tidak akan dijalankan.
          </p>
        )}
      </div>

      {/* Current Result */}
      {currentResult && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Iterative Result */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-primary">
            <h4 className="font-bold text-lg mb-3 text-primary">Algoritma Iteratif</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Waktu Eksekusi:</span>
                <span className="font-mono font-semibold">
                  {currentResult.iterativeTime.toFixed(4)} ms
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kompleksitas:</span>
                <span className="font-mono font-semibold text-primary">
                  {getComplexityClass("iterative")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Input Size:</span>
                <span className="font-mono">{currentResult.size} baris</span>
              </div>
            </div>
          </div>

          {/* Recursive Result */}
          <div className="glass-card rounded-2xl p-6 border-l-4 border-l-accent">
            <h4 className="font-bold text-lg mb-3 text-accent">Algoritma Rekursif</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Waktu Eksekusi:</span>
                <span className="font-mono font-semibold">
                  {currentResult.recursiveTime !== null
                    ? `${currentResult.recursiveTime.toFixed(4)} ms`
                    : "Tidak dijalankan (n > 20)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kompleksitas:</span>
                <span className="font-mono font-semibold text-accent">
                  {getComplexityClass("recursive")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Input Size:</span>
                <span className="font-mono">{currentResult.size} baris</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Grafik Perbandingan Waktu Eksekusi
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="size" 
                  label={{ value: "Ukuran Input (n)", position: "bottom", offset: -5 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis 
                  label={{ value: "Waktu (ms)", angle: -90, position: "insideLeft" }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="iterative"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  name="Iteratif Θ(n²)"
                />
                <Line
                  type="monotone"
                  dataKey="recursive"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--accent))", strokeWidth: 2 }}
                  name="Rekursif O(2ⁿ)"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* History Table */}
      {history.length > 0 && (
        <div className="glass-card rounded-2xl p-6 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4">Riwayat Pengujian</h3>
          
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">No</th>
                <th className="text-left py-3 px-4 font-semibold">Ukuran (n)</th>
                <th className="text-left py-3 px-4 font-semibold">Iteratif (ms)</th>
                <th className="text-left py-3 px-4 font-semibold">Rekursif (ms)</th>
                <th className="text-left py-3 px-4 font-semibold">Rasio</th>
              </tr>
            </thead>
            <tbody>
              {history.map((result, index) => (
                <tr key={result.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-mono">{result.size}</td>
                  <td className="py-3 px-4 font-mono text-primary">{result.iterativeTime.toFixed(4)}</td>
                  <td className="py-3 px-4 font-mono text-accent">
                    {result.recursiveTime !== null ? result.recursiveTime.toFixed(4) : "-"}
                  </td>
                  <td className="py-3 px-4 font-mono">
                    {result.recursiveTime !== null && result.iterativeTime > 0
                      ? `${(result.recursiveTime / result.iterativeTime).toFixed(2)}x`
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
