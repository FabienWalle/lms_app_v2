import api from "../api";

const Login = (data) => {
  return api.post("/authentication_token", data);
};

const Me = (data) => {
  return api.get('/api/me', data)
}

const AuthServices = {
  Login,
  Me
};

export default AuthServices;
