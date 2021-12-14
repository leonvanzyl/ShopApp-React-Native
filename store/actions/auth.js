export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBc1DIiWTLWwFN7bH0lWSWdpByRcmoVPik`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      switch (errorId) {
        case "EMAIL_EXISTS":
          message = "This email exists already";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBc1DIiWTLWwFN7bH0lWSWdpByRcmoVPik`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      // throw new Error("Something went wrong");
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Something went wrong";
      switch (errorId) {
        case "EMAIL_NOT_FOUND":
          message = "This email could not be found";
        case "INVALID_PASSWORD":
          message = "Invalid email or password";
      }
      throw new Error(message);
    }

    const resData = await response.json();

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
