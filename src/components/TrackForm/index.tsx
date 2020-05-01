import React, { useContext } from "react";
import { Input, Button } from "react-native-elements";
import { Spacer } from "../Spacer";
import { Context as LocationContext } from "../../context/LocationContext";

interface IProps {}

export const TrackForm: React.FC<IProps> = ({}) => {
  const {
    location: { name, recording, locations },
    changeName,
    startRecording,
    stopRecording,
  } = useContext(LocationContext);

  return (
    <>
      <Input placeholder="Enter name" onChangeText={changeName} value={name} />
      {recording ? (
        <Button title="Stop Recording" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
    </>
  );
};
