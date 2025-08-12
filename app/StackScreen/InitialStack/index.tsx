import { useAuthStore } from "@/app/Store/Auth";
import TabBottoms from "@/app/TabBottoms";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import SignUpStack from "../SignUpStack";
const InitialStack = () => {
    
  const {validateUser, user, loading} = useAuthStore()
  console.log('user', user);
  useEffect(() => {
    validateUser();
  },[])
  if(loading) {
    return <ActivityIndicator size="large" style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
  }
  return (
    <>
    {
        user ? <TabBottoms/> : <SignUpStack/>
    }
    </>
 )
    
  
}
export default InitialStack;