import axios from "axios"
import { BuscarRequest } from "@/models/request"
import { BuscarPeliculaResponse, PeliculaResponse } from "@/models/responses"

export const getPelicula = async (request: BuscarRequest) => {
    const url = process.env.OMDB_URL
    const apiKey = process.env.OMDB_API_KEY

    if (!url || !apiKey) {
        throw new Error('OMDB_URL y OMDB_API_KEY deben estar definidos en las variables de entorno.');
    }

    request.apikey = apiKey

    const response = await axios.get<BuscarPeliculaResponse>(url, { params: request })

    if (response == null) throw new Error('OMDB_URL o OMDB_API_KEY fallo en la consulta.');

    return response.status === 200 ? response.data : { Response: '', Search: [], totalResults: '0' }
}

export const getPeliculaImdbID = async (request: BuscarRequest) => {
    const url = process.env.OMDB_URL
    const apiKey = process.env.OMDB_API_KEY

    if (!url || !apiKey) {
        throw new Error('OMDB_URL y OMDB_API_KEY deben estar definidos en las variables de entorno.');
    }

    request.apikey = apiKey

    const response = await axios.get<PeliculaResponse[]>(url, { params: request })

    if (response == null) throw new Error('OMDB_URL o OMDB_API_KEY fallo en la consulta.');

    return response.status === 200 ? response.data : []
}