
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
    fetch('https://api.bluelytics.com.ar/v2/latest', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
        }
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);

        dolar_oficial_compra = parseInt(data.oficial.value_buy);
        dolar_oficial_venta = parseInt(data.oficial.value_sell);
        dolar_blue_compra = parseInt(data.blue.value_buy);
        dolar_blue_venta = parseInt(data.blue.value_sell);

        oficial_compra.innerText = "$" + dolar_oficial_compra
        oficial_venta.innerText = "$" + dolar_oficial_venta
    
        blue_compra.innerText = "$" + dolar_blue_compra
        blue_venta.innerText = "$" + dolar_blue_venta
      // Aquí puedes usar los datos recibidos
    })
    .catch(error => console.error(error));
}

setInterval(api , 100);


function calculadora(){
    
        input_pesos.addEventListener("keyup" , function(e){
            input_pesos = e.target.value;
            console.log("INPUT PESOS:" , input_pesos)
            console.log("INPUT DÓLARES:" , input_dolares.value)
            let compra_dolares_blue = input_pesos / dolar_blue_venta;
                input_dolares.value = compra_dolares_blue
        })

        
        input_dolares.addEventListener("keyup" , function(e){
            input_dolares = e.target.value;
            console.log("INPUT DÓLARES:" , input_dolares)
            console.log("INPUT PESOS:" , input_pesos.value)
            let venta_dolares_blue = input_dolares * dolar_blue_venta;
            input_pesos.value = venta_dolares_blue;
        })

}

calculadora();