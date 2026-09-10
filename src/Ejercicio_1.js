const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get("/api/calculoIVA/:monto", (req, res) => {

    const monto = Number(req.params.monto);

    if (isNaN(monto)) {
        return res.status(400).json({
            error: "El monto debe ser numerico."
        });
    }

    if (monto === 0) {
        return res.status(400).json({
            error: "El monto no puede ser igual a 0."
        });
    }

    if (monto < 0) {
        return res.status(400).json({
            error: "El monto no puede ser negativo."
        });
    }

    const iva = monto * 0.13;
    const renta = monto * 0.10;

    res.json({
        monto: monto,
        iva: iva,
        renta: renta
    });
});

app.listen(port, () => {
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});