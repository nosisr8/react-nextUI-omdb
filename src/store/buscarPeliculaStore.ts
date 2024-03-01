import { create } from 'zustand'

import { BuscarPeliculaResponse } from "@/models/responses"

interface BuscarPeliculaState {
    peliculaBuscar: BuscarPeliculaResponse,
    setPeliculaBuscar: (term: BuscarPeliculaResponse) => void;
}

const useBuscarPeliculaStore = create<BuscarPeliculaState>((set) => ({
    peliculaBuscar: { Response: '', Search: [], totalResults: '0' },
    setPeliculaBuscar: (term) => set({ peliculaBuscar: term })
}));

export default useBuscarPeliculaStore;