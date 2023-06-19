//Función que crea el formulario de Google con los campos necesarios para rellenar el parte de incidencia.
function parteIncidencia(cursoelegido) {

  //Declaracion de las variables inicializadas con las funciones del formulario
  //para crear el formulario y los distintos campos.
  var form = FormApp.create('Parte de Incidencia');
  var cursitos = form.addListItem();
  var alumnos = form.addListItem();
  var fechahora = form.addDateTimeItem();
  var titulo = form.addSectionHeaderItem();
  var item = form.addCheckboxItem();
  var item2 = form.addCheckboxItem();
  var item3 = form.addCheckboxItem();
  var item4 = form.addCheckboxItem();
  var item5 = form.addCheckboxItem();
  try {

    //Llama a la funcion listaAlumno() pasando como parametro
    //el curso elegido en la pagina web y almacena los valores en el vector
    //alumL. Posteriormente se crea el titulo y el menu desplegable
    //con la lista de alumnos del instituto filtrados por el curso elegido
    const alumL = listaAlumno(cursoelegido);
    alumnos.setTitle('Elija el alumno infractor');
      alumnos.setChoiceValues(alumL);
      console.log("ID de alumnos: "+alumnos.getId());
 
    //Establece un campo para introducir la fecha y la hora de la incidencia.
    fechahora.setTitle('Fecha y hora de la incidencia');

    //Establece el titulo y las opciones marcables del campo item
    titulo.setTitle('CONDUCTAS CONTRARIAS A LAS NORMAS DE CONVIVENCIA');
    item.setTitle('Perturbar el normal desarrollo de las actividades de la clase');
    item.setChoices([
        item.createChoice('Dando voces.'),
        item.createChoice('Levantándose sin motivo.'),
        item.createChoice('Comiendo y/o bebiendo.'),
        item.createChoice('Usando, manejando o exhibiendo aparatos ajenos a la actividad del aula.')
    ]);

    //Establece nuevas opciones marcables para el campo item2
    item2.setChoices([
      item2.createChoice('No mantener la compostura adecuada al lugar y a la actividad que se desarrolla en ella.'),
      item2.createChoice('No colaborar sistemáticamente en la realización de las actividades orientadas al desarrollo del currículo'),
      item2.createChoice('No seguir las orientaciones del profesorado respecto a su aprendizaje.'),
      item2.createChoice('No traer al centro el material necesario para realizar las actividades de clase.'),
      item2.createChoice('Impedir o dificultar el ejercicio del derecho o el cumplimiento del deber de estudiar de sus compañeros.'),
      item2.createChoice('No acudir con puntualidad a clase.'),
      item2.createChoice('Faltar injustificadamente a clase.')
    ]);
    //Establece el titulo del campo item3 y las opciones marcables
    item3.setTitle('Mostrar incorreción y desconsideración hacia');
    item3.setChoices([
      item3.createChoice('El profesorado.'),
      item3.createChoice('Otros miembros de la comunidad educativa.')
    ]);

    //Establece el titulo del campo item4 y las opciones marcables
    item4.setTitle('Causar pequeños daños en...');
    item4.setChoices([
      item4.createChoice('Las instalaciones.'),
      item4.createChoice('Recursos materiales.'),
      item4.createChoice('Documentos del centro.'),
      item4.createChoice('En las pertenencias de los demás miembros de la comunidad educativa.')
    ]);

    //Establece el titulo del campo item5 y las opciones marcables
    item5.setChoices([
        item5.createChoice('No colaborar en la limpieza y conservación del Instituto utilizando adecuadamente los aseos, papeleras, etc.'),
    ]);
  
  //Tratamiento de la excepcion
  } catch (err) {
      //lanza la excepcion y el error lo muestra por consola
      console.log('Failed with error %s', err.message);
    }
  
  //Generacion de la URL del formulario creado
  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('Editor URL: ' + form.getEditUrl());
  //Creacion del trigger que se ejecutara cuando se confirme el formulario.
  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
  
  return form.getPublishedUrl();
}
function onFormSubmit(e) {
 
  // Obtiene la respuesta que se envio.
  var formResponse = e.response;

  // Obtiene la respuesta de cada uno de los campos del formulario
  var itemResponses = formResponse.getItemResponses();

  // La variable emailBody almacenara las respuestas que iran en
  //el correo
  var emailBody = "Formulario de incidencia:\n\n";

  // Reune preguntas y respuestas de la variable emailBody
  itemResponses.forEach(function(itemResponse) {
    var title = itemResponse.getItem().getTitle();
    var response = itemResponse.getResponse();
    emailBody += title + "\n" + response + "\n\n";
  });

  //Llama a la funcion sendEmail pasando como variable las
  //respuestas del formulario
  sendEmail(emailBody);
}

//Funcion que envia los emails a las personas indicadas.
//getRespondentEmail() devuelve la direccion de correo de la persona que envio una respuesta.
//si la configuración de Form.setCollectEmail(collect) está habilitada.
function sendEmail(emailBody) {
  MailApp.sendEmail("jefaturadiurno@iesfernandoaguilar.es", "Nuevo formulario de conducta", emailBody);
  MailApp.sendEmail(getRespondentEmail(), "Nuevo formulario de conducta", emailBody);

}