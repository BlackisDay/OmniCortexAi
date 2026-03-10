import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { AIProvider } from "../context/AiContext";

const queryClient = new QueryClient();

interface Props {
  children: ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AIProvider>{children}</AIProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}