
import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPosition = () => {
    if (!navigator.geolocation) {
      return setError("Your Browser does not support geolocation");
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos)
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          
        });
        setIsLoading(false);
        
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  };

  return { position, error, isLoading, getPosition };
}

