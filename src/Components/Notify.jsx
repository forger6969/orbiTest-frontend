import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

const variants = {
  success: {
    border: "border-green-500",
    icon: <CheckCircle className="text-green-500 w-5 h-5" />,
  },
  error: {
    border: "border-red-500",
    icon: <XCircle className="text-red-500 w-5 h-5" />,
  },
  warning: {
    border: "border-yellow-500",
    icon: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
  },
  info: {
    border: "border-blue-500",
    icon: <Info className="text-blue-500 w-5 h-5" />,
  },
};

export default function Notify({ message, type = "info" }) {
  const variant = variants[type];
console.log(message);

  return (
    <div
      className={`
        flex items-start gap-3
        bg-white
        border-l-4 ${variant.border}
        rounded-lg
        shadow-md
        p-4
        min-w-[280px]
        text-sm
        text-gray-800
      `}
    >
      {variant.icon}
      <span className="leading-snug">{message}</span>
    </div>
  );
}
