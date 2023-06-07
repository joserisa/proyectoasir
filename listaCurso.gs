function doGet() {
  return HtmlService.createHtmlOutputFromFile('index').setTitle('Formulario de incidencias').setFaviconUrl('https://cdn.icon-icons.com/icons2/3023/PNG/512/notebook_address_book_book_icon_188753.png');
}
function listarCursos() {
  var cursos = [];
  var listCur = [];
    var pageToken, page;
     do {
      var optionalArgs = {"customer":"my_customer", maxResults: 100, pageToken:   pageToken, orderBy: 'familyName'}  
      page = AdminDirectory.Users.list(optionalArgs)
      var allUsers = page.users

      for (i=0; i<allUsers.length; i++){
       userDetails = allUsers[i]
       if (allUsers[i].organizations != null && allUsers[i].orgUnitPath == "/alumnado" || allUsers[i].orgUnitPath == "/alumnado/alumnado_email_abierto_al_exterior"){
       cursos.push("<option>" + `${allUsers[i].organizations[0].department}` + "</option>")
       };
       listCur = cursos.filter((item,index)=>{
      return cursos.indexOf(item) === index;
  })
      }
      pageToken = page.nextPageToken;
     }while(pageToken);
     listCur.sort();
     //console.log(listCur[24]);
     return listCur;
}

