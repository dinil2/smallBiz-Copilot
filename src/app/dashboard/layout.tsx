import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Dashboard & Financial Analytics",
  description: "Real-time revenue, expense, profit margin, and AI business analyst recommendations for your shop.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
