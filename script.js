fetch("./productos.json")
    .then(respuesta => respuesta.json())
    .then(productos => {
        ejecutarPrograma(productos)
    })

function ejecutarPrograma(productos) {
let carrito = []
let botonAgregar = document.getElementById("boton")

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    mostratrCarrito(carrito)
    }

verProductos(productos)

    function verProductos(Productos) {
        let contenedor = document.getElementById("tablaDeProductos")
        contenedor.innerHTML = ""
        Productos.forEach(producto => {
            let tarjetaProducto = document.createElement("div")
             tarjetaProducto.className = "tarjetaProducto"
  
    tarjetaProducto.innerHTML = `
        <h2 class=tituloProducto>${producto.nombre}</h2>
        <div class=imagen style="background-image: url(${producto.img})"></div>
        <p class=textoTarjeta>Clase: ${producto.clase}</p>
        <p class=textoTarjeta>Precio por unidad: $ ${producto.precio}</p>
        <button id=${producto.id}> Agregar al carrito </button>
    `
    contenedor.appendChild(tarjetaProducto)

        let boton = document.getElementById(producto.id)
        boton.onclick = agregar
        
        })
    }
function popUp() {
    Swal.fire(
        '!Muchas Gracias!',
        ' PYa podes pasar a buscar los productos.',
        'success'
      )}

function mostratrCarrito(Productos) {
    let carritoDOM = document.getElementById("carrito")
    carritoDOM.innerHTML = ""
    Productos.forEach(producto => {
        let tarjetacarrito = document.createElement("div")
        tarjetacarrito.className = "tarjetacarrito"
        
    tarjetacarrito.innerHTML += `
        <h2> PRODUCTO:${producto.nombre}</h2>
        <p> CANTIDAD: ${producto.cantidad} </p>
        <p> TOTAL EN EFECTIVO: ${producto.precioEnEfectivo} </p>
        `
    carritoDOM.appendChild(tarjetacarrito)
    
    })
  }

function notificacionAgregar (){
    Toastify({
        text: "Agregaste al carrito",
        duration: 2000,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        }).showToast();

}

function agregar(e) {
    let productoSelecionado = productos.find(producto => producto.id === Number(e.target.id))
        if (carrito.some(producto => producto.id == productoSelecionado.id)) {
            let pos = carrito.findIndex(producto => producto.id == productoSelecionado.id)  
            carrito[pos].cantidad++
            carrito[pos].precioEnEfectivo = carrito[pos].precio * carrito[pos].cantidad
            carrito[pos].precioEnTarjeta = (carrito[pos].precio * carrito[pos].cantidad)*1.10
    } 
        else {
            carrito.push({
            id: productoSelecionado.id,
            nombre: productoSelecionado.nombre,
            precio: productoSelecionado.precio,
            cantidad: 1,
            precioEnEfectivo: productoSelecionado.precio,
            precioEnTarjeta: productoSelecionado.precio
      })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))

    mostratrCarrito(carrito)
    notificacionAgregar()
}

let boton = document.getElementById("comprar")
boton.onclick = comprar
boton.addEventListener("click", popUp)

function comprar() {
    if (carrito.length != 0) {
        localStorage.clear()
        carrito = []
        mostratrCarrito(carrito)  
    }
    
}

let productoBuscado = document.getElementById("buscar")
productoBuscado.addEventListener("click", fBuscar) 

function fBuscar(e) {
    let buscador = document.getElementById("buscador").value.toLowerCase()
    let resultado = productos.filter(producto => producto.nombre.toLowerCase() .includes(buscador))
    verProductos(resultado)
}
}