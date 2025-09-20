import { InfoBox } from "./InfoBox";
import { KeyValueRow } from "./KeyValueRow";
import { SelectRow } from "./SelectRow";

type ProgramBoxProps = {
  title: string;
  factorLabel?: string;
  factor: string;
  setFactor: (value: string) => void;
  transferLabel?: string;
  transfer: string;
  setTransfer: (value: string) => void;
  points: number;
  miles: number;
};

export function ProgramBox({
  title,
  factorLabel = "Faktor",
  factor,
  setFactor,
  transferLabel = "Erw. Transfer",
  transfer,
  setTransfer,
  points,
  miles,
}: ProgramBoxProps) {
  return (
    <div className="box">
      <InfoBox title={title}>
        <SelectRow
          label={factorLabel}
          value={factor}
          options={[1, 2, 3, 5, 7, 8, 10, 12, 20]}
          onChange={(e) => setFactor(e.target.value)}
        />
        {transferLabel !== "" && (
          <SelectRow
            label={transferLabel}
            value={transfer}
            options={[0, 25, 30]}
            onChange={(e) => setTransfer(e.target.value)}
          />
        )}

        {points > 0 && <KeyValueRow label={"Punkte/Einkauf"} value={points} />}

        <KeyValueRow label={"Meilen/Einkauf"} value={miles} />
      </InfoBox>
    </div>
  );
}
