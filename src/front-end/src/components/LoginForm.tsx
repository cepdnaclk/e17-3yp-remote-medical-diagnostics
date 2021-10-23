import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router";
import { freshLogin } from "../useCases/logIn/freshLogin";
import { useAuth } from "./AuthContext";
import logo from "../logo.svg";

interface LoginFormProps {
  type: "patient" | "doctor" | "admin";
}

const LoginForm: FunctionComponent<LoginFormProps> = (props) => {
  const [formDisabled, setFormDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const history = useHistory();
  const loginDetailsAreCorrect = async () => {
    try {
      await freshLogin({
        email,
        password,
        userType: props.type,
      });
      return true;
    } catch (error) {
      if (error instanceof Error)
        alert(error.message || "Connection error. Check your internet");
      return false;
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (e) => {
      e.preventDefault();
      setFormDisabled(true);
      if (await loginDetailsAreCorrect()) {
        auth.markAuthSuccess();
        history.push("/home");
      } else {
        setFormDisabled(false);
      }
    };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const isEmailCorrect = () => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={formDisabled}>
        <img
          className="mb-4"
          src={logo}
          alt="our logo"
          width="100"
          height="100"
        />
        <h1 className="h3 mb-3 fw-normal">Sign in to MedGenie</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder={email}
            onChange={onEmailChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder={password}
            onChange={onPasswordChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            Remember me
            <input className="m-2" type="checkbox" value="remember-me" />
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={!isEmailCorrect()}
        >
          {formDisabled ? "Signing in" : "Sign in"}
        </button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
