import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";
import { Portal, Snackbar } from "react-native-paper";

const ConnectivityToast = () => {
  const [isNotConnected, setIsNotConnected] = useState(false);
  useEffect(() => {
    let mounted = true;
    NetInfo.fetch().then((state) => {
      if (!mounted) {
        return;
      }
      const isOffline = state.isConnected === false;
      setIsNotConnected(isOffline);
    });
    const unsubscribe = NetInfo.addEventListener((state) => {
      const isOffline =
        state.isConnected === false;
    
      setIsNotConnected(isOffline);
    });
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);
  return (
    <Portal>
      <Snackbar
        visible={isNotConnected}
        onDismiss={() => setIsNotConnected(false)}
        action={{ label: "Ok", onPress: () => {} }}
      >
        No internet connection
      </Snackbar>
    </Portal>
  );
};
export default ConnectivityToast;
