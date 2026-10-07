//Developed by Amadeus Ferrp (https://www.linkedin.com/in/amadeusferro) ...
//Translated by Amadeus Ferro ...

import "./MemberLogin.css";
import loginIMG from "../img/hero-img.png";

import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

import { AuthContext } from "../../contexts/AuthContext";

const MemberLogin = () => {
  const { t } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    
      navigate("/Tech-Museum/dashboard"); 
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("page_titles.member_login")}</title>
      </Helmet>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={loginIMG} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">
              {t("login_page.member_title")}
            </span>

            {error && (
              <div className="alert alert-danger text-center w-100" style={{borderRadius: '25px', padding: '10px 15px', fontSize: '14px'}}>
                {error}
              </div>
            )}

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="email" 
                name="email"
                placeholder={t("login_page.email")}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder={t("login_page.password")}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button 
                type="submit" 
                className="login100-form-btn" 
                disabled={isLoading}
              >
                {isLoading ? "Acessando..." : t("login_page.button")}
              </button>
            </div>

            <div className="text-center p-t-12" style={{ marginTop: '20px' }}>
              <Link className="txt2" to="/Tech-Museum/forgot-password" style={{ textDecoration: 'none', color: '#666' }}>
                {t("login_page.forgot")}?
              </Link>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default MemberLogin;