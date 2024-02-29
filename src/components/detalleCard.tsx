import React, { useEffect } from "react";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Badge, ScrollShadow, Link } from "@nextui-org/react";
import { BuscarRequest } from "@/models/request"
import { getPeliculaImdbID } from '@/api/apiOmdb'
import usebuscarStore from '@/store/buscarStore'
import usePeliculaState from '@/store/PeliculaStore'

export const DetalleCard = () => {

    const { imdbID } = usebuscarStore()

    const { selectPelicula, setSelectPelicula } = usePeliculaState()

    useEffect(() => {
        const request: BuscarRequest = {
            i: imdbID
        }

        getPeliculaImdbID(request).then(result => {
            if (result) setSelectPelicula(result)
        })
      }, [imdbID, setSelectPelicula]);

    return (
        <div>
        {selectPelicula != null && (
            <Card shadow="none" className="max-w-[300px] border-none bg-transparent">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Avatar isBordered radius="full" size="md" src={selectPelicula?.Poster} />
                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{selectPelicula?.Title}</h4>
                        <h5 className="text-small tracking-tight text-default-500">Duración: {selectPelicula?.Runtime}</h5>
                    </div>
                </div>
                <Link href="/detallePelicula" size="sm">Ver más</Link>
            </CardHeader>
            <CardBody className="px-3 py-0">
                <p className="text-small pl-px text-default-500 justify-center">
                {selectPelicula?.Plot}
                </p>
            </CardBody>
            <CardFooter className="flex gap-3">
                <ScrollShadow orientation="horizontal">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-600 text-small">Ratings:</p>
                    </div>
                    {selectPelicula?.Ratings?.map((item, index) => (
                        <Badge content={item.Value} color="danger" size="sm" key={index}>
                            <Chip className="m-1">{item.Source}</Chip>
                        </Badge>
                    ))}
                </ScrollShadow>
                
            </CardFooter>
        </Card>
        )}
        </div>
    );
};