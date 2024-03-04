"use client";
import React from "react";
import { Input, Kbd, Pagination, Spinner } from '@nextui-org/react'
import { getPelicula } from '@/api/apiOmdb'
import { BuscarRequest } from "@/models/request"
import usebuscarStore from '@/store/buscarStore'
import usepeliculaStore from '@/store/buscarPeliculaStore'
import { SearchIcon } from "@/components/icons"
import { PeliculaCard } from "@/components/peliculaCard"

export default function Home() {

  const {
    inputBuscar,
    setInputBuscar,
    inputYear,
    setInputYear,
    page,
    setPage,
    paginacion,
    setPaginacion,
    cargando,
    setCargando,
  } = usebuscarStore()

  const { peliculaBuscar, setPeliculaBuscar } = usepeliculaStore()

  const handleSearch = async (pageNumber: number = page) => {
    setCargando(true)

    const request: BuscarRequest = {
      s: inputBuscar,
      y: inputYear,
      page: pageNumber
    }

    const result = await getPelicula(request)

    setCargando(false)

    if (result) {
      let totalPage = result.totalResults != '' ? Math.ceil(Number(result.totalResults) / 10) : 0

      setPaginacion(totalPage)

      if (result.Response === 'False') setPage(1)

      setPeliculaBuscar(result)
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const changePaginacion = (pageNumber: number) => {
    setPage(pageNumber)
    handleSearch(pageNumber)
  }

  const isResponseNull = peliculaBuscar.Response !== ''

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">

        <h1 className="font-bold text-inherit m-4">Buscar Peliculas</h1>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
          <Input
            aria-label="Buscar Pelicula"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            endContent={
              <Kbd className="hidden lg:inline-block">
                Enter
              </Kbd>
            }
            labelPlacement="outside"
            placeholder="Buscar pelicula Ej.: Logan"
            startContent={
              <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
            value={inputBuscar}
            onChange={(e) => setInputBuscar(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <Input
            aria-label="Año de la pelicula"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            endContent={
              <Kbd className="hidden lg:inline-block">
                Enter
              </Kbd>
            }
            labelPlacement="outside"
            placeholder="Año de la pelicula Ej.: 2017"
            type="text"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            onKeyDown={handleKeyDown}
          />

        </div>

        {cargando && (<Spinner label="Buscando en OMDb..." color="warning" />)}

        {isResponseNull && (
          <div>
            <PeliculaCard pelicula={peliculaBuscar} />

            {paginacion > 0 && (<Pagination className="m-4" onChange={changePaginacion} total={paginacion} initialPage={page} />)}
          </div>
        )}
      </div>
    </section>
  );
}