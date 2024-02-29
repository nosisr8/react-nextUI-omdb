import { FC } from "react";
import { Card, CardHeader, CardBody, Image, Code, Divider, Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { BuscarPeliculaResponse } from "@/models/responses"
import { getPeliculaImdbID } from '@/api/apiOmdb'
import { BuscarRequest } from "@/models/request"
import { DetalleCard } from "@/components/detalleCard";
import usebuscarStore from '@/store/buscarStore'
import usePeliculaState from '@/store/PeliculaStore'

export interface PeliculaCardProps {
    pelicula: BuscarPeliculaResponse;
}

export const PeliculaCard: FC<PeliculaCardProps> = ({
    pelicula
}) => {
    const isResponse = pelicula.Response === 'True'

    const { imdbID, setImdbID } = usebuscarStore()

    const { selectPelicula, setSelectPelicula } = usePeliculaState()

    const clickPelicula = (id: string) => {

        setImdbID(id)

        const request: BuscarRequest = {
            i: id
        }

        getPeliculaImdbID(request).then(result => {
            console.log("🚀 ~ getPelicula ~ result:", result)
            if (result) setSelectPelicula(result)
        })
    };

    return (
        <div>
            <Divider className="my-4" />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
                {isResponse && (
                    pelicula.Search.map((item, index) => (
                        <Card className="py-4" key={index} isPressable onPress={() => clickPelicula(item.imdbID)}>
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">{item.Type}</p>
                                <small className="text-default-500">{item.Rated}</small>
                                <h4 className="font-bold text-large">{item.Title}</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Popover showArrow placement="bottom">
                                    <PopoverTrigger>
                                        <Image
                                            isZoomed
                                            alt={item.Title}
                                            className="object-cover rounded-xl"
                                            src={item.Poster}
                                            width={270}
                                            height={500}
                                            onClick={() => clickPelicula(item.imdbID)}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="p-1">
                                        <DetalleCard selectPelicula={selectPelicula[0]} />
                                    </PopoverContent>
                                </Popover>
                            </CardBody>
                        </Card>
                    ))
                )}

                {!isResponse && (
                    <Code color="danger">{pelicula?.Error}</Code>
                )}

            </div>
            <Divider className="my-4" />
        </div>
    );
}

