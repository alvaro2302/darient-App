import UserLogged from '@/app/helper/UserLogged';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
interface AuthStoreState {
    user: UserLogged | null;
    loading: boolean;
    setUser: (user: UserLogged | null) => void; 
    validateUser: () => Promise<boolean>;
    successfullLogin: (user: UserLogged) => Promise<void>;
};
export const useAuthStore = create<AuthStoreState>() (set => ({
    user: null,
    setUser: (user) => set({ user }),
    loading: false,
    validateUser: async () => {
        set({ loading: true });
        const user = await AsyncStorage.getItem('user');
        if(user) {
            set({ user: JSON.parse(user),loading:false });
            return true;
        }
        set({ loading: false });
        return false;
       

    },
    successfullLogin: async (user: UserLogged) => {
        console.log('Setting user in store:', user);
        set({ loading: true });
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ user: user ,loading:false});

    }
}));