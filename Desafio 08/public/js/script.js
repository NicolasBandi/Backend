(function () {
    const formMessage = document.getElementById('form-message');
    const inputEmail = document.getElementById('input-email');
    const inputMessage = document.getElementById('input-message');
    const listMessages = document.getElementById('list-messages');

    const inputTitle = document.getElementById('input-title');
    const inputPrice = document.getElementById('input-price');
    const inputThumbnail = document.getElementById('input-thumbnail');

    const formProducts = document.getElementById('form-products');
    const tableProducts = document.getElementById('table-products');

    const socket = io();

    let messages = [];
    let products = [];

    // Consigo los elementos de mi backend, los sumo al array de productos y los renderizo
    fetch('http://localhost:8080/api/productos')
    .then(response => response.json())
    .then(data => {
        data.forEach(prod => {
            let temp = {
                title: prod.title,
                price: prod.price,
                thumbnail: prod.thumbnail,
            }
            products.push(temp);
            showProduct(temp);
        })
    })   

    // Consigo el template para renderizar en la tabla los productos que se agregan
    fetch('/js/templates/template.hbs')
    .then(response => response.text())
    .then(text => {
    const template = Handlebars.compile(text);
    const html = template({ products });
    document.querySelector('tbody').innerHTML = html;
    });

    function showMessage(data) {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: blue"><strong>${data.email}</strong></span>
                        <span style="color: brown">[${data.date}] :</span>
                        <span style="color: green"><i> ${data.message}</i></span>`
        listMessages.appendChild(li);
    }

    function showProduct(data) {
        let tr = tableProducts.insertRow();
        tr.innerHTML = `<td class="align-middle">${data.title}</td>
                        <td class="text-center align-middle">${data.price}</td>
                        <td class="text-center align-middle"><img style="width: 25%" src=${data.thumbnail} alt=""></td>`
    }

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const data = {
            email: inputEmail.value,
            message: inputMessage.value,
            date: '',
        };
        socket.emit('new-message', data);
        inputMessage.value = '';
        inputMessage.focus();
    })

    formProducts.addEventListener('submit', (event) => {
        event.preventDefault();

        const product = {
            title: inputTitle.value,
            price: inputPrice.value,
            thumbnail: inputThumbnail.value,
        };
        socket.emit('new-product', product);
        inputTitle.value = '';
        inputPrice.value = '';
        inputThumbnail.value = '';
        inputTitle.focus();
    })

    socket.on('connect', () => {
        console.log("Conectado al servidor");
    });

    socket.on('history-messages', (data) => {
        messages = data;
        listMessages.innerText = '';
        messages.forEach((message) => {
            showMessage(message);  
        });
    });

    socket.on('notification', (data) => {
        messages.push(data);
        showMessage(data);
    });

    socket.on('history-products', (data) => {
        products = data;
        products.forEach((product) => {
            showProduct(product);  
        });
    });

    socket.on('table-update', (data) => {
        products.push(data);
        showProduct(data);
    });
})();