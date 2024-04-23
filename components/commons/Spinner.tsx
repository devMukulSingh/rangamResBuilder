import { Loader2 } from "lucide-react";
import React from "react";
import { LuLoader2 } from "react-icons/lu";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <LuLoader2 size={35} className="animate-spin" />
    </div>
  );
};

export default Spinner;
