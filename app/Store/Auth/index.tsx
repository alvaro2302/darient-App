import User from '@/app/helper/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
interface AuthStoreState {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void; 
    validateUser: () => Promise<boolean>;
    successfullLogin: (user: User) => Promise<void>;
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
    successfullLogin: async (user: User) => {
        console.log('Setting user in store:', user);
        set({ loading: true });
        await AsyncStorage.setItem('user', JSON.stringify(user));
        set({ user: user ,loading:false});

    }
}));