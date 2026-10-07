import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet";
import "./Dashboard.css";

import api from "../../services/api";
import galleryService from "../../services/galleryService";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({ gallery: 0, blog: 0, contacts: 0 });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const galleryData = await galleryService.getAll(1, 1000); 
        const galleryCount = (galleryData.items || galleryData.data || galleryData).length || 0;

        const blogData = await api.get("/blog");
        const blogCount = (blogData.data.data || blogData.data || []).length || 0;

        const contactsData = await api.get("/contacts");
        const contactsCount = (contactsData.data.data || contactsData.data || []).length || 0;

        setStats({
          gallery: galleryCount,
          blog: blogCount,
          contacts: contactsCount
        });
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/Tech-Museum/");
  };

  return (
    <>
      <Helmet>
        <title>Painel de Administração | Museu Tech</title>
      </Helmet>
      
      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="dashboard-card text-center shadow">
                <h2>Bem-vindo ao Painel, {user?.name}!</h2>
                <p className="text-muted mb-4">
                  Nível de acesso: <strong>{user?.role === 'admin' ? 'Administrador' : 'Membro'}</strong>
                </p>
                
                <hr style={{ borderColor: '#e6e6e6', marginBottom: '30px' }} />

                <div className="row mb-5 px-3">
                  <div className="col-md-4 mb-3">
                    <div className="p-3 rounded shadow-sm bg-light" style={{ borderLeft: '5px solid #0d3b66' }}>
                      <i className="bi bi-collection fs-1 text-primary mb-2"></i>
                      {isLoadingStats ? (
                         <h3 className="mb-0">...</h3>
                      ) : (
                         <h3 className="mb-0">{stats.gallery}</h3>
                      )}
                      <p className="text-muted mb-0 fw-bold">Peças no Acervo</p>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="p-3 rounded shadow-sm bg-light" style={{ borderLeft: '5px solid #28a745' }}>
                      <i className="bi bi-journal-text fs-1 text-success mb-2"></i>
                      {isLoadingStats ? (
                         <h3 className="mb-0">...</h3>
                      ) : (
                         <h3 className="mb-0">{stats.blog}</h3>
                      )}
                      <p className="text-muted mb-0 fw-bold">Artigos no Blog</p>
                    </div>
                  </div>

                  <div className="col-md-4 mb-3">
                    <div className="p-3 rounded shadow-sm bg-light" style={{ borderLeft: '5px solid #ffc107' }}>
                      <i className="bi bi-envelope-open fs-1 text-warning mb-2"></i>
                      {isLoadingStats ? (
                         <h3 className="mb-0">...</h3>
                      ) : (
                         <h3 className="mb-0">{stats.contacts}</h3>
                      )}
                      <p className="text-muted mb-0 fw-bold">Mensagens Recebidas</p>
                    </div>
                  </div>
                </div>

                <div className="dashboard-btn-group">
                  <Link to="/Tech-Museum/dashboard/manage-gallery" className="dashboard-btn btn-acervo">
                    <i className="bi bi-collection me-2 fs-5"></i> Gerenciar Acervo
                  </Link>

                  <Link to="/Tech-Museum/dashboard/manage-blog" className="dashboard-btn btn-blog">
                    <i className="bi bi-journal-text me-2 fs-5"></i> Gerenciar Blog
                  </Link>

                  <Link to="/Tech-Museum/dashboard/add-blog" className="dashboard-btn btn-post">
                    <i className="bi bi-pencil-square me-2 fs-5"></i> Escrever Post
                  </Link>
                  
                  <Link to="/Tech-Museum/dashboard/manage-contacts" className="dashboard-btn btn-contato">
                    <i className="bi bi-envelope-open me-2 fs-5"></i> Contactos
                  </Link>
                  
                  <button className="dashboard-btn btn-sair" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2 fs-5"></i> Encerrar Sessão
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;