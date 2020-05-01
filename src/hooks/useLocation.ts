import { useState, useEffect } from "react";

import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
  LocationData,
} from "expo-location";

export const useLocation = (
  shouldTrack: boolean,
  cb: (location: LocationData) => void
) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState<{ remove(): void } | null>(null);
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        cb
      );
      setSubscriber(sub);
    } catch (error) {
      setErr(err);
    }
  };
  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber !== null) {
        subscriber.remove();
        setSubscriber(null);
      }
    }
  }, [shouldTrack]);

  return [err];
};
