/**
 * Lists users in a Google Workspace domain.
 * @see https://developers.google.com/admin-sdk/directory/reference/rest/v1/users/list
 * 
 *
 */
function listaAlumno(curso) {
  var persona = [];
  //var cont = 0;
    var pageToken, page;
     do {
      var optionalArgs = {"customer":"my_customer", maxResults: 100, pageToken:   pageToken, orderBy: 'familyName'}  
      page = AdminDirectory.Users.list(optionalArgs)
      var allUsers = page.users
      
      for (i=0; i<allUsers.length; i++){
        if (allUsers[i].organizations != null && `${allUsers[i].organizations[0].department}` === curso && (allUsers[i].orgUnitPath == "/alumnado" || allUsers[i].orgUnitPath == "/alumnado/alumnado_email_abierto_al_exterior")){
        persona.push(allUsers[i].name.familyName + ' ' + allUsers[i].name.givenName);
      };
      }//console.log(persona);
      //persona = [];
      pageToken = page.nextPageToken;
     }while(pageToken);
     return persona.sort((a, b) => a.localeCompare(b));;
}