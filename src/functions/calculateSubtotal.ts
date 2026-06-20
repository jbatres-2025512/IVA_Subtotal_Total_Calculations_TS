//Esta funcion encargada del calculo del subtotal suma todos los precios ingresados
//sumandose despues al total de la factura final
export const subtotal = (prices: number[]): number => {
    let total = 0;
    for (const price of prices) {
        total += price;
    }
    return total;
};