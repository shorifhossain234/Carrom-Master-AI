import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrom Master AI",
  description: "Professional Carrom analysis and training interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
