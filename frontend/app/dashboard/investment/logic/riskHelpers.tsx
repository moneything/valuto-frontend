import { RiskLevel } from "./gameLogic";
import { FiShield, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";

export function getRiskColor(level: RiskLevel) {
  switch (level) {
    case "low":
      return "bg-green-100 text-green-700 border-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "high":
      return "bg-red-100 text-red-700 border-red-300";
    default:
      return "";
  }
}

export function getRiskIcon(level: RiskLevel): JSX.Element | null {
  switch (level) {
    case "low":
      return <FiShield className="w-4 h-4" />;
    case "medium":
      return <FiAlertTriangle className="w-4 h-4" />;
    case "high":
      return <FiTrendingUp className="w-4 h-4" />;
    default:
      return null;
  }
}

export function getRiskExplanation(level: RiskLevel) {
  switch (level) {
    case "low":
      return "Low risk stocks are stable and reliable. Their prices usually move slowly, making them safer for beginners.";
    case "medium":
      return "Medium risk stocks can move up or down more than low-risk ones. They offer a balance between safety and potential profit.";
    case "high":
      return "High risk stocks are unpredictable and can change a lot in price. They may bring big gains or losses quickly.";
    default:
      return "";
  }
}
