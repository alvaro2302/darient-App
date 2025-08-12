import ConnectivityToast from '@/components/ConnectivityToast';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import InitialStack from './StackScreen/InitialStack';


export default function RootLayout() {
  
  return (
    <PaperProvider>
      <ConnectivityToast/>
      <InitialStack/>
    </PaperProvider>
  );
}
