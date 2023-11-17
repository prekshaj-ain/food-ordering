import { useEffect } from "react";
import { useState } from "react";

const useConnection = function (initialValue) {
  const [isOffline, setIsOffline] = useState(initialValue);
  useEffect(() => {
    window.addEventListener("online", () => setIsOffline(false));
    window.addEventListener("offline", () => setIsOffline(true));
    return () => {
      window.removeEventListener("online", () => setIsOffline(false));
      window.removeEventListener("offline", () => setIsOffline(true));
    };
  }, [isOffline]);
  return isOffline;
};

export default useConnection;
