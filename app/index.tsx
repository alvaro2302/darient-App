import ConnectivityToast from '@/components/ConnectivityToast';
import { initializeNotification } from '@/lib/notification';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import InitialStack from './StackScreen/InitialStack';


export default function RootLayout() {
  initializeNotification();
  return (
    <PaperProvider>
      <ConnectivityToast/>
      <InitialStack/>
    </PaperProvider>
  );
}
