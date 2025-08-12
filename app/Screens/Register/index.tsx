import SignOutViewModel from "@/app/ModelViewModels/SignOutViewModel";
import FormValidate from "@/components/FormValidate";
import { Text, View } from "react-native";
import styles from "../Login/styles";
const Register = (props) => {
const {isRegistered} = SignOutViewModel();
  const navigateToLogin = () => {
    props.navigation.navigate('Login');
  }
  return (
    <View style={styles.container}>
      <Text style= {styles.title}>Register</Text>
      <FormValidate
        isSubmitSuccefull={isRegistered}
        loading={false}
        buttonText="Register"
        navigate={navigateToLogin} // Replace with actual navigation logic
       />
    </View>
  );
}
export default Register;