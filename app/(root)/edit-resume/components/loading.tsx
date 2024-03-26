import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className=" animate-spin flex items-center justify-center w-full mt-10">
      <Loader className="text-4xl" />
    </div>
  );
};

export default loading;
