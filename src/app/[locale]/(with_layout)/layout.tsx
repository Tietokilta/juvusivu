import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-dvh grid-cols-1 grid-rows-[auto_1fr_auto]">
      <Navbar variant="m0" />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
