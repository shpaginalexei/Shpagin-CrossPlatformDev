import MultipleSelector, { Option } from "@/components/ui/multi-select";

interface TagsPickerProps {
  allTags: {
    value: string;
    label: string;
  }[];
  value: string[] | null;
  onChange: (val: string[] | null) => void;
}

export function TagsPicker({ allTags, value, onChange }: TagsPickerProps) {
  return (
    <MultipleSelector
      value={allTags.filter((t) => value?.includes(t.value))}
      onChange={(options: Option[]) => {
        onChange(options.map((o) => o.value));
      }}
      defaultOptions={allTags}
      placeholder="Выберите теги"
      hideClearAllButton
      hidePlaceholderWhenSelected
      emptyIndicator={<p className="text-center text-sm">Нет результатов</p>}
    />
  );
}
