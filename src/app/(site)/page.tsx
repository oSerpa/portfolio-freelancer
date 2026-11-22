import Hero from "@/components/Hero";
import FaixaTecnologias from "@/components/FaixaTecnologias";
import Servicos from "@/components/Servicos";
import Modelos from "@/components/Modelos";
import Laboratorio from "@/components/Laboratorio";
import Processo from "@/components/Processo";
import Linguagens from "@/components/Linguagens";
import Contato from "@/components/Contato";

export default function Home() {
  return (
    <>
      <Hero />
      <FaixaTecnologias />
      <Servicos />
      <Modelos />
      <Laboratorio />
      <Processo />
      <Linguagens />
      <Contato />
    </>
  );
}
