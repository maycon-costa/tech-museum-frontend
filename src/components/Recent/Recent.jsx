//Developed by Amadeus Ferrp (https://www.linkedin.com/in/amadeusferro) / (https://github.com/amadeusferro) / (https://www.instagram.com/amadeus.ferro/) / (contact.amadeusferro@gmail.com);
//Translated by Amadeus Ferro (https://www.linkedin.com/in/amadeusferro) / (https://github.com/amadeusferro) / (https://www.instagram.com/amadeus.ferro/) / (contact.amadeusferro@gmail.com);

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import blogService from "../../services/blogService";
import "./Recent.css";

function Recent() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "pt";

  const [recentPosts, setRecentPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getAll(1, 3);
        setRecentPosts(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar posts recentes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <>
      <section id="recent-blog-posts" className="recent-blog-posts">
        <div className="container" data-aos="fade-up">
          <header className="section-header">
            <h2>
              <Link to="/Tech-Museum/blog">{t("recent.description")}</Link>
            </h2>
            <p>{t("recent.headline")}</p>
          </header>

          <div className="row">
            {isLoading ? (
              <div className="text-center py-5">A carregar artigos recentes...</div>
            ) : recentPosts.length === 0 ? (
              <div className="text-center py-5 text-muted">Nenhum artigo publicado recentemente.</div>
            ) : (
              recentPosts.map((post) => {
                const title = post.title?.[currentLang] || post.title?.pt || "Sem título";
                const date = new Date(post.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-PT');

                return (
                  <div className="col-lg-4 mb-4" key={post._id}>
                    <div className="post-box d-flex flex-column h-100 shadow-sm rounded">
                      <div className="post-img">
                        <img 
                          src={post.imageUrl} 
                          className="img-fluid rounded-top" 
                          alt={title} 
                          style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                        />
                      </div>
                      
                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <span className="post-date text-muted mb-2">{date}</span>
                        <h3 className="post-title mb-4 fs-5">{title}</h3>
                        
                        <Link
                          to={`/Tech-Museum/blog/single/${post._id}`}
                          className="readmore mt-auto d-flex align-items-center fw-bold"
                          style={{ color: 'var(--bs-primary)', textDecoration: 'none' }}
                        >
                          <span className="me-2">{t("recent.read_more")}</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
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

export default Recent;