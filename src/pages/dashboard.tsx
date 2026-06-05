import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Box, Card } from "@mui/material";
import type { Pagamento, Reserva } from "../models";
import { ReservaCard } from "../components/card";
import { Carousel } from "../components/carousel";

export function Dashboard() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [pagAtual, setPagAtual] = useState(0);

  const [paginas, setPaginas] = useState(0);
  const [elements, setElements] = useState(0);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
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
        const totalElements = response.data.totalElements;

        console.log(response);
        const reservasData = response.data.content;
        setReservas(reservasData);
        setElements(totalElements);
        setPaginas(totalPages);
      } catch (err) {
        throw new Error("Não foi possível listar as reservas!");
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
