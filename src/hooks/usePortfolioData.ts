import { useQuery } from "@tanstack/react-query";

export interface PortfolioData {
  experiences: any[];
  education: any[];
  projects: any[];
  skills: any[];
  settings: Record<string, string>;
}

export function usePortfolioData() {
  return useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const response = await fetch("/api/portfolio");
      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
