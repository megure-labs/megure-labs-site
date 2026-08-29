import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://megure.ai"),
  title: {
    default: "Megure Labs | Execution and orchestration for AI4Science",
    template: "%s | Megure Labs",
  },
  description:
    "Megure Labs builds Hataya for trusted native model execution and Kaname for controlled agent orchestration across machines.",
  openGraph: {
    title: "Megure Labs | Execution and orchestration for AI4Science",
    description:
      "Make science learnable. Make it production fast. Orchestrate every machine. Prove the result.",
    type: "website",
    url: "https://megure.ai",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F6F1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/brand/megure-mark.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
