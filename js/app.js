let stock = [];
let prodctosAComprar = [];
//clase constructora
class Ropa {

    constructor(id, titulo, descripcion, precio, imagen){
        this.id = id,
        this.titulo = titulo,
        this.descripcion = descripcion,
        this.precio = precio,
        this.imagen = "./img/default.png"
    }

}

const ropa1 = new Ropa(1,"Remera", "remera blanca de la marca adidas", "250", "./img/default.png");
const ropa2 = new Ropa(2,"Remera Negra", "remera negra de la marca nike para deporte", "1000", "./img/default.png");
const ropa3 = new Ropa(3,"Pantalon", "pantalon jean de clor negro", "8000", "./img/default.png");
const ropa4 = new Ropa(4,"buzo", "buzo de clor negro", "15000", "./img/default.png");


if(localStorage.getItem("stock")){
    stock = JSON.parse(localStorage.getItem("stock"));
}else{stock.push(ropa1,ropa2,ropa3, ropa4);
localStorage.setItem("stock", JSON.stringify(stock));
}
let producosStock = document.getElementById("productos");
function agregarProd(array){
    producosStock.innerHTML = "";
    array.forEach((ropa)=>{
        let productoNuevo = document.createElement("div");
        productoNuevo.innerHTML = `<div id="cuerpoCard" class="card cardOscuta" style="width: 18rem;">
                                <img src="${ropa.imagen}" class="card-img-top" alt="${ropa.titulo}">
                                <div class="card-body">
                                <h4 class="card-title">${ropa.titulo}</h4>
                                <p class="card-text">${ropa.descripcion}</p>
                                <p class="">Precio: ${ropa.precio} </p>
                                <a id="agregarbtn${ropa.id}" href="#" class="btn btn-primary agregarCarrito">Agregar al carrito</a>
                                </div>
        </div>`;
        producosStock.append(productoNuevo);

        let btnAgregar = document.getElementById(`agregarbtn${ropa.id}`);
        btnAgregar.addEventListener("click", ()=>{
            agregarAlCarrito(ropa);
        });
    })}

    /*let btnAgregarCarrito = document.getElementsByClassName("agregarCarrito");
    for(let compra of btnAgregarCarrito){
        compra.addEventListener("click", ()=>{
            alert("Peoducto Agregado al carrito")
        })
    }
    }*/

    function agregarAlCarrito(ropa){
        prodctosAComprar.push(ropa);
        console.log(prodctosAComprar)
    }

function agregarRopa(array){
let tituloDePrendaAgregada = document.getElementById("tituloPrenda");
let descripcionDePrendaAgregada = document.getElementById("descripcionPrenda");
let precioDePrendaAgregada = document.getElementById("precioPrenda");
let prendaAgregada = new Ropa (stock.length+1,tituloDePrendaAgregada.value, descripcionDePrendaAgregada.value, parseInt(precioDePrendaAgregada.value), "./img/default.png");
array.push(prendaAgregada);
localStorage.setItem("stock", JSON.stringify(array));
tituloDePrendaAgregada.value = "";
descripcionDePrendaAgregada.value = "";
precioDePrendaAgregada.value = "";
agregarProd(array)
}

let continuarEdicionPrenda = document.getElementById("continuarEdicionPrenda");

continuarEdicionPrenda.addEventListener("click", ()=>{
    agregarRopa(stock)
})
let todo = document.getElementById("todo");
todo.addEventListener("click", ()=>{
    todo.className += " active";
    agregarProd(stock)
})

let botonDark = document.getElementById("btnDark");
let botonLight = document.getElementById("btnLight");
let modoDeTema;
let bgCardCarrito = document.getElementById("bgCardCarrito");

if(localStorage.getItem("modoOscuro")){
    modoDeTema = localStorage.getItem("modoOscuro");
}else{
    localStorage.setItem("modoOscuro", false);
}
if(modoDeTema == "true"){
    document.body.classList.add("temaOscuro");
    bgCardCarrito.classList.add("cardOscuta");
}else{
    document.body.classList.remove("temaOscuro");
    bgCardCarrito.classList.remove("cardOscuta");
}

botonDark.addEventListener("click", ()=>{ 
    localStorage.setItem("modoOscuro", true)
    document.body.classList.add("temaOscuro");
    bgCardCarrito.classList.add("cardOscuta");
});
botonLight.addEventListener("click", ()=>{
    localStorage.setItem("modoOscuro", false)
    document.body.classList.remove("temaOscuro");
    bgCardCarrito.classList.remove("cardOscuta");
});

let btnshop = document.getElementById("btnshop");
let modalBody = document.getElementById("modalBody");
let precioTotal = document.getElementById("precioTotal");
let finalizarCompra = document.getElementById("finalizarCompra");

function agregarPrendasEnCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((producto)=>{
        modalBody.innerHTML += `<div id="cardCarrito${producto.id}" class="card cardOscuta" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
        <div class="card-body">
          <h5 class="card-title">${producto.titulo}</h5>
          <p class="card-text">${producto.descripcion}</p>
          <p class="card-text">${producto.precio}</p>
          <a id="eliminarDelCarrito" href="#" class="btn btn-primary"><i class="fa-solid fa-trash"></i></a>
        </div>
      </div>`

    })
    sumaDeCompra(array)
}

function sumaDeCompra(array){
    let acumulador=0;
    acumulador = array.reduce((acumulador, prodctosAComprar)=>{ 
        return acumulador + prodctosAComprar.precio
    },0)
    if(acumulador == 0){
        precioTotal.innerHTML = `No hay productos en el carrito`
    }else {
        precioTotal.innerHTML = `El total de la compra es ${acumulador}`;
    }
    
}


btnshop.addEventListener("click", ()=>{
    agregarPrendasEnCarrito(prodctosAComprar)
});