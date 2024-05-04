interface hideOnProductionProps {
  children: React.ReactNode;
}

export const HideOnProduction: React.FC<hideOnProductionProps> = ({
  children,
}) => {
  return process.env.NODE_ENV === "production" ? null : children;
};
