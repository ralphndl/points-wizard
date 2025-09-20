type CheckboxRowProps = {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CheckboxRow({ label, checked, onChange }: CheckboxRowProps) {
  return (
    <label className="checkbox-row">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
}