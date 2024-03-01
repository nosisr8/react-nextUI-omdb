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
    cargando: boolean;
    setCargando: (term: boolean) => void;
    cargandoDetalle: boolean;
    setCargandoDetalle: (term: boolean) => void;
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
    cargando: false,
    setCargando: (term) => set({ cargando: term }),
    cargandoDetalle: false,
    setCargandoDetalle: (term) => set({ cargandoDetalle: term }),
}));

export default useBuscarStore;