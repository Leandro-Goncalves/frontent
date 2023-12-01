interface TagProps {
  children: React.ReactNode;
}

export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <div className="text-xs font-bold p-2 bg-[#1B123D] text-white rounded-full">
      {children}
    </div>
  );
};
