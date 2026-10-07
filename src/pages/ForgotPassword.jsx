import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import loginIMG from "../components/img/login.png"; 

import "../components/UserLogin/UserLogin.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setMessage(`Se o e-mail ${email} estiver cadastrado, você receberá um link de recuperação.`);
    setEmail("");
  };

  return (
    <>
      <Helmet><title>Recuperar Senha | Museu Tech</title></Helmet>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={loginIMG} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleReset}>
            <span className="login100-form-title">
              Recuperar Senha
            </span>

            {message && <div className="alert alert-success text-center mb-4" style={{ borderRadius: '25px', fontSize: '13px' }}>{message}</div>}

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">ENVIAR LINK</button>
            </div>

            <div className="text-center p-t-136" style={{ marginTop: '80px' }}>
              <Link className="txt2" to="/Tech-Museum/user-login">
                <i className="fa fa-long-arrow-left m-r-5" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Voltar para o Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;