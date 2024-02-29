import { create } from 'zustand'

import { PeliculaResponse } from "@/models/responses"

interface PeliculaState {
    selectPelicula: PeliculaResponse[],
    setSelectPelicula: (term: PeliculaResponse[]) => void;
}

const usePeliculaStore = create<PeliculaState>((set) => ({
    selectPelicula: [],
    setSelectPelicula: (term) => set({ selectPelicula: term })
}));

export default usePeliculaStore;