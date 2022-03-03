console.log('carrito connected success!');

const $ = (id) => document.getElementById(id);

const carrito = $('carrito');



const getCarrito = async () => {

    try {
        const response = await fetch('/api/cart/show')
        const result = await response.json()

        if (result.ok) {

            cargarTabla(result.data)
        }

    } catch (error) {
        console.error(error);
    }

}


const addItem = async (id) => {

    try {
        const response = await fetch(`/api/cart/${id}`, {
            method: 'POST'
        })
        const result = await response.json()

        if (result.ok) {
            cargarTabla(result.data)
        }

    } catch (error) {
        console.error(error);
    }

}


const cargarTabla = (data) => {

    carrito.innerHTML = null;

    data.forEach(({amount,image,name,price,total}) => {
        let item = `
        <tr>
        <th scope="row">${amount}</th>
        <td><img src="/images/products/${image}" class="w-25" /> </td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${total}</td>
        <td><button class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button></td>
      </tr>
        `
        carrito.innerHTML += item
    });

}

getCarrito();
