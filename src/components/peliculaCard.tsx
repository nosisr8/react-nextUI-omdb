import { FC } from "react";
import { Card, CardHeader, CardBody, Image, Code, Divider, Popover, PopoverTrigger, PopoverContent, Button, Link } from "@nextui-org/react";
import { BuscarPeliculaResponse } from "@/models/responses"
import { DetalleCard } from "@/components/detalleCard";
import usebuscarStore from '@/store/buscarStore'

export interface PeliculaCardProps {
    pelicula: BuscarPeliculaResponse;
}

export const PeliculaCard: FC<PeliculaCardProps> = ({
    pelicula
}) => {
    const isResponse = pelicula.Response === 'True'

    const { setImdbID } = usebuscarStore()

    return (
        <div>
            <Divider className="my-4" />
            <div className="gap-2 grid grid-cols-2 sm:grid-cols-5">
                {isResponse && (
                    pelicula.Search.map((item, index) => (
                        <Card className="py-4" key={index} isPressable onMouseEnter={() => setImdbID(item.imdbID)}>
                            <Link href="/detallePelicula" color="foreground">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <p className="text-tiny uppercase font-bold">{item.Type}</p>
                                    <small className="text-default-500">{item.Rated}</small>
                                    <h4 className="font-bold text-large">{item.Title}</h4>
                                </CardHeader>
                            </Link>
                            <CardBody className="overflow-visible py-2">
                                <Popover showArrow placement="bottom" backdrop="opaque">
                                    <PopoverTrigger>
                                        <Image
                                            isZoomed
                                            alt={item.Title}
                                            className="object-cover rounded-xl"
                                            src={item.Poster}
                                            width={270}
                                            height={500}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent className="p-1">
                                        <DetalleCard />
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