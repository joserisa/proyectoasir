function obtenerID() {
var item = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck').getItems()[0].getId();
var item2 = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck').getItems()[2];
console.log(item);
console.log(item2.getTitle());
}

function actualizarAlumnos(curso) {
var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
var item = form.getItemById(form.getItems()[0].getId()).asListItem();
var item2 = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck').getItems()[2].asCheckboxItem();
var options = buscarUsuario(curso);
item.setTitle('Elija al alumno infractor')
item.setChoiceValues(options)
item2.setTitle('Curso del alumno')
  .setChoices([
    item.createChoice(curso),
  ])


}
