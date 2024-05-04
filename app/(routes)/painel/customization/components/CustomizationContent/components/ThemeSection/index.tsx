import { cn } from "@/lib/utils";
import { Section } from "../Section";

const theme = {
  "3ce01499-9159-42bc-a31f-3cbba37b24f1": {
    primary: "#DC024F",
    secondary: "#FBDCDC",
  },
  "2cd02c4e-5c77-4096-8ded-197e474368aa": {
    primary: "#020817",
    secondary: "#E5E5E5",
  },
};

interface ThemeSectionProps {
  themeGuid: string;
  setThemeGuid: (themeGuid: string) => void;
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  themeGuid,
  setThemeGuid,
}) => {
  return (
    <Section
      title="Temas"
      description="Utilize as cores da sua identidade visual ou nova campanha."
    >
      <div className="flex gap-2">
        {Object.entries(theme).map(([key, value]) => {
          const isSelected = key === themeGuid;
          return (
            <button
              onClick={() => setThemeGuid(key)}
              key={key}
              className={cn(
                "rounded-full overflow-hidden border-[6px] border-transparent -rotate-[30deg]",
                {
                  "border-gray-800": isSelected,
                }
              )}
            >
              <div
                className="w-10 h-5"
                style={{ backgroundColor: value.primary }}
              />
              <div
                className="w-10 h-5"
                style={{ backgroundColor: value.secondary }}
              />
            </button>
          );
        })}
      </div>
    </Section>
  );
};
