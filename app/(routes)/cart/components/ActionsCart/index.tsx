"use client";
import { RemoveButton } from "./components/RemoveButton";

interface ActionsCartProps {
  handleRemove: () => void;
}

export const ActionsCart: React.FC<ActionsCartProps> = ({ handleRemove }) => {
  return (
    <div className="flex flex-col items-start">
      <p className="mb-2 text-sm font-extrabold">Ações:</p>
      <div className="flex gap-7 justify-center w-full">
        <RemoveButton handleRemove={handleRemove} />
      </div>
    </div>
  );
};
