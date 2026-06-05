import type { Reserva } from "../models";
import { Box, Card, CardContent, Paper, Typography } from "@mui/material";

interface CardProps {
  reserva: Reserva;
}

export function ReservaCard({ reserva }: CardProps) {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{
        minWidth: 250,
        maxWidth: 300,
        flexShrink: 0, 
        scrollSnapAlign: "start",
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: .5, p: 1 }}
      >
        {/* Cabeçalho do Card */}
        <Box sx={{ borderBottom: "1px solid #e2e8f0", pb: 1, mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "capitalize",
              color: "primary",
              fontWeight: "bold",
            }}
          >
            {reserva.nome}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Doc: {reserva.documento}
          </Typography>
        </Box>

        {/* Datas */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#f8fafc",
            p: 1.5,
            borderRadius: 1,
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Check-in
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {reserva.checkin.toString()}
            </Typography>
          </Box>
          <Box sx={{textAlign:"right"}}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block" }}
            >
              Check-out
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {reserva.checkout.toString()}
            </Typography>
          </Box>
        </Box>

        {/* Valor Total */}
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Valor Total:
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            R$ {reserva.valorReserva}
          </Typography>
        </Box>

        {/* Histórico de Pagamentos (Opcional - só mostra se houver) */}
        {reserva.pagamentos && reserva.pagamentos.length > 0 && (
          <Box
            sx={{ mt: 1, p: 1, border: "1px dashed #cbd5e1", borderRadius: 1 }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontWeight: "bold",
                display: "block",
                mb: 0.5,
              }}
            >
              Parcelas:
            </Typography>
            {reserva.pagamentos.map((pagamento) => (
              <Typography
                key={pagamento.parcela}
                variant="caption"
                sx={{ textTransform: "capitalize", display: "block" }}
              >
                • Parcela {pagamento.parcela}: R$ {pagamento.valorPagamento}
              </Typography>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
