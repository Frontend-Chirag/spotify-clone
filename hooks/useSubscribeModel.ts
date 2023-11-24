import { create } from 'zustand';

interface SubscribeStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useSubscribeModel = create<SubscribeStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useSubscribeModel;