import { create as createStore } from 'zustand';

interface Store {
    user: { name: string; email: string } | null;
    favorites: Set<string>;
    setUser: (user: { name: string; email: string } | null) => void;
    addFavorite: (dogId: string) => void;
    removeFavorite: (dogId: string) => void;
    clearFavorites: () => void;
}

export const useStore = createStore<Store>((set) => ({
    user: null,
    favorites: new Set(),
    setUser: (user) => set({ user }),
    addFavorite: (dogId) =>
        set((state) => ({
            favorites: new Set([...state.favorites, dogId])
        })),
    removeFavorite: (dogId) =>
        set((state) => {
            const newFavorites = new Set(state.favorites);
            newFavorites.delete(dogId);
            return { favorites: newFavorites };
        }),
    clearFavorites: () => set({ favorites: new Set() }),
}));