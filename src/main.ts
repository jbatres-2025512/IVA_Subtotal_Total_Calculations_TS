import * as readline from "readline/promises";
import { iva } from "./functions/calculateIvaTax.js";
import { subtotal } from "./functions/calculateSubtotal.js";
import { total } from "./functions/calculateTotal.js";


//Esta constante permite recibir datos que ingresen los usuarios
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Esto permite ingresar varias
const prices: number[] = [];
const taxRate = 0.12;

//En la funcion del menu se mostraran las opciones en terminal para luego recibir una respuesta del usuaro
const mainMenu = async (): Promise<void> => {

    console.log(" ");
    console.log("Bienvenido a la calculadora del IVA sobre un producto");
    console.log("MENU");
    console.log("1. Agregar un monto");
    console.log("2. Generar la factura final del precio del producto");
    console.log("3. Generar ejemplo de una factura")
    console.log("4. Salir");

    console.log(" ");
    const option = await rl.question("Que desea hacer: ");

    const optionNumber = parseInt(option);


    //Dependiendo de la respuesta se pasa a un switch en el cual un caso permite ingresar el precio
    //Y en el otro caso se genera una factura con todos los calculos
    switch (optionNumber) {
        case 1:
            console.log(" ");

            //Estas variables se usan para poder validar  los precios que se ingresen
            let validPrice = false; //Este se usa como verificador de que se cumplan las condiciontes
            let price: number = 0;//Se utiliza este valor como defecto para poder validarlo el que se ingrese despues

            /*
            Entra en un ciclo para recibir el precio que ingrese el usuario
            para luego pasar ese mismo precio por validaciones para que no sea
            texto ni un valor negativo.
            */
            while (!validPrice) {
                const input = await rl.question("Ingrese el precio: ");
                price = parseFloat(input);
                if (isNaN(price) || price<0) {
                    console.log("Debe ingresar un numero que no sea negativo");
                //Luego de que el precio sea valido sale del ciclo y se guarda en un arreglo con todos los precios agregados
                } else {
                    validPrice = true;
                }
            }
            
            prices.push(price);
            console.log(" ");
            console.log("El precio se agrego correctamente");
            //Y por ultimo regresar al menu otra vez
            await mainMenu();
            break;
        case 2:
            //En el segundo caso ya se llama a la logica para cada uno de los calculos
            //Pasando por medio de uan validacion para verificar que si exista un precio
            //Y si este no existe regresara al menu.
            if (prices.length === 0) {
                console.log(" ");
                console.log("No hay precios agregados aun");
                await mainMenu();
                break;
            }
            
            //Luego se crean variables para almacenar el resultado de pasar
            //El precio por las funciones de los calculos
            const sub = subtotal(prices);
            const calculatedTax = iva(sub, taxRate);
            const finalTotal = total(sub, calculatedTax);
            //Para finalmente generar una factura con el resultado de cada calculo
            console.log(" ");
            console.log("|------------ CHECK ----------|");
            console.log(`|Subtotal: Q${sub.toFixed(2)}|`);
            console.log(`|IVA (${taxRate * 100}%): Q${calculatedTax.toFixed(2)}|`);
            console.log(`|Total: Q${finalTotal.toFixed(2)}|`);
            console.log("------------------------|");
            prices.length = 0;
            //Y terminar regresano al menu
            await mainMenu();
            break;
        case 3:
            
            
            //Ejemplo de prueba con datos simulados para verificar que los calculos sean correctos
            const examplePrices = [150.50, 320.00, 89.99];
            const exampleSubtotal = subtotal(examplePrices);
            const exampleTax = iva(exampleSubtotal, taxRate);
            const exampleTotal = total(exampleSubtotal, exampleTax);
            console.log("Prueba con datos simulados:");
            console.log(`Subtotal: Q${exampleSubtotal.toFixed(2)}`);
            console.log(`IVA: Q${exampleTax.toFixed(2)}`);
            console.log(`Total: Q${exampleTotal.toFixed(2)}`);
            await mainMenu();
            break;
        case 4:
            //Con esta opcion se cierra el readline por lo que se terminaria la ejecucion del programa
            console.log(" ");
            console.log("Saliendo...");
            rl.close();
            break
        default:
            console.log(" ");
            console.log("Esta opcion no existe")
            await mainMenu();
            break;
    }
}

//Se inicializa la funcion del menu con todas las opciones
mainMenu();