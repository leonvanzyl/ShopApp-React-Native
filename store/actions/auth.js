import AsyncStorage from "@react-native-async-storage/async-storage";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId,
    token,
  };
};

export const logout = () => {
  return { type: LOGOUT };
};

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

    dispatch(authenticate(resData.localId, resData.idToken));

    // The API returns the epire time as a string.
    // We will therefore convert the ExpireIn string to an integer and multiply the value
    // by 1000 to get the time in miliseconds.  The result is then added to the current timestamp
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

    dispatch(authenticate(resData.localId, resData.idToken));

    // The API returns the epire time as a string.
    // We will therefore convert the ExpireIn string to an integer and multiply the value
    // by 1000 to get the time in miliseconds.  The result is then added to the current timestamp
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};
