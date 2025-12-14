import MultipleSelector, { Option } from "@/components/ui/multi-select";

interface AuthorsPickerProps {
  allAuthors: {
    value: string;
    label: string;
  }[];
  value: string[] | null;
  onChange: (val: string[] | null) => void;
}

export function AuthorsPicker({
  allAuthors,
  value,
  onChange,
}: AuthorsPickerProps) {
  return (
    <MultipleSelector
      value={allAuthors.filter((a) => value?.includes(a.value))}
      onChange={(options: Option[]) => {
        onChange(options.map((o) => o.value));
      }}
      defaultOptions={allAuthors}
      placeholder="Выберите авторов"
      hideClearAllButton
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center text-sm">Нет результатов</p>}
    />
  );
}
