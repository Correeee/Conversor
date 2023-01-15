
////////////////VARIABLES////////////////////////

let oficial_venta = document.getElementById("oficial_venta")
let oficial_compra = document.getElementById("oficial_compra")
let blue_venta = document.getElementById("blue_venta")
let blue_compra = document.getElementById("blue_compra")

let input_pesos = document.getElementById("input_pesos");
let input_dolares = document.getElementById("input_dolares");

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
        input_pesos = parseInt(e.target.value);
        let compra_dolares_blue = input_pesos / dolar_blue_venta;
        console.log(compra_dolares_blue)
        input_dolares.value = compra_dolares_blue
    })

    input_dolares.addEventListener("keyup" , function(e){
        input_dolares = parseInt(e.target.value);
        console.log(input_dolares)
        let venta_dolares_blue = input_dolares * dolar_blue_venta;
        console.log(venta_dolares_blue)
        input_pesos.value = venta_dolares_blue;
    })

}
calculadora();






