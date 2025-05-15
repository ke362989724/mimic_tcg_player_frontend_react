import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const NotFound = (props: Props) => {
  const [timer, setTimer] = useState(3);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        const currentTime = prev - 1;
        if (currentTime <= 0) {
          navigate("/");
        }
        return currentTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="rounded-4xl p-20 text-center shadow-2xl">
        <div className="title">Not Found!!!</div>
        <div className="text-xl">
          {timer > 0
            ? `Redirecting in ${timer} seconds...`
            : "Redirecting now..."}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
