import { Api } from '@/api/index';
import { User } from '@types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Store {
    user: User | null;
    loading: boolean;
    loginDialog: boolean;
    openLoginDialog: (open: boolean) => void;
    setUser: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create(
    persist<Store>(
        (set, get) => ({
            user: null,
            loading: false,
            loginDialog: false,
            async setUser() {
                set({ loading: true });
                const user = await Api.Instance.getUser();
                set({ user, loading: false });
            },
            async logout() {
                await Api.Instance.logout();
                set({ user: null });
            },
            openLoginDialog(open) {
                set({ loginDialog: open });
            },
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
);
