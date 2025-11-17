import { create } from 'zustand';


type TypeDragStore = {
  Drag: boolean;
  setDrag: (Mfw: boolean) => void;
};

export const useDragStore = create<TypeDragStore>((set) => ({
  Drag: false,
  setDrag: (Mfw) => set({ Drag: Mfw }),
}));


type TypeDropStore = {
  Drop: boolean;
  setDrop: (state: boolean) => void;
};

export const useDropStore = create<TypeDropStore>((set) => ({
  Drop: false,
  setDrop: (state) => set({ Drop: state }),
}));

export default useDragStore;