import { useState, useEffect } from "react";

export default function Footer() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("Loading...");

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Get user's timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setLocation(timezone);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="footer">
      <div className="row" style={{ justifyContent: "space-between", fontSize: 12, opacity: 0.85, flexWrap: "wrap", gap: "8px" }}>
        <div>
          Developed by <a href="https://net1io.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>net1io.com</a>
        </div>
        <div>
          {formattedDate} {formattedTime} ({location})
        </div>
        <div>
          Copyright &copy; {currentTime.getFullYear()}
        </div>
      </div>
    </div>
  );
}
