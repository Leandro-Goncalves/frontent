import { FacebookIcon, Instagram } from "lucide-react";

interface SocialMediaProps {
  className?: string;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ className }) => {
  const handleOpen = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className={className}>
      <p className="font-bold text-lg text-primary">Siga a cacau</p>
      <div className="flex gap-2 mt-4 mb-2">
        <button
          onClick={() => handleOpen("https://www.instagram.com/caacaustore/")}
          className="text-sm font-bold text-foreground flex items-center py-3 px-3 border border-primary rounded-lg"
        >
          <Instagram className="w-5 h-5 text-primary" />
        </button>
        <button
          onClick={() =>
            handleOpen(
              "https://www.facebook.com/people/Cacau-Store/100092337534974/"
            )
          }
          className="text-sm font-bold text-foreground flex items-center py-3 px-3 border border-primary rounded-lg"
        >
          <FacebookIcon className="w-5 h-5 text-primary" />
        </button>
      </div>
      <p className="max-w-[252px] text-sm">@caacaustore</p>
    </div>
  );
};
