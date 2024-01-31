import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectorProps {
  placeholder: string;
  options: string[];
  onChange: (value: string) => void;
  value: string;
}

export const Selector: React.FC<SelectorProps> = ({
  placeholder,
  options,
  onChange,
  value,
  ...rest
}) => {
  return (
    <Select {...rest} onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option} key={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
