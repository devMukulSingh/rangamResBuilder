import { Loader2 } from "lucide-react";
import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Spinner;
