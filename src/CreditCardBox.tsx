import { InfoBox } from "./InfoBox";
import { CheckboxRow } from "./CheckboxRow";
import { KeyValueRow } from "./KeyValueRow";

type Reward = {
  label: string;
  value: string | number;
};

type Boost = {
  label?: string;
  active: boolean;
  onToggle: (checked: boolean) => void;
};

type CreditCardProps = {
  cardName: string;
  onSelect?: () => void;
  boost?: Boost;
  rewards?: Reward[];
};

export function CreditCardBox({
  cardName: title,
  onSelect,
  boost,
  rewards = [],
}: CreditCardProps) {
  return (
    <div
      onClick={onSelect}
      className="box"
    >
      <InfoBox title={title}>
        {boost && (
          <CheckboxRow
            label={boost.label ?? "Boost"}
            checked={boost.active}
            onChange={(e) => boost.onToggle(e.target.checked)}
          />
        )}

        {rewards.map((row, idx) => (
          <KeyValueRow
            key={idx}
            label={row.label}
            value={row.value}
          />
        ))}
      </InfoBox>
    </div>
  );
}
