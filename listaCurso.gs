/**La funcion doGet() permite implementar el codigo como una
 * aplicacion web.
 */

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index').setTitle('Formulario de incidencias').setFaviconUrl('https://cdn.icon-icons.com/icons2/3023/PNG/512/notebook_address_book_book_icon_188753.png');
}

/** Lista los cursos de los que dispone el instituto */
function listarCursos() {

  var cursos = [];
  var listCur = [];
  var pageToken, page;

    do {

      //Parametros opcionales que se pasan a User.list
      var optionalArgs = {"customer":"my_customer", maxResults: 100, pageToken:   pageToken, orderBy: 'familyName'}  
      page = AdminDirectory.Users.list(optionalArgs)
      var allUsers = page.users

      //Recorre todos los alumnos que si son alumnado o alumnado_email_abierto_al_exterior
      //saca el curso de cada alumno y lo guarda en un vector
      for (i=0; i<allUsers.length; i++){
        userDetails = allUsers[i]
        if (allUsers[i].organizations != null && allUsers[i].orgUnitPath == "/alumnado" || allUsers[i].orgUnitPath == "/alumnado/alumnado_email_abierto_al_exterior"){
        cursos.push(`${allUsers[i].organizations[0].department}`)};

        //Elimina los cursos duplicados
        listCur = cursos.filter((item,index)=>{
        return cursos.indexOf(item) === index;})

      }

      pageToken = page.nextPageToken;
    }while(pageToken);

    //Ordena los cursos y lo devuelve.
    listCur.sort();
    console.log(listCur);

    return listCur;
}

