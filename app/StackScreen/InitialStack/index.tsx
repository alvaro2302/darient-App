import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { useAuthStore } from "../../Store/Auth";
import TabBottoms from "../../TabBottoms";
import SignUpStack from "../SignUpStack";
const InitialStack = () => {
  const { validateUser, user, loading } = useAuthStore();
  console.log("user", user);
  useEffect(() => {
    validateUser();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        testID="loading-indicator"
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }
  return <>{user ? <TabBottoms /> : <SignUpStack />}</>;
};
export default InitialStack;
