import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../contexts/AuthContext"; 
import api from "../../services/api"; 
import loginIMG from "../img/login.png"; 
import "./UserLogin.css";

const UserLogin = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      
      navigate("/Tech-Museum/"); 
    } catch (err) {
      setError("E-mail ou senha incorretos.");
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("page_titles.user_login")}</title>
      </Helmet>
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={loginIMG} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title">
              {t("login_page.user_title")}
            </span>

            {error && (
              <div className="alert alert-danger text-center mb-4" style={{ borderRadius: '25px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
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

            <div className="wrap-input100 validate-input" data-validate="Password is required">
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
              <button type="submit" className="login100-form-btn">
                {t("login_page.button")}
              </button>
            </div>

            <div className="text-center p-t-12" style={{ marginTop: '12px' }}>
              <Link className="txt2" to="/Tech-Museum/forgot-password">
                {t("login_page.forgot")}?
              </Link>
            </div>

            <div className="text-center p-t-136" style={{ marginTop: '60px' }}>
              <Link className="txt2" to="/Tech-Museum/register">
                {t("login_page.create_new")}
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" style={{ marginLeft: '5px' }}></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserLogin;