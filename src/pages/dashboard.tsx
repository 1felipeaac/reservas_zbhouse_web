import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box } from "@mui/material";
import type { Reserva } from "../models";
import { ReservaCard } from "../components/card";
import { Carousel } from "../components/carousel";

export function Dashboard() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [pagAtual, setPagAtual] = useState(0);

  const [paginas, setPaginas] = useState(0);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPagAtual(value);
  };

  useEffect(() => {
    async function listarReservas() {
      try {
        const response = await api.get(
          `/reservas/todos?page=${pagAtual - 1}&size=3`,
        );
        const totalPages = response.data.totalPages;

        console.log(response);
        const reservasData = response.data.content;
        setReservas(reservasData);
        setPaginas(totalPages);
      } catch (err: unknown) {
        throw new Error("Não foi possível listar as reservas!", { cause: err });
      }
    }
    listarReservas();
  }, [pagAtual]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 1024,
        mx: "auto",
        px: 3,
        py: 2,
      }}
    >
      <Carousel
        page={paginas}
        currentPage={pagAtual}
        onChangePage={handlePageChange}
        empty={reservas.length === 0}
      >
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaCard
              key={reserva.id + "-" + reserva.checkin}
              reserva={reserva}
            />
          ))
        ) : (
          <div> Não há reservas</div>
        )}
      </Carousel>
    </Box>
  );
}
