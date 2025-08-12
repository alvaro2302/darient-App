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
export const SignInUser  = async (user: User): Promise<boolean> => {
    let IsSignIn = false;
    const { data, error } = await supabase
        .from('Users')
        .select('*')
        .eq('email', user.email)
        .eq('password', user.password)
        .single();

    if (error) {
        return IsSignIn;
    }

    if (data) {
        IsSignIn = true;
    }
    return IsSignIn;
}
