import { Informative } from "./components/Informative";

interface ContentWrapperProps {
  children?: React.ReactNode;
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <div className="mx-[70px] my-[40px] border-[#FFAEC5] border-2 rounded-[46px] max-[820px]:mx-4 max-md:my-4 overflow-hidden">
      <Informative />
      <div className="px-12 py-20 max-[1000px]:p-4">{children}</div>
    </div>
  );
};
