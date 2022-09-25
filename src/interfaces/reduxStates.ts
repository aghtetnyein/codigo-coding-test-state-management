interface IAuth {
  user: {
    username: string;
  };
}

interface IReduxStates {
  auth: IAuth;
}

export default IReduxStates;
