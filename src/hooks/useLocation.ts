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
  cb: (location: LocationData, recording: boolean) => void
) => {
  const [err, setErr] = useState(null);
  const {
    location: { recording },
  } = useContext(LocationContext);

  useEffect(() => {
    let subscriber: { remove(): void } | undefined;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          (location) => cb(location, recording)
        );
      } catch (error) {
        setErr(err);
      }
    };
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber?.remove();
      subscriber = undefined;
    }
    return function cleanup() {
      subscriber?.remove();
    };
  }, [shouldTrack, cb]);

  return [err];
};
