export default function(Profiles) {
  const usersResolvers = {
    Users: {
      profile: user => {
        return Profiles.find({ query: { _id: user.owner } }).then(result => {
          console.log("resuslt", result);
          return result[0];
        });
      }
    }
  };

  return usersResolvers;
}
