type InputRowProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputRow({ label, value, onChange }: InputRowProps) {
  return (
    <label className="input-row">
      <span className="input-label">{label}</span>
      <input
        className="input-field"
        type="text"
        inputMode="decimal"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}