import { Company } from "../logic/gameLogic";
import "../investment.css";

export default function PriceRow({ company }: { company: Company }) {
  return (
    <div className="flex items-center justify-between mt-2">
      <p className="font-medium text-[#d7d7db]">Price:</p>
      <p className="font-semibold text-orange-400">
        £{company.currentPrice.toFixed(2)}
      </p>
    </div>
  );
}
