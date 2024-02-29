import { create } from 'zustand'

import { PeliculaResponse } from "@/models/responses"

interface PeliculaState {
    selectPelicula: PeliculaResponse | null,
    setSelectPelicula: (term: PeliculaResponse) => void;
}

const usePeliculaStore = create<PeliculaState>((set) => ({
    selectPelicula: null,
    setSelectPelicula: (term) => set({ selectPelicula: term })
}));

export default usePeliculaStore;