"use client";

import Image from "next/image";
import { NavigationColumn } from "./components/NavigationColumn";
import { MessageCircleHeart } from "@/app/assets/MessageCircleHeart";
import { FacebookIcon, Instagram } from "lucide-react";
import { sendWhatsappMessage } from "@/app/utils/misc/sendWhatsappMessage";
import { Separator } from "@/components/ui/separator";

interface FooterProps {
  phone: string;
}

export const Footer: React.FC<FooterProps> = ({ phone }) => {
  const handleOpen = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <Separator />
      <footer className="py-4 px-16 flex flex-col">
        <Image
          src={"/logo.png"}
          alt="Logo escrita Cacau"
          width={195}
          height={106}
          className="mx-auto w-[149px]"
        />
        <Separator className="my-4 h-[1px] bg-[#FFAEC5]" />
        <div className="my-8 flex">
          <NavigationColumn
            title="Navegação"
            itens={[
              {
                name: "Inicio",
                link: "tab-catalog",
                type: "internal",
              },
              {
                name: "Conheça nossa história",
                link: "tab-cacauStore",
                type: "internal",
              },
              {
                name: "Conheça nossos modelos",
                link: "tab-info",
                type: "internal",
              },
              {
                name: "Nossa loja - localização",
                link: "tab-cacauStore",
                scrollId: "ourStore",
                type: "internal",
              },
            ]}
          />
          <NavigationColumn
            className="ml-20"
            title="Precisa de ajuda?"
            itens={[
              {
                name: "Dúvidas frequentes",
                link: "tab-info",
                scrollId: "doubts",
                type: "internal",
              },
              {
                name: "Politica de trocas e devolução",
                link: "https://www.google.com/",
                type: "external",
              },
              {
                name: "Politica de privacidade",
                link: "https://www.google.com/",
                type: "external",
              },
            ]}
          />
          <div className="ml-auto">
            <p className="font-bold text-lg text-primary">Atendimento</p>
            <button
              onClick={() => {
                sendWhatsappMessage(phone, "Olá, gostaria de mais informações");
              }}
              className="my-1 text-sm font-bold text-[#4c4c4c] flex gap-2 items-center py-3 px-5 border border-primary rounded-full"
            >
              <MessageCircleHeart className="w-6 h-6" color="#DC024F" /> Nosso
              WhatsApp
            </button>
            <p className="max-w-[252px] text-sm">
              Segunda a sexta das 9h as 18h, exceto feriados (horário de
              Brasilia)
            </p>
          </div>
          <div className="ml-20">
            <p className="font-bold text-lg text-primary">Siga a cacau</p>
            <div className="flex gap-2 mt-4 mb-2">
              <button
                onClick={() =>
                  handleOpen("https://www.instagram.com/caacaustore/")
                }
                className="text-sm font-bold text-[#4c4c4c] flex items-center py-3 px-3 border border-primary rounded-lg"
              >
                <Instagram className="w-5 h-5" color="#DC024F" />
              </button>
              <button
                onClick={() => handleOpen("")}
                className="text-sm font-bold text-[#4c4c4c] flex items-center py-3 px-3 border border-primary rounded-lg"
              >
                <FacebookIcon className="w-5 h-5" color="#DC024F" />
              </button>
            </div>
            <p className="max-w-[252px] text-sm">@caacaustore</p>
          </div>
        </div>
      </footer>
    </>
  );
};
