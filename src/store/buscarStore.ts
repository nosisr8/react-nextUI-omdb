import { create } from 'zustand'

interface BuscarState {
    inputBuscar: string,
    setInputBuscar: (term: string) => void;
    inputYear: string,
    setInputYear: (term: string) => void;
    page: number,
    setPage: (term: number) => void;
    paginacion: number,
    setPaginacion: (term: number) => void;
    imdbID: string;
    setImdbID: (term: string) => void;
}

const useBuscarStore = create<BuscarState>((set) => ({
    inputBuscar: '',
    setInputBuscar: (term) => set({ inputBuscar: term }),
    inputYear: '',
    setInputYear: (term) => set({ inputYear: term }),
    page: 1,
    setPage: (term) => set({ page: term }),
    paginacion: 1,
    setPaginacion: (term) => set({ paginacion: term }),
    imdbID: '',
    setImdbID: (term) => set({ imdbID: term }),
}));

export default useBuscarStore;