/**
 * Funcion que lista los usuarios de un dominio
 */
function listaAlumno() {
  
  var persona = [];
  var pageToken, page;

  do {

    //argumentos opcionales que se pasan a Users.list
    var optionalArgs = {"customer":"my_customer", maxResults: 20, pageToken:   pageToken, 
    orderBy: 'familyName'}  

    //Se pagina los resultados obtenidos del dominio de Google.
    page = AdminDirectory.Users.list(optionalArgs)
    var allUsers = page.users
    
    //Se recorre todos los usuarios y si pertenecen a alumnado o
    //alumnado_email_abierto_al_exterior se anade a la lista de alumnos
    for (i=0; i<allUsers.length; i++){
      console.log(allUsers[i]);
      
      if (allUsers[i].organizations != null && (allUsers[i].orgUnitPath == "/alumnado" || allUsers[i].orgUnitPath == "/alumnado/alumnado_email_abierto_al_exterior")){
        
        persona.push(allUsers[i].name.familyName + ' ' + allUsers[i].name.givenName);
     
      };
    }
    //Se pagina
    pageToken = page.nextPageToken;
  
  }while(pageToken);
  
  //Se devuelve la lista de alumnos ordenados por apellido
  return persona.sort((a, b) => a.localeCompare(b));

}