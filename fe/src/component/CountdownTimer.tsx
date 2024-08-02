import { useEffect, useState } from "react";

const CountdownTimer: React.FC = () => {
    const [time, setTime] = useState<string>("");

    const updateTime = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Asia/Ho_Chi_Minh', // Giờ Việt Nam
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        };
        const timeString = now.toLocaleString('en-US', options);
        setTime(timeString);
    };

    useEffect(() => {
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            {time}
        </div>
    );
};

export default CountdownTimer;