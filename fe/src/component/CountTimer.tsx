import { useEffect, useState } from "react";

const CountTimer: React.FC = () => {
    const [time, setTime] = useState<string>("");

    const updateTime = () => {
        const now = new Date();

        const dayOptions: Intl.DateTimeFormatOptions = { weekday: 'long', timeZone: 'Asia/Ho_Chi_Minh' };
        const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
        const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' };

        const dayString = now.toLocaleDateString('vi-VN', dayOptions);
        const dateString = now.toLocaleDateString('vi-VN', dateOptions);
        const timeString = now.toLocaleTimeString('vi-VN', timeOptions);

        setTime(`${dayString}, ${dateString} - ${timeString}`);
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

export default CountTimer;