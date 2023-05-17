function parteIncidencia() {
  var form = FormApp.create('Parte de Incidencia');
  var alumnos = form.addListItem();
  var fechahora = form.addDateTimeItem();
  var titulo = form.addSectionHeaderItem();
  var item = form.addCheckboxItem();
  var item2 = form.addCheckboxItem();
  var item3 = form.addCheckboxItem();
  var item4 = form.addCheckboxItem();
  var item5 = form.addCheckboxItem();
  var i = 0;
  const optionalArgs = {
    customer: 'my_customer',
    maxResults: 100,
    orderBy: 'email'
  };
  try {
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }
    const alums = [];
  for (const user of users) {
    alums.push(user.name.fullName)
  }
  alumnos.setTitle('Elija el alumno infractor');
    alumnos.setChoiceValues(alums);
 
fechahora.setTitle('Fecha y hora de la incidencia');
titulo.setTitle('CONDUCTAS CONTRARIAS A LAS NORMAS DE CONVIVENCIA');
item.setTitle('Perturbar el normal desarrollo de las actividades de la clase');
item.setChoices([
        item.createChoice('Dando voces.'),
        item.createChoice('Levantándose sin motivo.'),
        item.createChoice('Comiendo y/o bebiendo.'),
        item.createChoice('Usando, manejando o exhibiendo aparatos ajenos a la actividad del aula.')
    ]);

item2.setChoices([
        item2.createChoice('No mantener la compostura adecuada al lugar y a la actividad que se desarrolla en ella.'),
        item2.createChoice('No colaborar sistemáticamente en la realización de las actividades orientadas al desarrollo del currículo'),
        item2.createChoice('No seguir las orientaciones del profesorado respecto a su aprendizaje.'),
        item2.createChoice('No traer al centro el material necesario para realizar las actividades de clase.'),
        item2.createChoice('Impedir o dificultar el ejercicio del derecho o el cumplimiento del deber de estudiar de sus compañeros.'),
        item2.createChoice('No acudir con puntualidad a clase.'),
        item2.createChoice('Faltar injustificadamente a clase.')
    ]);

item3.setTitle('Mostrar incorreción y desconsideración hacia');
item3.setChoices([
        item3.createChoice('El profesorado.'),
        item3.createChoice('Otros miembros de la comunidad educativa.')

    ]);

item4.setTitle('Causar pequeños daños en...');
item4.setChoices([
        item4.createChoice('Las instalaciones.'),
        item4.createChoice('Recursos materiales.'),
        item4.createChoice('Documentos del centro.'),
        item4.createChoice('En las pertenencias de los demás miembros de la comunidad educativa.')

    ]);
item5.setChoices([
        item5.createChoice('No colaborar en la limpieza y conservación del Instituto utilizando adecuadamente los aseos, papeleras, etc.'),
    ]);

    } catch (err) {
      // TODO (developer)- Handle exception from the Directory API
      console.log('Failed with error %s', err.message);
    }
Logger.log('Published URL: ' + form.getPublishedUrl());
Logger.log('Editor URL: ' + form.getEditUrl());
}