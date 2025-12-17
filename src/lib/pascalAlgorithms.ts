// Iterative approach - O(n²) time complexity
export const calculatePascalIterative = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;

  // Build triangle row by row
  const triangle: number[][] = [];
  
  for (let i = 0; i <= n; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }
  
  return triangle[n][k];
};

// Recursive approach - O(2^n) time complexity (exponential)
export const calculatePascalRecursive = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  return calculatePascalRecursive(n - 1, k - 1) + calculatePascalRecursive(n - 1, k);
};

// Generate full triangle iteratively
export const generateTriangleIterative = (rows: number): number[][] => {
  const triangle: number[][] = [];
  
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) {
        triangle[i][j] = 1;
      } else {
        triangle[i][j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
      }
    }
  }
  
  return triangle;
};

// Generate full triangle recursively
export const generateTriangleRecursive = (rows: number): number[][] => {
  const triangle: number[][] = [];
  
  for (let i = 0; i < rows; i++) {
    triangle[i] = [];
    for (let j = 0; j <= i; j++) {
      triangle[i][j] = calculatePascalRecursive(i, j);
    }
  }
  
  return triangle;
};

// Measure execution time
export const measureExecutionTime = (
  algorithm: "iterative" | "recursive",
  rows: number
): { time: number; result: number[][] } => {
  const startTime = performance.now();
  
  let result: number[][];
  if (algorithm === "iterative") {
    result = generateTriangleIterative(rows);
  } else {
    result = generateTriangleRecursive(rows);
  }
  
  const endTime = performance.now();
  const time = endTime - startTime;
  
  return { time, result };
};

// Run benchmark for multiple sizes
export interface BenchmarkResult {
  size: number;
  iterativeTime: number;
  recursiveTime: number;
  timestamp: Date;
}

export const runBenchmark = (sizes: number[]): BenchmarkResult[] => {
  const results: BenchmarkResult[] = [];
  
  for (const size of sizes) {
    const iterativeResult = measureExecutionTime("iterative", size);
    
    // Only run recursive for small sizes (it's exponential!)
    let recursiveTime = 0;
    if (size <= 20) {
      const recursiveResult = measureExecutionTime("recursive", size);
      recursiveTime = recursiveResult.time;
    } else {
      // Estimate based on exponential growth
      recursiveTime = Math.pow(2, size) / 1000000; // Rough estimate in ms
    }
    
    results.push({
      size,
      iterativeTime: iterativeResult.time,
      recursiveTime,
      timestamp: new Date(),
    });
  }
  
  return results;
};

// Calculate complexity class
export const getComplexityClass = (algorithm: "iterative" | "recursive"): string => {
  if (algorithm === "iterative") {
    return "Θ(n²)";
  }
  return "O(2ⁿ)";
};
