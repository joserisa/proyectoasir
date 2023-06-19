function buscarUsuario(curso) {
  var alumnos = [];
  const optionalArgs = {
    "customer": "my_customer",
    "maxResults": 50,
    "orderBy": "familyName",
    "query": "orgDepartment="+"'"+curso+"'"+""
    
  };
  try {
    
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      console.log('No se encontró ningún usuario.');
      return;
    }
    console.log('Users:');
    for (const user of users) {
      if(user.organizations != null){
        alumnos.push(user.name.familyName + ", " + user.name.givenName)
        //console.log(user);
      //console.log('%s (%s)', user.primaryEmail, user.name.fullName, user.organizations[0].department);
      }
    }
  } catch (err) {
    console.log('Failed with error %s', err.message);
  }
  return alumnos.sort((a, b) => a.localeCompare(b));;
}