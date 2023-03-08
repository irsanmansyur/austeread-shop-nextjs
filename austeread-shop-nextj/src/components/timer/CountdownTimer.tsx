import { useCountdown } from "./coundown";

type Props = {
  targetDate: number;
};
export const CountdownTimer = ({ targetDate }: Props) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  return (
    <div className="show-counter">
      <h1 className="font-PublicSansMedium text-lg text-primary">
        {hours} : {minutes} : {seconds}
      </h1>
    </div>
  );
};
