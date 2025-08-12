import User from "./User";

interface SignInResponse {
    id: string;
    user: User;
    isSignedIn: boolean;
}
export default SignInResponse;