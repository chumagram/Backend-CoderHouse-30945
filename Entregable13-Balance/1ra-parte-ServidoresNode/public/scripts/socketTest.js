const socket = io.connect();

function render(data) {
    const html = data.map((element) => {
        return(`<tr>
        <td>${element.id}</td>
        <td>${element.title}</td>
        <td>${element.price}</td>
        <td><img src=${element.thumbnail} alt="imagen de ${element.title}"></td>
    </tr>`)
    }).join(" ");
    document.getElementById('tablaProductos').innerHTML = html;
}

socket.on('productos', data => {
    render(data);
});