import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RolagemSuave from "@/components/fx/RolagemSuave";
import BarraProgresso from "@/components/fx/BarraProgresso";
import Cursor from "@/components/fx/Cursor";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RolagemSuave />
      <BarraProgresso />
      <Cursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
