import { Newsreader, Inter_Tight, JetBrains_Mono } from "next/font/google";
import DashboardNav from "@/components/dashboard/DashboardNav";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter-tight",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  title: "scrolly.to — Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-scope="dashboard"
      className={`${newsreader.variable} ${interTight.variable} ${jetbrainsMono.variable} font-body min-h-screen bg-bg`}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('dashboard-theme');if(t)document.querySelector('[data-scope="dashboard"]')?.setAttribute('data-theme',t);else if(window.matchMedia('(prefers-color-scheme:dark)').matches)document.querySelector('[data-scope="dashboard"]')?.setAttribute('data-theme','dark')}catch(e){}})()`,
        }}
      />
      <DashboardNav />
      <main>{children}</main>
    </div>
  );
}
