import { useState, useEffect, useCallback } from "react";

interface PascalTriangleVisualizerProps {
  rows?: number;
  animated?: boolean;
  onComplete?: () => void;
}

export const PascalTriangleVisualizer = ({
  rows = 10,
  animated = true,
  onComplete,
}: PascalTriangleVisualizerProps) => {
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(new Set());
  const [triangle, setTriangle] = useState<number[][]>([]);

  // Generate Pascal's Triangle
  const generateTriangle = useCallback((n: number): number[][] => {
    const result: number[][] = [];
    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      for (let j = 0; j <= i; j++) {
        if (j === 0 || j === i) {
          row.push(1);
        } else {
          row.push(result[i - 1][j - 1] + result[i - 1][j]);
        }
      }
      result.push(row);
    }
    return result;
  }, []);

  useEffect(() => {
    setTriangle(generateTriangle(rows));
    setVisibleNodes(new Set());
  }, [rows, generateTriangle]);

  useEffect(() => {
    if (!animated || triangle.length === 0) {
      // Show all at once
      const allNodes = new Set<string>();
      triangle.forEach((row, i) => {
        row.forEach((_, j) => {
          allNodes.add(`${i}-${j}`);
        });
      });
      setVisibleNodes(allNodes);
      return;
    }

    // Animate nodes appearing
    let nodeIndex = 0;
    const allPositions: string[] = [];
    triangle.forEach((row, i) => {
      row.forEach((_, j) => {
        allPositions.push(`${i}-${j}`);
      });
    });

    const interval = setInterval(() => {
      if (nodeIndex < allPositions.length) {
        setVisibleNodes((prev) => {
          const newSet = new Set(prev);
          newSet.add(allPositions[nodeIndex]);
          return newSet;
        });
        nodeIndex++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, 80);

    return () => clearInterval(interval);
  }, [triangle, animated, onComplete]);

  const getNodeSize = (value: number): string => {
    const digits = String(value).length;
    if (digits <= 2) return "w-8 h-8 text-xs";
    if (digits <= 3) return "w-10 h-10 text-xs";
    if (digits <= 4) return "w-12 h-12 text-[10px]";
    return "w-14 h-14 text-[9px]";
  };

  const shouldBeFilled = (row: number, col: number, value: number): boolean => {
    // Create interesting pattern - fill nodes that are not powers of 2 related
    return value % 2 === 0;
  };

  return (
    <div className="flex flex-col items-start gap-1 p-4 overflow-x-auto">
      {triangle.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((value, colIndex) => {
            const nodeKey = `${rowIndex}-${colIndex}`;
            const isVisible = visibleNodes.has(nodeKey);
            const isFilled = shouldBeFilled(rowIndex, colIndex, value);

            return (
              <div
                key={nodeKey}
                className={`
                  pascal-node ${getNodeSize(value)}
                  ${isFilled ? "pascal-node-filled" : "pascal-node-empty"}
                  ${isVisible ? "node-appear" : "opacity-0 scale-0"}
                `}
                style={{
                  animationDelay: animated ? `${(rowIndex * 10 + colIndex) * 20}ms` : "0ms",
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
