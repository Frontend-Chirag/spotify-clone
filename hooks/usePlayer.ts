import { create } from "zustand";

interface PlayerStore {
    ids: string | string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string | string[]) => void;
    reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
    ids:  [],
    activeId: undefined,
    setId: (id: string) => set({ activeId: id }),
    setIds: (ids: string | string[]) => set({ ids: ids }),
    reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;