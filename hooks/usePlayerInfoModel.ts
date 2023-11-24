import { create } from 'zustand';

interface PlayerInfoModel {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const usePlayerInfoModel = create<PlayerInfoModel>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default usePlayerInfoModel