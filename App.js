import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MotionConfig, motion } from "framer-motion";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <MotionConfig>
      <Card className="max-w-sm mx-auto mt-10 p-4 bg-gray-800 text-white rounded-2xl shadow-xl">
        <CardContent>
          <h2 className="text-xl font-bold text-center mb-4">Cuenta Regresiva</h2>
          <div className="grid grid-cols-4 gap-2 text-center">
            {Object.keys(timeLeft).map((interval) => (
              <motion.div
                key={interval}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-2xl font-semibold">{timeLeft[interval] ?? 0}</div>
                <div className="text-sm">{interval}</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </MotionConfig>
  );
};

export default function App() {
  // Fecha límite: domingo 11 de mayo de 2025 a las 00:00 (medianoche)
  const targetDate = new Date(2025, 4, 11, 0, 0); 

  return <CountdownTimer targetDate={targetDate} />;
}
