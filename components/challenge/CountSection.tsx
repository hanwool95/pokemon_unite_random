import React from "react";

const CountSection = ({ content }: { content: string | React.ReactNode }) => {
  return (
    <div className="w-fit flex items-center justify-center p-4 mx-auto border-2 border-gray-300 rounded-lg bg-gray-100 shadow-lg">
      {content}
    </div>
  );
};

export default CountSection;
