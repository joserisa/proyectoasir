function listUsers() {
  const optionalArgs = {
    customer: 'my_customer',
    maxResults: 500,
    orderBy: 'email'
  };
  try {
    const response = AdminDirectory.Users.list(optionalArgs);
    const users = response.users;
    if (!users || users.length === 0) {
      console.log('No users found.');
      return;
    }
    // Print the list of user's full name and email
    console.log('Users:');
    for (const user of users) {
      console.log('%s (%s)', user.primaryEmail, user.name.fullName);
    }
  } catch (err) {
    // TODO (developer)- Handle exception from the Directory API
    console.log('Failed with error %s', err.message);
  }
}