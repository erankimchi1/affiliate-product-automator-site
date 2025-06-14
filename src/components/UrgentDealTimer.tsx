
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface UrgentDealTimerProps {
  expiryTime: string;
  onExpire?: () => void;
}

export const UrgentDealTimer = ({ expiryTime, onExpire }: UrgentDealTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiry = new Date(expiryTime).getTime();
      const difference = expiry - now;
      
      if (difference <= 0) {
        setTimeLeft(0);
        onExpire?.();
        return;
      }
      
      setTimeLeft(difference);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiryTime, onExpire]);

  if (timeLeft <= 0) return null;

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);

  return (
    <div className="bg-red-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
      <Clock size={16} />
      <span className="font-bold text-sm">
        Deal expires in: {hours > 0 && `${hours}h `}{minutes}m {seconds}s
      </span>
    </div>
  );
};
