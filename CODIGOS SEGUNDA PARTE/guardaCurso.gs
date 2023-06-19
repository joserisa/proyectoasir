function guardarCursos() {

  //En la linea justo de abajo va la URL de la Hoja de calculo
  var hojaCurso = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1DzAGaUbqoCilc-vOB_gKWih_vzgupydTFGDcKvjuRmg/edit#gid=0').getSheets()[0];
  var cursos = [];
  var listCur = [];
  var pageToken, page;

    do {

      var optionalArgs = {"customer":"my_customer", maxResults: 100, pageToken:   pageToken, orderBy: 'familyName'}  
      page = AdminDirectory.Users.list(optionalArgs)
      var allUsers = page.users

      //recorre los alumnos del instituto y se queda con el campo del Departamento (curso)
      for (i=0; i<allUsers.length; i++){

        userDetails = allUsers[i]

        //Se comprueba que el alumno sea de la UO alumnado o de /alumnado_email_abierto_al_exterior
        if (allUsers[i].organizations != null && allUsers[i].orgUnitPath == "/alumnado" || allUsers[i].orgUnitPath == "/alumnado/alumnado_email_abierto_al_exterior"){
          cursos.push(`${allUsers[i].organizations[0].department}`);
        };

        listCur = cursos.filter((item,index)=>{
          return cursos.indexOf(item) === index;
        })

      }

      pageToken = page.nextPageToken;

    }while(pageToken);
     
    listCur.sort();
    listCur.unshift('Sin seleccionar');
    
    //limpia la hoja de calculo si hay alguna celda escrita
    if (hojaCurso.getLastRow() >=1){
      hojaCurso.getRange(1,1,hojaCurso.getLastRow(),1).clearContent();
    }

    //escribe en la hoja de calculo los valores del vector de cursos
    for(var i=1;i<=listCur.length;i++){
      hojaCurso.getRange(i, 1).setValue(listCur[i-1]);}

}