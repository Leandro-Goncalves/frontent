import env from "@/app/env";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

interface OurStoryProps {
  image: string;
  text: string;
}

export const OurStory: React.FC<OurStoryProps> = ({ image, text }) => {
  return (
    <div className="mt-10 flex gap-7 align-top items-start max-[1300px]:flex-col max-[1300px]:items-center max-[1300px]:text-center">
      <Image
        alt="imagem Carol e do Felipe"
        src={`${env.CDN_URL}/${image}`}
        width={551}
        height={650}
        className="w-[650px] flex-shrink-0"
      />
      <p
        className="text-lg font-normal"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(text.replace(/\n/g, "<br />")),
        }}
      ></p>
    </div>
  );
};
