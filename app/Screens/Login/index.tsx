
import SignOutViewModel from "@/app/ModelViewModels/SignOutViewModel";
import FormValidate from "@/components/FormValidate";
import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
const Login = () => {
    const {isLogin} = SignOutViewModel();
    return (
        <View style={styles.container}>
        <View style={{ alignItems: 'center', marginVertical: 20}}>
            <Text style={styles.title}>Welcome to App  </Text>
            <Image source={require('../../../assets/images/chuckNorrispage.png')} style={{ width: '100%', height: 200, alignSelf: 'center' }} />
        </View>
        
        <FormValidate
            isSubmitSuccefull={isLogin}
            loading={false}
            buttonText="Login"
       />
      </View>
    )
}
export default Login;