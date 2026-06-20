//Esta funcion se encarga del calculo del iva multiplicando el subtotal por el impuesto calculado
//Recibiendo el subtotal y la tasa, y devuelve el monto del IVA
export const iva = (subtotal: number, rate: number): number => {
    return subtotal * rate;
};