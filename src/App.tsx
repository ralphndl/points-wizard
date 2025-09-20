import { useState, useMemo } from "react";
import { PurchaseBox } from "./PurchaseBox";
import { CreditCardBox } from "./CreditCardBox";
import { ProgramBox } from "./ProgramBox";
import { ResultBox } from "./ResultBox";
import "./Box.css";

type Card = {
  boostActive: boolean;
  factorDefault: number;
  factorBoost: number;
};

function calcProgramPointsForCard(amount: number, card: Card) {
  const factor = card.boostActive ? card.factorBoost : card.factorDefault;
  return Math.round(amount * factor);
}

function calcPaybackMiles(paybackPoints: number, convertFactor: number) {
  return Math.round(paybackPoints * convertFactor);
}

export default function App() {
  const parseAmount = (s: string) => {
    const n = parseFloat(s.replace(",", "."));
    return Number.isFinite(n) ? n : 0;
  };

  // --- States: nur Inputs ---
  const [purchase, setPurchase] = useState({
    amount: "10",
    avis: false,
    worldshop: false,
  });

  const [amexppcc, setAmexppcc] = useState<Card>({
    boostActive: false,
    factorDefault: 1 / 3,
    factorBoost: 2 / 3,
  });

  const [milesmorecc, ] = useState<Card>({
    boostActive: false,
    factorDefault: 1 / 2,
    factorBoost: 1 / 2,
  });

  const [amexcc, setAmexcc] = useState<Card>({
    boostActive: false,
    factorDefault: 1,
    factorBoost: 3 / 2,
  });

  const [paybackTransferFactor, setPaybackTransferFactor] = useState("1");
  const [paybackFactor, setPaybackFactor] = useState("1");
  const [milesmoreFactor, setMilesMoreFactor] = useState("1");

  // --- Berechnungen ---
  const amountNum = useMemo(
    () => parseAmount(purchase.amount),
    [purchase.amount]
  );

  // Karten
  const amexppccPoints = useMemo(
    () => calcProgramPointsForCard(amountNum, amexppcc),
    [amountNum, amexppcc]
  );

  const amexppccMiles = useMemo(
    () => calcPaybackMiles(amexppccPoints, 1.3),
    [amexppccPoints]
  );

  const milesmoreccMiles = useMemo(
    () => calcProgramPointsForCard(amountNum, milesmorecc),
    [amountNum, milesmorecc]
  );

  const amexccRewards = useMemo(
    () => calcProgramPointsForCard(amountNum, amexcc),
    [amountNum, amexcc]
  );

  const amexccRewardsToPayback = useMemo(
    () => Math.floor(amexccRewards / 3),
    [amexccRewards]
  );

  const amexRewardsToMiles = useMemo(() => {
    let factorNum = parseInt(paybackTransferFactor) || 1;
    if (paybackTransferFactor === "0") factorNum = 1.0;
    if (paybackTransferFactor === "25") factorNum = 1.25;
    if (paybackTransferFactor === "30") factorNum = 1.3;
    return Math.round(amexccRewardsToPayback * factorNum);
  }, [amexccRewardsToPayback, paybackTransferFactor]);

  // Programme
  const paybackPoints = useMemo(() => {
    const factorNum = parseFloat(paybackFactor) || 1;
    return Math.round((amountNum / 2) * factorNum);
  }, [amountNum, paybackFactor]);

  const milesmorePoints = useMemo(() => {
    const factorNum = parseFloat(milesmoreFactor) || 1;
    return Math.round(amountNum * factorNum);
  }, [amountNum, milesmoreFactor]);

  const transferMiles = useMemo(() => {
    let factorNum = parseInt(paybackTransferFactor) || 1;
    if (paybackTransferFactor === "0") factorNum = 1.0;
    if (paybackTransferFactor === "25") factorNum = 1.25;
    if (paybackTransferFactor === "30") factorNum = 1.3;
    return Math.round(paybackPoints * factorNum);
  }, [paybackPoints, paybackTransferFactor]);

  // Yield (Result)
  const yieldData = useMemo(() => {
    const bestProgramMiles = Math.max(transferMiles, milesmorePoints);
    const bestCardMiles = Math.max(
      amexppccMiles,
      milesmoreccMiles,
      amexRewardsToMiles
    );

    return {
      paybackPoints,
      miles: bestProgramMiles + bestCardMiles,
    };
  }, [
    paybackPoints,
    transferMiles,
    milesmorePoints,
    amexppccMiles,
    milesmoreccMiles,
    amexRewardsToMiles,
  ]);

  // Reset
  const reset = () => {
    setPurchase({
      amount: "10",
      avis: false,
      worldshop: false,
    });
  };

  // --- Render ---
  return (
    <div className="app-layout">
      <div className="info-box-container result">
        <PurchaseBox
          purchase={purchase}
          setPurchase={setPurchase}
          onReset={reset}
        />
      </div>

      <div className="info-box-container">
        <CreditCardBox
          cardName="AMEX Payback"
          boost={{
            label: "MAX Boost",
            active: amexppcc.boostActive,
            onToggle: (checked) =>
              setAmexppcc((prev) => ({ ...prev, boostActive: checked })),
          }}
          rewards={[
            { label: "Payback Punkte", value: amexppccPoints },
            { label: "M&M Meilen", value: amexppccMiles },
          ]}
        />

        <CreditCardBox
          cardName="DKB M&M"
          rewards={[{ label: "M&M Meilen", value: milesmoreccMiles }]}
        />

        <CreditCardBox
          cardName="AMEX"
          boost={{
            label: "Turbo",
            active: amexcc.boostActive,
            onToggle: (checked) =>
              setAmexcc((prev) => ({ ...prev, boostActive: checked })),
          }}
          rewards={[
            { label: "AMEX Rewards", value: amexccRewards },
            { label: "Payback Punkte", value: amexccRewardsToPayback },
            { label: "M&M Meilen", value: amexRewardsToMiles },
          ]}
        />
      </div>

      <div className="info-box-container">
        <ProgramBox
          title="Payback"
          factorLabel="Coupon Faktor"
          factor={paybackFactor}
          setFactor={setPaybackFactor}
          transferLabel="Erw. Transfähr"
          transfer={paybackTransferFactor}
          setTransfer={setPaybackTransferFactor}
          points={paybackPoints}
          miles={transferMiles}
        />

        <ProgramBox
          title="Miles & More"
          factorLabel="Vielfach Meilen"
          factor={milesmoreFactor}
          setFactor={setMilesMoreFactor}
          setTransfer={setPaybackTransferFactor}
          miles={milesmorePoints}
          transfer={""}
          transferLabel=""
          points={-1}
        />
      </div>

      <div className="info-box-container result">
        <ResultBox yieldData={yieldData} />
      </div>

      <footer style={{ marginTop: "2rem", textAlign: "center" }}>
        <a href="/impressum.html" target="_blank" rel="noopener noreferrer">
          Impressum
        </a>
      </footer>
    </div>
  );
}
