import React from "react";
import { Input, Button } from "react-native-elements";
import { Spacer } from "../Spacer";

interface IProps {}

export const TrackForm: React.FC<IProps> = ({}) => {
  return (
    <>
      <Input placeholder="Enter name" />
      <Button title="Start Recording" />
    </>
  );
};
