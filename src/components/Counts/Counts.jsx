import { useState, useEffect } from "react";
import api from "../../services/api"; // Ajuste o caminho se necessário

const StatisticsSection = () => {
  const [stats, setStats] = useState({ donors: 0, pieces: 0, visitors: 0, members: 0 });

  useEffect(() => {
    const fetchAndRegisterStats = async () => {
      try {
        // Lógica de Visitante Real: Registra a visita apenas uma vez por sessão
        if (!sessionStorage.getItem("visited")) {
          await api.post("/stats/visit"); // Avisa o backend que há um novo visitante
          sessionStorage.setItem("visited", "true"); // Guarda no navegador para não contar de novo na mesma sessão
        }

        // Busca os dados atualizados
        const response = await api.get("/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Erro ao carregar as estatísticas:", error);
      }
    };

    fetchAndRegisterStats();
  }, []);

  return (
    <section className="stats-section py-5">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-center gap-4">
          
          {/* Card: Doadores */}
          <div className="stat-card shadow-sm d-flex align-items-center p-4" style={{ minWidth: "240px" }}>
            <div className="stat-icon me-4">
              <i className="bi bi-gift text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <div className="text-start">
              <h1 className="fw-bold text-primary mb-0">{stats.donors}</h1>
              <p className="text-muted mb-0">Doadores</p>
            </div>
          </div>

          {/* Card: Peças do Acervo */}
          <div className="stat-card shadow-sm d-flex align-items-center p-4" style={{ minWidth: "240px" }}>
            <div className="stat-icon me-4">
              <i className="bi bi-laptop text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <div className="text-start">
              <h1 className="fw-bold text-primary mb-0">{stats.pieces}</h1>
              <p className="text-muted mb-0">Peças</p>
            </div>
          </div>

          {/* Card: Visitantes */}
          <div className="stat-card shadow-sm d-flex align-items-center p-4" style={{ minWidth: "240px" }}>
            <div className="stat-icon me-4">
              <i className="bi bi-people text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <div className="text-start">
              <h1 className="fw-bold text-primary mb-0">{stats.visitors}</h1>
              <p className="text-muted mb-0">Visitantes</p>
            </div>
          </div>

          {/* Card: Membros */}
          <div className="stat-card shadow-sm d-flex align-items-center p-4" style={{ minWidth: "240px" }}>
            <div className="stat-icon me-4">
              <i className="bi bi-cpu text-primary" style={{ fontSize: '4rem' }}></i>
            </div>
            <div className="text-start">
              <h1 className="fw-bold text-primary mb-0">{stats.members}</h1>
              <p className="text-muted mb-0">Membros</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;