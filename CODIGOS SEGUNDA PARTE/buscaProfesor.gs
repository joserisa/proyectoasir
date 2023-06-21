function buscarProfesor(curso) {
  var profesores = [];
  const optionalArgs = {
    "customer": "my_customer",
    "maxResults": 50,
    "orderBy": "familyName",
    "query": "orgTitle="+"'"+curso+"'"+""
  };
  try {
    
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      console.log('No se encontró ningún usuario.');
      return;
    }
    for (const user of users) {
      if(user.orgUnitPath == "/profesorado" && !user.name.givenName.includes('profesor')){
        profesores.push(user.primaryEmail)
        //console.log(user);
      //console.log('%s (%s)', user.primaryEmail, user.name.fullName, user.organizations[0].department);
      }
    }
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
  //console.log(profesores)
  return profesores;
}