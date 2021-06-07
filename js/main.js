// VARIABLES
let productos = [];
let carrito = [];
let storageValores = localStorage.storageCarrito;

let cantidadProductosCarrito = document.getElementById('cantidadProductosCarrito');

let categoriaFiambreras = 'fiambreras';
let categoriaExpositores = 'expositores';
let categoriaTarrinas = 'tarrinas'; 
let categoriaBandeja260 = 'bandeja260'; 
let categoriaBandeja180 = 'bandeja180'; 
let categoriaBolsaUnKg = 'bolsaUnKg'; 
let categoriaBolsa250 = 'bolsa250'; 
let categoriaBolsa500 = 'bolsa500'; 
let categoriaBolsa45 = 'bolsa45.5'; 
let categoriaJelly = 'jelly'; 
let categoriaBolsa100 = 'bolsa100'; 
let categoriaBolsa80 = 'bolsa80'; 
let categoriaAlmendra = 'almendra'; 
let categoriaChocolatesTurcos = 'chocolatesTurcos'; 
let categoriaEstuches = 'estuches';
let categoriaPringles = 'pringles';  
let categoriaMasmelos = 'masmelos'; 
let categoriaDipper = 'dipper';


let tabFiambreras = document.getElementById('fiambreras-tab');
let tabExpositores = document.getElementById('expositores-tab');
let tabTarrinas = document.getElementById('tarrinas-tab');
let tabBandeja260 = document.getElementById('bandeja260-tab');
let tabBandeja180 = document.getElementById('bandeja180-tab');
let tabBolsaUnKg = document.getElementById('bolsaUnKg-tab');
let tabBolsa250 = document.getElementById('bolsa250-tab');
let tabBolsa500 = document.getElementById('bolsa500-tab');
let tabBolsa45 = document.getElementById('bolsa45-tab');
let tabJelly = document.getElementById('jelly-tab');
let tabBolsa100 = document.getElementById('bolsa100-tab');
let tabBolsa80 = document.getElementById('bolsa80-tab');
let tabAlmendra = document.getElementById('almendra-tab');
let tabChocolatesTurcos = document.getElementById('chocolatesTurcos-tab');
let tabEstuches = document.getElementById('estuches-tab');
let tabPringles = document.getElementById('pringles-tab');
let tabMasmelos = document.getElementById('masmelos-tab');
let tabDipper = document.getElementById('dipper-tab');


let seccionFiambreras = document.getElementById('fiambreras');
let seccionExpositores = document.getElementById('expositores');
let seccionTarrinas = document.getElementById('tarrinas');
let seccionBandeja260 = document.getElementById('bandeja260');
let seccionBandeja180 = document.getElementById('bandeja180');
let seccionBolsaUnKg = document.getElementById('bolsaUnKg');
let seccionBolsa250 = document.getElementById('bolsa250');
let seccionBolsa500 = document.getElementById('bolsa500');
let seccionBolsa45 = document.getElementById('bolsa45');
let seccionJelly = document.getElementById('jelly');
let seccionBolsa100 = document.getElementById('bolsa100');
let seccionBolsa80 = document.getElementById('bolsa80');
let seccionAlmendra = document.getElementById('almendra');
let seccionChocolatesTurcos = document.getElementById('chocolatesTurcos');
let seccionEstuches = document.getElementById('estuches');
let seccionPringles = document.getElementById('pringles');
let seccionMasmelos = document.getElementById('masmelos');
let seccionDipper = document.getElementById('dipper');

// OBJETOS
class Producto {
    constructor(id, nombre, descripcion, categoria, precio, imagen, stock, cantidadCompra) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = stock; 
        this.cantidadCompra = cantidadCompra;
    }
}

// Inicializar DATA
function buscarProductosEnBD() {
    let productosBD = [];
    $.ajax({
        async: false,
        global: false,
        url: "base-de-datos/productos.json",
        dataType: "json",
        success: (data) => {
            data.forEach((product) => {
                let NuevoProducto = new Producto(
                    product.id,
                    product.nombre,
                    product.descripcion,
                    product.categoria,
                    product.precio,
                    product.imagen,
                    product.stock,
                    product.cantidadCompra
                );
                productosBD.push(NuevoProducto);
            });
        },
        error: (error) => {
            console.log('Error AJAX: ', error);
        }
    });
    return productosBD;
}

productos = buscarProductosEnBD();

