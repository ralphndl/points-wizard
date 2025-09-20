type SelectRowProps = {
  label: string;
  value: string;
  options: (string | number)[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function SelectRow({ label, value, options, onChange }: SelectRowProps) {
  return (
    <label className="select-row">
      <span className="select-label">{label}</span>
      <select className="select-field" value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}