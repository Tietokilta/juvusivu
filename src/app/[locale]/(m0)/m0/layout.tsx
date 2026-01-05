import Footer from "@components/Footer";
import Navbar from "@components/Navbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar variant="m0" />
      {children}
      <Footer />
    </>
  );
}
