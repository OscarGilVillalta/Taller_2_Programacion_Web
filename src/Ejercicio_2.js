const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());


// Sample data
const tarifas = {
    elsalvador: 1.50,
    guatemala: 2.00,
    honduras: 2.25,
    nicaragua: 2.50,
    costarica: 3.00,
    panama: 3.50
};

function calcularEnvio(pais, peso) {
    const tarifa = tarifas[pais];

    let subtotal = tarifa * peso;
    let descuento = 0;
    let recargo = 0;

    // Validaciones
    if (peso > 20) {
        descuento = subtotal * 0.10;
    }

    if (peso < 1) {
        recargo = 5;
    }

    const total = subtotal - descuento + recargo;

    return {
        pais: pais,
        peso: peso,
        tarifa: tarifa,
        subtotal: subtotal,
        descuento: descuento,
        recargo: recargo,
        total: total
    };
}
// GET endpoint to retrieve all items
app.get("/api/envio/:pais/:peso", (req, res) => {

    try {

        const pais = req.params.pais.toLowerCase();
        const peso = Number(req.params.peso);

        // Validar el pais
        if (!tarifas[pais]) {
            return res.status(404).json({
                error: "El país ingresado no está permitido o no existe."
            });
        }

        // Validar el peso
        if (Number.isNaN(peso)) {
            return res.status(404).json({
                error: "El peso debe ser numérico."
            });
        }

        // El peso tiene que ser mayor a 0
        if (peso <= 0) {
            return res.status(404).json({
                error: "El peso debe ser mayor a 0."
            });
        }

        const resultado = calcularEnvio(pais, peso);

        res.json(resultado);

    } catch (error) {

        res.status(404).json({
            error: "Ocurrió un error al calcular el envío."
        });

    }

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});