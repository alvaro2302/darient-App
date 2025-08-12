import SignInResponse from "@/app/helper/SignInResponse";
import User from "@/app/helper/User";
import { supabase } from "@/lib/supabase";


export const registerUser = async (user: User): Promise<boolean> => {
    let  IsRegister = false
    const {data: userNew, error} = await supabase.from('Users').insert([user]).select().single();
    if (error) {
        console.error("Error registering user:", error);
        return IsRegister;
    }
    if(userNew) {

       IsRegister = true;
    }
    return IsRegister;
   
}
export const SignInUser  = async (user: User): Promise<SignInResponse> => {
    let IsSignIn = false;
    const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.email)
        .eq('password', user.password)
        .single();

    if (error) {
        IsSignIn = false;
    }

    if (data) {
        IsSignIn = true;
    }
    const signInResponse: SignInResponse = {
        id: data.id,
        user: {
            email: data.email,
            password: data.password,
        },
        isSignedIn: IsSignIn
    };
    return signInResponse;
}
