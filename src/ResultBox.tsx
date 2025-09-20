import { KeyValueRow } from "./KeyValueRow";

type Yield = {
  paybackPoints: number;
  miles: number;
};

type YieldProps = {
  yieldData: Yield;
};

export function ResultBox({ yieldData}: YieldProps) {
  return (
    <div className="box">
      <h2>Ausbeute</h2>
      <KeyValueRow label="Meilen/Einkauf" value={yieldData.miles} />
    </div>
  );
}