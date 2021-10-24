import { FunctionComponent, useState } from "react";
import registerAdmin from "../../useCases/createAdmin/registerAdmin";
import logo from "../../logo.svg";

interface SignupFormProps {
  onRegister: () => void;
}

const SignupForm: FunctionComponent<SignupFormProps> = (props) => {
  const [formDisabled, setFormDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (e) => {
      e.preventDefault();
      setFormDisabled(true);
      try {
        await registerAdmin({ name: "admin", email, password });
        alert("Account created");
        props.onRegister();
      } catch (error) {
        if (error instanceof Error) alert(error.message);
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
        <h1 className="h3 mb-3 fw-normal">Create admin account</h1>

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

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          disabled={!isEmailCorrect()}
        >
          {formDisabled ? "Processing..." : "Register"}
        </button>
      </fieldset>
    </form>
  );
};

export default SignupForm;
