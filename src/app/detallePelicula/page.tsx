"use client"
import React, { useEffect } from "react"
import { Card, CardBody, CardFooter, CardHeader, Chip, Badge, Image, Link, Button, Divider, Spinner } from "@nextui-org/react"
import { BuscarRequest } from "@/models/request"
import { getPeliculaImdbID } from '@/api/apiOmdb'
import usebuscarStore from '@/store/buscarStore'
import usePeliculaState from '@/store/PeliculaStore'

export default function DetallePelicula() {

    const { imdbID, cargandoDetalle, setCargandoDetalle } = usebuscarStore()

    const { selectPelicula, setSelectPelicula } = usePeliculaState()

    useEffect(() => {
        setCargandoDetalle(true)

        const request: BuscarRequest = {
            i: imdbID,
            plot: 'full'
        }

        getPeliculaImdbID(request).then(result => {
            if (result) setSelectPelicula(result)
            setCargandoDetalle(false)
        })
    }, [imdbID, setSelectPelicula, setCargandoDetalle]);

    return (
        <div>
            <div>
                <h1 className="font-bold text-inherit m-4">Detalles de la pelicula</h1>
            </div>
            {cargandoDetalle ? (
                <Spinner label="Cargando detalle en OMDb..." color="warning" />
            ) : (selectPelicula != null &&
                (<Card shadow="none" className="border-none bg-transparent">
                    <CardHeader className="justify-between">
                        <div className="flex gap-3">
                            <Image
                                isZoomed
                                width={240}
                                alt={selectPelicula?.Title}
                                src={selectPelicula?.Poster}
                            />
                            <div className="flex flex-col items-start text-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{selectPelicula?.Title}</h4>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Año: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Year}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Clasificación: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Rated}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Duración:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Runtime}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Género: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Genre}</h5></div>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Director: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Director}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Guionista:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Writer}</h5></div>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Actores: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Actors}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Idioma: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Language}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>País:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Country}</h5></div>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Lanzamiento: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Released}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Premios: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Awards}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Box Office:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.BoxOffice}</h5></div>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Producción: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Production}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Metascore: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Metascore}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>IMDb Rating:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.imdbRating}</h5></div>
                                </div>
                                <Divider className="my-4" />
                                <div className="flex h-5 m-2 items-center space-x-4 text-small">
                                    <div>Votos IMDb: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.imdbVotes}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Tipo: <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Type}</h5></div>
                                    <Divider orientation="vertical" />
                                    <div>Website:  <h5 className="text-small tracking-tight text-default-500">{selectPelicula?.Website}</h5></div>
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardBody className="px-3 py-0">
                        <p className="text-small pl-px text-default-500 text-justify">
                            {selectPelicula?.Plot}
                        </p>
                    </CardBody>
                    <CardFooter className="flex gap-4">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-600 text-small">Ratings:</p>
                        </div>
                        {selectPelicula?.Ratings?.map((item, index) => (
                            <Badge content={item.Value} color="danger" size="sm" key={index}>
                                <Chip className="m-1">{item.Source}</Chip>
                            </Badge>
                        ))}
                    </CardFooter>

                </Card>)
            )}

            <Link href="/">
                <Button size="sm">Regresar a la Busqueda</Button>
            </Link>
        </div>
    );
}