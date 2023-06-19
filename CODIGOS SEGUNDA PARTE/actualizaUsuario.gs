function obtenerID() {
var item = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck').getItems()[0].getId();
var item2 = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck').getItems()[1].getId();
console.log(item);
console.log(item2);
//843446016
}

function actualizarAlumnos(curso) {
var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
var item = form.getItemById(form.getItems()[0].getId()).asListItem();
var options = buscarUsuario(curso);
item.setTitle('Elija al alumno infractor')
item.setChoiceValues(options)


}
