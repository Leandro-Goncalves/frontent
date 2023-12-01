import Image from "next/image";

interface OurStoryProps {}

export const OurStory: React.FC<OurStoryProps> = () => {
  return (
    <div className="mt-10 flex gap-7 align-top items-start max-[1300px]:flex-col max-[1300px]:items-center max-[1300px]:text-center">
      <Image
        alt="imagem Carol e do Felipe"
        src={"/images/carolAndFelipe.png"}
        width={551}
        height={650}
        className="w-[650px] flex-shrink-0"
      />
      <p className="text-lg font-normal">
        Eu me chamo Carolina, tenho 26 anos, sou casada com o melhor amigo e
        sócio que eu poderia ter, sou cristã e empreendedora.
        <br />
        <br />A CACAU STORE nasceu em um dos momentos mais difíceis das nossas
        vidas. Após eu ser diagnosticada com síndrome de burnout e início de uma
        depressão, fui afastada do CLT para iniciar o tratamento de cura.Ainda
        em tratamento, decidida que eu não voltaria a ultrapassar meus limites,
        Deus floresceu a vontade de empreender dentro de mim. Abri mão das
        minhas certezas para viver algo novo, onde coloquei os pés e Deus tem
        colocado o chão. Através de uma realidade ruim, Deus me permitiu voltar
        a sonhar, e as oportunidades foram surgindo. 💖
        <br />
        <br /> Nossa pijamaria vem com a proposta de proporcionar um sono leve,
        com muito estilo e conforto.A logo transmite totalmente a minha
        personalidade, em cores e forma e toda a criação visual, foi feita por
        mim, que sem entender de nada, apenas criou. A porquinha mais amada e
        querida ganhou um lugar em meu coração, remete a minha força e coragem
        de ressignificar tudo aquilo que um dia me machucou.
        <br />
        <br /> Qualquer semelhança com a CACAU é pura coincidência, tá?
        Hahaha... 💞 E você, tem algo para começar a ressignificar? ✨️
      </p>
    </div>
  );
};
