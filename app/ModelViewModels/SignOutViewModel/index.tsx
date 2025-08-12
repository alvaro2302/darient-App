import User from "@/app/helper/User";
import { registerUser, SignInUser } from "@/app/services/ServiceSignOut";
import { useAuthStore } from "@/app/Store/Auth";

const SignOutViewModel = () => {
    const {successfullLogin} = useAuthStore();
    const isRegistered = async (user: User): Promise<boolean> => {
        console.log('Registering user:', user);
        const result = await registerUser(user);
        return result;
    }
     const isLogin = async (user: User): Promise<boolean> => {
        console.log('Signing in user:', user);
        const result = await SignInUser(user);
        if(result.isSignedIn) {
            console.log('Sign in result:', result);
            const userLogged = {
                id: result.id,
                email: result.user.email,
            };
            await successfullLogin(userLogged);
        }
        return result.isSignedIn;
    }
    return {
        isRegistered,
        isLogin
    }

}
export default SignOutViewModel;
