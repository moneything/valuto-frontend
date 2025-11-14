import { Company } from "../logic/gameLogic";

export default function PriceRow({ company }: { company: Company }) {
  return (
    <div className="flex items-center justify-between mt-2">
      <p className="text-gray-700 font-medium">Price:</p>
      <p className="text-orange-500 font-semibold">
        £{company.currentPrice.toFixed(2)}
      </p>
    </div>
  );
}
