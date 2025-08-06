import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FormFieldWithTooltip({ text }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="w-4 h-4 text-blue-500 cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-300 rounded px-2 py-1 text-sm">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
