//Esta funcion encargada de obtener el total suma el resultado del total 
// con la operacion del calculo del iva con el 12%
export const total = (subtotal: number, iva: number): number => {
    return subtotal + iva;
};