// FUNCION PARA MOSTRAR LAS CARDS 
function mostrarProductos(categoria) {
    let cards = "";
    let productosAMostrar = productos.filter(elemento => elemento.categoria === categoria);
    productosAMostrar.forEach(element => {
        cards += `
        <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 text-center">
            <div class="card mb-3">
                <img src=${element.imagen} class="card-img-top img-card" alt="${element.nombre}">
                <div class="card-body">
                    <h6 class="card-title">${element.nombre}</h6>                    
                    <p class="card-text">$${element.precio}</p>
                </div>
                <div class="card-footer">
                    <button type="submit" class="btn btn-info" onclick="identificarProducto(${element.id})">Agregar al carrito</button>
                </div>
            </div>
        </div>`;
    });
    return cards;
}

// VALIDAR LOCAL STORAGE
const validarLocalStorage = () => {
    if(storageValores === undefined) {
        carrito = [];
    } else {
        carrito = JSON.parse(storageValores);
    }
}

// FUNCION PARA MOSTRAR SECCION SELECCIONADA
function generarSeccion(seccion, categoria) {
    seccion.innerHTML = mostrarProductos(categoria);
}

// IDENTIFICA ID DEL PRODUCTO Y AGREGA EL ID CARRITO
function identificarProducto(identificadorProducto) {
    const productoBuscado = productos.find((producto) => producto.id === identificadorProducto);
    agregarAlCarrito(productoBuscado);
    const alerta = document.getElementById('alertaAgregarAlCarrito');
    alerta.innerHTML = 
        `<div class="mt-2 alert alert-success" role="alert">
            ¡Se ha agregado un producto al carrito de compras!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`;
    cantidadEnCarrito(); //funcion creada en menu.js
}

// FUNCION PARA MOSTRAR CANTIDAD DE PRODUCTOS EN CARRITO DE COMPRAS
function cantidadEnCarrito() {
    cantidadProductosCarrito.innerHTML = carrito.length;
};




// VALIDAR SI EL PRODUCTO DEL CARRITO SE REPITE
function validarProductoCarrito (identificadorProducto) {
    const producto = carrito.find((item) => item.id === identificadorProducto);
    return producto;
}

// AGREGAR AL CARRITO
function agregarAlCarrito(producto) {
    const productoCarrito = validarProductoCarrito(producto.id);
    if (productoCarrito) {
        productoCarrito.cantidadCompra += 1; 
        localStorage.setItem('storageCarrito', JSON.stringify(carrito));
    } else {
        producto.cantidadCompra = 1;
        carrito.push(producto);
        localStorage.setItem('storageCarrito', JSON.stringify(carrito));
    }
}

// EVENTO: click sobre la categoria
function eventoClick(tab, seccion, nombreCategoria){
    tab.addEventListener("click", function(){
        seccion.innerHTML = mostrarProductos(nombreCategoria);
    });
}

// EVENTOS SECCION "TORTAS Y POSTRES"
eventoClick(tabFiambreras, seccionFiambreras, categoriaFiambreras);
eventoClick(tabExpositores, seccionExpositores, categoriaExpositores);
eventoClick(tabTarrinas, seccionTarrinas, categoriaTarrinas);
eventoClick(tabBandeja260, seccionBandeja260, categoriaBandeja260);
eventoClick(tabBandeja180, seccionBandeja180, categoriaBandeja180);
eventoClick(tabBolsaUnKg, seccionBolsaUnKg, categoriaBolsaUnKg);
eventoClick(tabBolsa250, seccionBolsa250, categoriaBolsa250);
eventoClick(tabBolsa500, seccionBolsa500, categoriaBolsa500);
eventoClick(tabBolsa45, seccionBolsa45, categoriaBolsa45);
eventoClick(tabJelly, seccionJelly, categoriaJelly);
eventoClick(tabBolsa100, seccionBolsa100, categoriaBolsa100);
eventoClick(tabBolsa80, seccionBolsa80, categoriaBolsa80);
eventoClick(tabAlmendra, seccionAlmendra, categoriaAlmendra);
eventoClick(tabChocolatesTurcos, seccionChocolatesTurcos, categoriaChocolatesTurcos);
eventoClick(tabEstuches, seccionEstuches, categoriaEstuches);
eventoClick(tabPringles, seccionPringles, categoriaPringles);
eventoClick(tabMasmelos, seccionMasmelos, categoriaMasmelos);
eventoClick(tabDipper, seccionDipper, categoriaDipper);

// LLAMAR FUNCIONES 
generarSeccion(seccionFiambreras, categoriaFiambreras);
validarLocalStorage();
cantidadEnCarrito();
