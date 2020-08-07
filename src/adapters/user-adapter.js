const userAdapter = (user) => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user[`avatar_url`]
  };
};

export {userAdapter};
