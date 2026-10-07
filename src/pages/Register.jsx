import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../services/api";
import loginIMG from "../components/img/login.png"; 

import "../components/UserLogin/UserLogin.css";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      
      setSuccess("Conta criada com sucesso! Redirecionando...");
      setError("");
      setTimeout(() => navigate("/Tech-Museum/user-login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao criar conta.");
      setSuccess("");
    }
  };

  return (
    <>
      <Helmet><title>Criar Conta | Museu Tech</title></Helmet>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={loginIMG} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleRegister}>
            <span className="login100-form-title">
              Criar Nova Conta
            </span>

            {error && <div className="alert alert-danger text-center mb-4" style={{ borderRadius: '25px', fontSize: '14px' }}>{error}</div>}
            {success && <div className="alert alert-success text-center mb-4" style={{ borderRadius: '25px', fontSize: '14px' }}>{success}</div>}

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="text"
                placeholder="Nome Completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-user" aria-hidden="true"></i></span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">REGISTRAR</button>
            </div>

            <div className="text-center p-t-136" style={{ marginTop: '40px' }}>
              <Link className="txt2" to="/Tech-Museum/user-login">
                <i className="fa fa-long-arrow-left m-r-5" aria-hidden="true" style={{ marginRight: '5px' }}></i>
                Já tem uma conta? Faça Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;