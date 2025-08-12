import User from "@/app/helper/User";
import { Formik } from "formik";
import { Alert, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { styles } from "./styles";
interface FormValidateProps {
    isSubmitSuccefull: (user: User) => Promise<boolean>;
    loading: boolean;
    buttonText?: string;
    navigate?: () => void;
    notification?: () => Promise<void>;
}


const FormValidate = (props: FormValidateProps) => {
const {isSubmitSuccefull, buttonText,navigate} = props; 
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid Email")
          .required("Required a valid email"),
        password: Yup.string()
          .min(6, "Must be at least 6 characters")
          .required("Required"),
      })}
      onSubmit={ async (values, formikActions) => {
        const user: User = {
          email: values.email,
          password: values.password,
        };
        const isSubmitSuccefullResult = await isSubmitSuccefull(user);
        if (isSubmitSuccefullResult) {
          formikActions.resetForm();
          Alert.alert("Success", "Operation completed successfully");
          if (buttonText === "Login") {
            await props.notification?.();
          }
          if(navigate){
            navigate();
         }
        } else {
          formikActions.resetForm();
          Alert.alert("Error", "Operation failed, please try again");
        }
        formikActions.setSubmitting(false);
      }}
    >
      {(props) => (
        <View>
          <TextInput
            onChangeText={props.handleChange("email")}
            onBlur={props.handleBlur("email")}
            value={props.values.email}
            placeholder="Email Address"
            style={styles.input}
          />
          {props.touched.email && props.errors.email ? (
            <Text style={styles.error}>{props.errors.email}</Text>
          ) : null}
          <TextInput
            onChangeText={props.handleChange("password")}
            onBlur={props.handleBlur("password")}
            value={props.values.password}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          {props.touched.password && props.errors.password ? (
            <Text style={styles.error}>{props.errors.password}</Text>
          ) : null}
          <Button
            onPress={props.handleSubmit}
            color="black"
            mode="contained"
            loading={props.isSubmitting}
            disabled={props.isSubmitting}
            style={{ marginTop: 16 }}
          >
            {buttonText || "Submit"}
          </Button>
        </View>
      )}
    </Formik>
  );
};
export default FormValidate;
