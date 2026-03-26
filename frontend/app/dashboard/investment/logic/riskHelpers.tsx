import { RiskLevel } from "./gameLogic";
import { FiShield, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";

export function getRiskColor(level: RiskLevel) {
  switch (level) {
    case "low":
      return "border-green-500/20 bg-green-500/10 text-green-300";
    case "medium":
      return "border-yellow-500/20 bg-yellow-500/10 text-yellow-300";
    case "high":
      return "border-red-500/20 bg-red-500/10 text-red-300";
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
