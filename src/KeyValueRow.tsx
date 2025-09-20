type KeyValueRowProps = {
  label: string;
  value: number | string;
};

export function KeyValueRow({ label, value }: KeyValueRowProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}