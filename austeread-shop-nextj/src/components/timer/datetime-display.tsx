import React from "react";

type Props = {
  value: string;
  type: string;
  isDanger: boolean;
};
const DateTimeDisplay = ({ value, type, isDanger }: Props) => {
  return (
    <div className={isDanger ? "text-red-500" : ""}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
