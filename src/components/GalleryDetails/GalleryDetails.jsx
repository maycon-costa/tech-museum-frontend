import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import "./GalleryDetails.css";
import galleryService from "../../services/galleryService";

function GalleryDetails() {
  const { id } = useParams(); 
  const { t, i18n } = useTranslation();
  
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setIsLoading(true);
        const data = await galleryService.getById(id);
        setItem(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da peça:", err);
        setItem(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (isLoading) {
    return (
      <main id="main">
        <section className="inner-page text-center py-5">
           <h2>Carregando detalhes...</h2>
        </section>
      </main>
    );
  }

  if (!item) {
    return <Navigate to="/Tech-Museum/*" />;
  }

  const currentLang = i18n.language || "pt";
  const dynamicTitle = item.title?.[currentLang] || item.title?.pt;
  const dynamicDesc = item.description?.[currentLang] || item.description?.pt;

  return (
    <>
      <Helmet>
        <title>{dynamicTitle}</title>
      </Helmet>
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/Tech-Museum/">Home</Link></li>
              <li><Link to="/Tech-Museum/gallery">{t("gallery_details.page_name")}</Link></li>
              <li>{dynamicTitle}</li>
            </ol>
            <h2>{dynamicTitle}</h2>
          </div>
        </section>

        <section className="inner-page">
          <div className="container">
            <section id="portfolio-details" className="portfolio-details">
              <div className="container">
                <div className="row gy-4">
                  
                  {/* Imagem vinda do Cloudinary */}
                  <div className="col-lg-8">
                    <div className="portfolio-details-slider">
                      <img src={item.imageUrl} alt={dynamicTitle} className="img-fluid w-100 rounded" />
                    </div>
                  </div>

                  {/* Informações vindas do MongoDB */}
                  <div className="col-lg-4">
                    <div className="portfolio-info">
                      <h3>{t("gallery_details.product_information")}</h3>
                      <ul>
                        <li><strong>{t("gallery_details.category")}:</strong> {item.category}</li>
                        <li><strong>{t("gallery_details.manufacturing_date")}:</strong> {item.releaseYear}</li>
                        <li><strong>Adicionado em:</strong> {new Date(item.createdAt).toLocaleDateString()}</li>
                      </ul>
                    </div>
                    <div className="portfolio-description">
                      <h2>{t("gallery_details.details")}</h2>
                      <p>{dynamicDesc}</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}

export default GalleryDetails;