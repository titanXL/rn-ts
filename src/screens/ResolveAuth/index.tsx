import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../../context/AuthContext";

interface IProps {}

export const ResolveAuth: React.FC<IProps> = ({}) => {
  const { tryLocalSignIn } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);
  return null;
};
