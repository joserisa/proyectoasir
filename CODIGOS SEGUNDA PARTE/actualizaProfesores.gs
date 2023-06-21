function leerProfesores() {

  var listProf = [];
  var pageToken, page;

    do {

      var optionalArgs = {"customer":"my_customer", maxResults: 300, pageToken:   pageToken, orderBy: 'familyName'}  
      page = AdminDirectory.Users.list(optionalArgs)
      var allUsers = page.users

      //recorre los profesores del instituto
      for (i=0; i<allUsers.length; i++){

        userDetails = allUsers[i]

        //Se comprueba que el alumno sea de la UO alumnado o de /alumnado_email_abierto_al_exterior
        if (allUsers[i].orgUnitPath == "/profesorado" && !allUsers[i].name.givenName.includes('profesor')){
          listProf.push(allUsers[i].name.familyName + ' ' + allUsers[i].name.givenName);
        };
      }

      pageToken = page.nextPageToken;

    }while(pageToken);
     
    return listProf.sort((a, b) => a.localeCompare(b));;

}

function actualizarProfesores() {
var form = FormApp.openById('1-vBCzam5-rh2FugOpyqukk5mq9cY2GhJaHwMCwUaPck');
var item = form.getItemById(form.getItems()[1].getId()).asListItem();
item.setTitle('Apellidos y nombre del/la profesor/a denunciante')
item.setChoiceValues(leerProfesores());

}
