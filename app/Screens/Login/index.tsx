import JokeViewModel from "@/app/ModelViewModels/JokeViewModel";
import SignOutViewModel from "@/app/ModelViewModels/SignOutViewModel";
import FormValidate from "@/components/FormValidate";
import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
const Login = () => {
    const {isLogin} = SignOutViewModel();
    const {getJokeRandomWithNotification} = JokeViewModel();
    return (
        <View style={styles.container}>
        <View style={{ alignItems: 'center', marginVertical: 20}}>
            <Text style={styles.title}>Welcome to App  </Text>
        </View>
        
        <FormValidate
            isSubmitSuccefull={isLogin}
            loading={false}
            buttonText="Login"
            notification={getJokeRandomWithNotification}
       />
      </View>
    )
}
export default Login;