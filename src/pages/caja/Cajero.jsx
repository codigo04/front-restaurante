import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

export const Cajero = () => {
  return (
    <div className="container mt-5">
      <Grid container spacing={4}>
        {/* Lista de Mesas */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" gutterBottom>
            Lista de Mesas por cobrar:
          </Typography>
          {[10, 9, 6].map((mesa) => (
            <Card
              key={mesa}
              sx={{
                mb: 2,
                borderRadius: 2,
                boxShadow: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  NUMERO DE MESA: {mesa}
                </Typography>
                <Typography variant="body2">
                  Orden por Cliente {mesa}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#ff6600", color: "#fff" }}
              >
                Cobrar
              </Button>
            </Card>
          ))}
        </Grid>

        {/* Detalle de Cobro */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Detalle de Cobro
          </Typography>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
              {/* Métodos de Pago */}
              <Typography variant="subtitle1" gutterBottom>
                Método de Pago:
              </Typography>
              <div className="d-flex mb-3">
                {["Yape", "Efectivo", "Plin", "Visa"].map((metodo) => (
                  <Button
                    key={metodo}
                    variant="outlined"
                    startIcon={
                      <span className="material-icons">
                        {metodo === "Yape" ? "qr" : "T"}
                      </span>
                    }
                    sx={{ mr: 1 }}
                  >
                    {metodo}
                  </Button>
                ))}
              </div>

              {/* Detalle del Pedido */}
              <Typography variant="subtitle1" gutterBottom>
                Detalle:
              </Typography>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  3x Pollo a la brasa
                  <span>s/120.00</span>
                </li>
              </ul>

              {/* Total a Pagar */}
              <Typography>Subtotal: s/98.40</Typography>
              <Typography>IGV (18%): s/21.60</Typography>
              <Typography variant="h6" fontWeight="bold">
                Monto Total a pagar: s/120.00
              </Typography>

              {/* Botón para Imprimir Comprobante */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#ff6600", color: "#fff" }}
              >
                Imprimir Comprobante
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};
