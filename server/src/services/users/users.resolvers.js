// Refactored as it is not correct define User instead of profiles
export default function(Profiles) {
  const usersResolvers = {
    Users: {
      profile: user => {
        return Profiles.find({ query: { _id: user.owner } }).then(result => {
          return result[0];
        });
      }
    }
  };

  return usersResolvers;
}
