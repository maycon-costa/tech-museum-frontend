import { useState, useEffect } from "react";
import "./Gallery.css";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import galleryService from "../../services/galleryService"; 

function Gallery() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setIsLoading(true);
        const data = await galleryService.getAll();
        const itemsArray = data.items || data.data || data; 
        setItems(itemsArray);
      } catch (err) {
        console.error("Erro ao buscar a galeria:", err);
        setError("Erro ao carregar o acervo.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGalleryItems();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("page_titles.gallery")}</title>
      </Helmet>
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="portfolio-flters">
                <li className={filter === "all" ? "filter-active" : ""} onClick={() => handleFilterChange("all")}>{t("gallery.portfolio_fiters.all")}</li>
                <li className={filter === "Console" ? "filter-active" : ""} onClick={() => handleFilterChange("Console")}>{t("gallery.portfolio_fiters.consoles")}</li>
                <li className={filter === "PC" ? "filter-active" : ""} onClick={() => handleFilterChange("PC")}>{t("gallery.portfolio_fiters.pc")}</li>
                <li className={filter === "Hardware" ? "filter-active" : ""} onClick={() => handleFilterChange("Hardware")}>{t("gallery.portfolio_fiters.hardware")}</li>
              </ul>
            </div>
          </div>

          {isLoading && <div className="text-center py-5">Carregando acervo...</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {!isLoading && !error && (
            <div className="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">
              {items
                .filter((item) => filter === "all" || item.category === filter)
                .map((item) => {
                  const detailsUrl = `/Tech-Museum/gallery/details/${item._id}`;
                  const currentLang = i18n.language || "pt"; 
                  const dynamicTitle = item.title?.[currentLang] || item.title?.pt;

                  return (
                    <div key={item._id} className={`col-lg-4 col-md-6 portfolio-item filter-${item.category}`}>
                      <div className="portfolio-wrap">
                        <img src={item.imageUrl} className="img-fluid" alt={dynamicTitle} />
                        <div className="portfolio-info">
                          <h4>{dynamicTitle}</h4>
                          <p>{item.category}</p>
                          <div className="portfolio-links">
                            <Link to={detailsUrl} title={t("gallery.more_details")}><i className="bi bi-link"></i></Link>
                            <Link to={detailsUrl} title={t("gallery.3d_view")}><i className="bi bi-badge-3d"></i></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Gallery;