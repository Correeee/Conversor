////////////////SONIDO///////////////////////////

let sonido = new Audio("multimedia/sonido/notification.mp3")

////////////////VARIABLES////////////////////////

let oficial_venta = document.getElementById("oficial_venta")
let oficial_compra = document.getElementById("oficial_compra")
let blue_venta = document.getElementById("blue_venta")
let blue_compra = document.getElementById("blue_compra")

let input_pesos = document.getElementById("input_pesos");
let input_dolares = document.getElementById("input_dolares");

let btn_cambio = document.getElementById("btn_cambio")

let dolar_oficial_compra;
let dolar_oficial_venta;
let dolar_blue_compra;
let dolar_blue_venta;

function api(){
    fetch('https://api.bluelytics.com.ar/v2/latest'/*, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
        }
    }*/)
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        dolar_oficial_compra = data.oficial.value_buy.toFixed(2);
        dolar_oficial_venta = data.oficial.value_sell.toFixed(2);
        dolar_blue_compra = data.blue.value_buy.toFixed(2);
        dolar_blue_venta = data.blue.value_sell.toFixed(2);

        oficial_compra.innerText = "$" + dolar_oficial_compra
        oficial_venta.innerText = "$" + dolar_oficial_venta
    
        blue_compra.innerText = "$" + dolar_blue_compra
        blue_venta.innerText = "$" + dolar_blue_venta

        input_pesos.placeholder=`ARS ${dolar_blue_venta}`;
        input_dolares.placeholder= "USD 1.00";
      // Aquí puedes usar los datos recibidos
    })
    .catch(error => console.error(error));
}


setInterval(api , 100);


function calculadora(){

        input_pesos.addEventListener("keyup" , function(e){

            let input_dolares = document.getElementById("input_dolares")
            // console.log(input_dolares.value)

            input_pesos = parseFloat(e.target.value);

            let compra_dolares_blue = input_pesos / dolar_blue_venta; //OPERACIÓN

            compra_dolares_blue = parseFloat(compra_dolares_blue.toFixed(2))

            console.log("RESULTADO:" , compra_dolares_blue)

            input_dolares.value = compra_dolares_blue
            
            input_dolares.value = Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(compra_dolares_blue)

            if(input_dolares.value == "$" + NaN){
                input_dolares.value = ""
            }

            console.log("INPUT PESOS:" , input_pesos)
            console.log("INPUT DÓLARES:" , input_dolares.value)            

        })

        
        input_dolares.addEventListener("keyup" , function(e){
            let input_pesos = document.getElementById("input_pesos")
            // console.log(input_pesos.value)
            input_dolares = parseFloat(e.target.value);

            let venta_dolares_blue = input_dolares * dolar_blue_compra;  //OPERACIÓN

            venta_dolares_blue = parseFloat(venta_dolares_blue.toFixed(2))
            
            input_pesos.value = venta_dolares_blue
            
                input_pesos.value = Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "ARS"
                }).format(venta_dolares_blue)

                if(input_pesos.value == "ARS" + NaN){
                    input_pesos.value = ""
                }

            console.log("INPUT PESOS:" , input_pesos.value)
            console.log("INPUT DÓLARES:" , input_dolares)        
        })

}


function notificaciones(){

    input_pesos.addEventListener("focusout" , function(e){
        let input_dolares = document.getElementById("input_dolares")
        input_pesos = e.target.value

        if(input_pesos > 0){
        Toastify({
            text: `${input_pesos} ARS convertidos a ${input_dolares.value}`,
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #457b9d, #457b9d)",
            }      
            }).showToast();
            sonido.play()
            sonido.currentTime = 0;
        }
    })

    input_dolares.addEventListener("focusout" , function(e){
        let input_pesos = document.getElementById("input_pesos")
        input_dolares = e.target.value
        if(input_dolares > 0){
        Toastify({
            text: `${input_dolares} USD convertidos a ${input_pesos.value}`,
            duration: 5000,
            style: {
                background: "linear-gradient(to right, #52b788, #52b788)",
            }
            }).showToast();
            sonido.play()
            sonido.currentTime = 0;
        }
    })
}


function limpiar_input(){

    form.addEventListener("focusout" , function(e){
        form.reset()
    })
}
notificaciones();
limpiar_input()
calculadora();