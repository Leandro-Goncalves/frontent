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
        Eu me chamo Carolina, sou cristã, fundadora da Cacau Store, casada com o
        melhor amigo e sócio que eu poderia ter.
        <br />
        <br />
        A CACAU STORE nasceu em um dos momentos mais difíceis das nossas vidas.
        Após eu ser diagnosticada com síndrome de burnout e início de uma
        depressão, fui afastada do CLT para iniciar o tratamento de cura. Ainda
        em tratamento, decidida que eu não voltaria a ultrapassar meus limites,
        Deus floresceu a vontade de empreender dentro de mim. Abri mão das
        minhas certezas para viver algo novo, onde coloquei os pés e Deus tem
        colocado o chão. Através de uma realidade ruim, Deus me permitiu voltar
        a sonhar, e as oportunidades foram surgindo. ✨
        <br />
        <br />
        Nossa marca nasceu com a proposta de proporcionar um sono leve, com
        muito estilo e conforto para nossas Cacauzetes; a porquinha mais amada e
        querida ganhou um lugar no coração de várias pessoas, e graças a essas
        pessoas hoje somos mais de mil Cacauzetes por todo Brasil. 🐷💤
        <br />
        <br />
        Trabalhamos com diversos modelos e estampas exclusivas, e tudo isso
        remete a minha força e coragem de ressignificar tudo aquilo que um dia
        me machucou, mas sempre me firmando no Abba Pai que me fortaleceu na
        caminhada. 🙏💪
        <br />
        <br />É impossível falar da Cacau e não falar na minha história, pois a
        Cacau Store foi a maneira mais linda que o Senhor me deu para
        ressignificar um momento tão doloroso na minha vida. Hoje somos um time
        de Cacauzetes loucas por pijamas que cresce a cada dia. 🌟
      </p>
    </div>
  );
};
