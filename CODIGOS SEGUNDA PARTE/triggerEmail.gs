function crearTrigger() {

  var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
  var numTriggers = ScriptApp.getProjectTriggers();
    if(numTriggers.length > 0)
      return;

  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
}

function onFormSubmit(e) {

  var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
  var emisor = form.getResponses();
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  var emailBody = "Respuestas del formulario rellenado:\n\n";

  itemResponses.forEach(function(itemResponse) {
    var title = itemResponse.getItem().getTitle();
    var response = itemResponse.getResponse();
    emailBody += title + "\n" + response + "\n\n";
  });
  //emailBody += formResponse.getItemResponses()[2].getResponse() +" SAQUE EL CURSO";
  //emailBody += buscarProfesor(formResponse.getItemResponses()[2].getResponse()) + " CORREO DEL TUTOR";
  
  sendEmail(emailBody, emisor[emisor.length-1].getRespondentEmail(), buscarProfesor(formResponse.getItemResponses()[2].getResponse()).toString());

}

function sendEmail(emailBody, emisor, tutor) {

  MailApp.sendEmail(tutor, "Nueva respuesta de formulario", emailBody);
  MailApp.sendEmail(emisor, "Nueva respuesta de formulario", emailBody);
  MailApp.sendEmail("jefaturadiurno@iesfernandoaguilar.es", "Nueva respuesta de formulario", emailBody );

}

function establecerCollect() {

  var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
  form.setCollectEmail(true);
  const collect = form.collectsEmail();
  console.log(collect);
  const formResponses = form.getResponses();
  console.log(formResponses[formResponses.length-1].getRespondentEmail());


}