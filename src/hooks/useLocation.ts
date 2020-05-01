import { useState, useEffect, useContext } from "react";

import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
  LocationData,
} from "expo-location";
import { Context as LocationContext } from "../context/LocationContext";

export const useLocation = (
  shouldTrack: boolean,
  cb: ({
    location,
    recording,
  }: {
    location: LocationData;
    recording: boolean;
  }) => void
) => {
  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState<{ remove(): void } | null>(null);
  const {
    location: { recording },
  } = useContext(LocationContext);
  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (location) => cb({ location, recording })
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
