import { cn } from "@/lib/utils";
import Link from "next/link";

interface BreadcrumbProps {
  children: React.ReactNode;
}

const Breadcrumb = ({ children }: BreadcrumbProps) => {
  return <div className="flex">{children}</div>;
};

interface BreadcrumbItemProps {
  children: React.ReactNode;
  path: string;
  disable?: boolean;
}
const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  path,
  disable,
}) => {
  const Component = disable ? "span" : Link;
  return (
    <Component
      href={path}
      className={cn(
        "text-foreground/50 text-sm font-bold ml-1 first:ml-0",
        "after:content-['_>_'] after:last:content-['']",
        "last:font-extrabold last:text-foreground",
        !disable && "hover:underline"
      )}
    >
      {children}
    </Component>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
