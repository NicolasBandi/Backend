(function () {
    const cards = document.getElementById('cards');
    const carts = document.getElementById('cart');

    const btnEliminar = document.getElementsByClassName('boton-eliminar');
    const btnActualizar = document.getElementsByClassName('boton-actualizar');
    const btnAgregar = document.getElementsByClassName('boton-agregar');
    const btnCarrito = document.getElementById('btn-carrito');
    const btnCreateCarrito = document.getElementById("create-carrito");

    const nombre = document.getElementById('input-nombre');
    const descripcion = document.getElementById('input-descripcion');
    const codigo = document.getElementById('input-codigo');
    const foto = document.getElementById('input-foto');
    const precio = document.getElementById('input-precio');
    const stock = document.getElementById('input-stock');

    const inputCart = document.getElementById('input-carrito');

    let products = [];

    const administrador = true;

    
    fetch('http://localhost:8080/api/productos')
        .then(response => response.json())
        .then(data => {
            
            data.forEach(prod => {
                let temp = {
                    id: prod.id,
                    timestamp: prod.timestamp,
                    nombre: prod.nombre,
                    descripcion: prod.descripcion,
                    codigo: prod.codigo,
                    foto: prod.foto,
                    precio: prod.precio,
                    stock: prod.stock,
                }
                products.push(temp);
                showProduct(temp);

            })

            for (const btn of btnEliminar) {
                btn.addEventListener('click', deleteProduct);
            }

            for (const btn of btnActualizar) {
                btn.addEventListener('click', updateProduct);
            }

            for (const btn of btnAgregar) {
                btn.addEventListener('click', addProduct);
            }
        })

    btnCreateCarrito.addEventListener('click', createCart);

    btnCarrito.addEventListener('click', showCartById);

    function showProduct(data) {
        const article = document.createElement('article');
        article.id = data.id;
        article.innerHTML = `<header>
                                ${data.nombre}
                            </header>
                            <img src=${data.foto} alt=""> <p>Precio: ${data.precio}</p>
                            <button class="boton-agregar" data-id=${data.id}>Agregar</button>
                            ${administrador ? `<footer> <button class="boton-actualizar" data-id=${data.id}>Actualizar</button> <button class="boton-eliminar" data-id=${data.id}>Eliminar</button> </footer>` : ''}
                            `;
        cards.appendChild(article);
    }

    function showCart(data) {
        const article = document.createElement('article');
        article.innerHTML = `<header>
                                ${data.nombre}
                            </header>
                            <img src=${data.foto} alt=""> <p>Precio: ${data.precio}</p>
                            `;
        carts.appendChild(article);
    }

    function createCart() {
        fetch(`http://localhost:8080/api/carrito/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {return res.json()})
        .then(data => console.log("Tu carrito fue creado con el identificador:", data))
        .catch(error => console.log(error));

    }

    function deleteProduct(event) {
        let idProducto = event.target.getAttribute("data-id"); 

        fetch(`http://localhost:8080/api/productos/${idProducto}`, {method: 'DELETE'})
            .then (response => {
                console.log(response);
                const element = document.getElementById(idProducto);
                element.remove();
            })
            .catch(error => console.log(error))
    }

    function updateProduct(event) {
        let idProducto = event.target.getAttribute("data-id"); 
        const oldElement = document.getElementById(idProducto);

        let data = {
            nombre: nombre.value,
            descripcion: descripcion.value,
            codigo: codigo.value,
            foto: foto.value,
            precio: precio.value,
            stock: stock.value,
        }

        fetch(`http://localhost:8080/api/productos/${idProducto}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response);
                const article = document.createElement('article');
                article.id = idProducto;
                article.innerHTML = `<header>
                                ${data.nombre}
                            </header>
                            <img src=${data.foto} alt=""> <p>Precio: ${data.precio}</p>
                            <button class="boton-agregar" data-id=${data.id}>Agregar</button>
                            ${administrador ? `<footer> <button class="boton-actualizar" data-id=${data.id}>Actualizar</button> <button class="boton-eliminar" data-id=${data.id}>Eliminar</button> </footer>` : ''}
                            `;
                cards.replaceChild(article, oldElement);
            })
            .catch(error => console.log(error))
    }

    function showCartById(event) {
        event.preventDefault();

        fetch(`http://localhost:8080/api/carrito/${inputCart.value}/productos`)
        .then(response => response.json())
        .then(data => {
            
            while (carts.hasChildNodes()) {
                carts.removeChild(carts.firstChild);
            }

            data.productos.forEach(prod => {
                let temp = {
                    id: prod.id,
                    nombre: prod.nombre,
                    precio: prod.precio,
                    foto: prod.foto,
                }
                showCart(temp);
            })
        })
        .catch(error => console.log(error))
        
    }

    function addProduct(event) {
        let idProducto = event.target.getAttribute("data-id"); 
        let busqueda = products.find((producto) => producto.id == idProducto);
        
        fetch(`http://localhost:8080/api/carrito/${inputCart.value}/productos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(busqueda),
        })
            .then(response => {
                console.log(response)
                showCartById(event);
            })
            .catch(error => console.log(error))
    }
})();