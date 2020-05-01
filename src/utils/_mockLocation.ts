import * as Location from "expo-location";

const tenMetersWithDegrees = 0.0001;

const getLocation = (increment: number) => ({
  timestamp: 1000000,
  coords: {
    speed: 0,
    heading: 0,
    accuracy: 5,
    altitudeAccuracy: 5,
    altitude: 5,
    longitude: 23.3219 + increment * tenMetersWithDegrees,
    latitude: 42.6977 + increment * tenMetersWithDegrees,
  },
});

let counter = 0;

setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter++),
  });
}, 1000);
