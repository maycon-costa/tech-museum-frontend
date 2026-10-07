//Developed by Amadeus Ferrp (https://www.linkedin.com/in/amadeusferro) / (https://github.com/amadeusferro) / (https://www.instagram.com/amadeus.ferro/) / (contact.amadeusferro@gmail.com);
//Translated by Amadeus Ferro (https://www.linkedin.com/in/amadeusferro) / (https://github.com/amadeusferro) / (https://www.instagram.com/amadeus.ferro/) / (contact.amadeusferro@gmail.com);

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import galleryService from "../../services/galleryService";
import "./Portfolio.css";

function Portfolio() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "pt";

  // Estados para gerir os dados da API e o filtro ativo
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Busca as peças do banco de dados quando a página carrega
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        // Traz as 9 peças mais recentes para preencher a grelha
        const response = await galleryService.getAll(1, 9);
        
        // DETETIVE: Imprime os dados no F12 para debug caso algo falhe
        console.log("DADOS DA GALERIA VINDOS DA NUVEM:", response);
        
        // Estratégia à prova de bala: se for um array, usa direto. Se tiver dentro de .data, desempacota.
        const items = response.items || response.data || [];
        
        setPortfolioItems(items);
      } catch (error) {
        console.error("Erro ao buscar as peças do acervo:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filtro "À Prova de Balas": ignora letras maiúsculas/minúsculas e espaços em branco!
  const filteredItems = portfolioItems.filter((item) => {
    if (filter === "all") return true;
    
    // Verifica se existe category ou categoria e compara tudo em minúsculas
    const itemCat = item.category || item.categoria || ""; 
    return itemCat.toLowerCase().trim() === filter.toLowerCase().trim();
  });

  return (
    <>
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <h2>
              <Link to="/Tech-Museum/gallery">
                {t("portfolio.description")}
              </Link>
            </h2>
            <p>{t("portfolio.headline")}</p>
          </header>

          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li
                  className={filter === "all" ? "filter-active" : ""}
                  onClick={() => handleFilterChange("all")}
                >
                  {t("portfolio.portfolio_fiters.all")}
                </li>
                <li
                  className={filter === "Console" ? "filter-active" : ""}
                  onClick={() => handleFilterChange("Console")}
                >
                  {t("portfolio.portfolio_fiters.consoles")}
                </li>
                <li
                  className={filter === "PC" ? "filter-active" : ""}
                  onClick={() => handleFilterChange("PC")}
                >
                  {t("portfolio.portfolio_fiters.pc")}
                </li>
                <li
                  className={filter === "Hardware" ? "filter-active" : ""}
                  onClick={() => handleFilterChange("Hardware")}
                >
                  {t("portfolio.portfolio_fiters.hardware")}
                </li>
              </ul>
            </div>
          </div>

          <div
            className="row gy-4 portfolio-container"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {isLoading ? (
              <div className="col-12 text-center py-5">
                <p>A carregar o acervo do museu...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="col-12 text-center py-5 text-muted">
                <p>Nenhuma peça encontrada para esta categoria.</p>
              </div>
            ) : (
              filteredItems.map((item) => {
                // Desempacota o título consoante o idioma
                const title = item.title?.[currentLang] || item.title?.pt || "Peça sem título";
                // A URL agora usa o _id real do MongoDB
                const detailsUrl = `/Tech-Museum/gallery/details/${item._id}`;
                // Pega a categoria correta para exibir
                const categoryDisplay = item.category || item.categoria || "Sem categoria";
                
                return (
                  <div
                    key={item._id}
                    className="col-lg-4 col-md-6 portfolio-item"
                  >
                    <div className="portfolio-wrap shadow-sm rounded">
                      <img 
                        src={item.imageUrl} 
                        className="img-fluid" 
                        alt={title} 
                        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                      />
                      <div className="portfolio-info">
                        <h4>{title}</h4>
                        <p>{categoryDisplay}</p>
                        <div className="portfolio-links">
                          <Link
                            to={detailsUrl}
                            title={t("portfolio.more_details")}
                          >
                            <i className="bi bi-link"></i>
                          </Link>
                          <Link to={detailsUrl} title={t("portfolio.3d_view")}>
                            <i className="bi bi-badge-3d"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;