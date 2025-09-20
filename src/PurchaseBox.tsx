import { CheckboxRow } from "./CheckboxRow";
import { InputRow } from "./InputRow";

// holding the purchased object used as input
type Purchase = {
  amount: string;
  avis: boolean;
  worldshop: boolean;
};

type PurchaseBoxProps = {
  purchase: Purchase;
  setPurchase: React.Dispatch<React.SetStateAction<Purchase>>;
  onReset: () => void;
};

export function PurchaseBox({
  purchase,
  setPurchase,
  onReset,
}: PurchaseBoxProps) {
  const updateField = (field: keyof Purchase, value: string | boolean) => {
    setPurchase((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="box">
      <h2>Einkauf</h2>
      <InputRow
        label="Betrag"
        value={purchase.amount}
        onChange={(e) => updateField("amount", e.target.value)}
      />
      <CheckboxRow
        label="AVIS Anmietung?"
        checked={purchase.avis}
        onChange={(e) => updateField("avis", e.target.checked)}
      />
      <CheckboxRow
        label="Worldshop Einkauf?"
        checked={purchase.worldshop}
        onChange={(e) => updateField("worldshop", e.target.checked)}
      />
      <button className="btn btn-secondary" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
