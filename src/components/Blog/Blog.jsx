import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import blogService from "../../services/blogService";
import "./Blog.css";

const Blog = () => {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.language || "pt";

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await blogService.getAll(1, 10);
        setPosts(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar os artigos do blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="text-center py-5" style={{ minHeight: '50vh' }}>A carregar os artigos do blog...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Blog | Museu Tech</title>
      </Helmet>

      <section className="blog">
        <div className="container">
          <div className="row">
            
            <div className="col-lg-8 entries">
              {posts.length === 0 ? (
                <div className="alert alert-info">Nenhum artigo publicado ainda.</div>
              ) : (
                posts.map((post) => {
                  const title = post.title?.[currentLang] || post.title?.pt || "Sem título";
                  const content = post.content?.[currentLang] || post.content?.pt || "";
                  const contentPreview = content.length > 180 ? content.substring(0, 180) + "..." : content;

                  return (
                    <article className="entry" key={post._id}>
                      <div className="entry-img">
                        <img src={post.imageUrl} alt={title} className="img-fluid" style={{ width: '100%', objectFit: 'cover' }} />
                      </div>

                      <h2 className="entry-title">
                        <Link to={`/Tech-Museum/blog/single/${post._id}`}>{title}</Link>
                      </h2>

                      <div className="entry-meta">
                        <ul>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-person"></i> <span className="text-muted">{post.author}</span>
                          </li>
                          <li className="d-flex align-items-center">
                            <i className="bi bi-clock"></i> 
                            <span className="text-muted">
                              {new Date(post.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-PT')}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="entry-content">
                        <p>{contentPreview}</p>
                        <div className="read-more">
                          <Link to={`/Tech-Museum/blog/single/${post._id}`}>Ler Mais</Link>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
            
            <div className="col-lg-4">
              <div className="sidebar">
                <h3 className="sidebar-title">Pesquisar</h3>
                <div className="sidebar-item search-form">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Procurar no blog..." />
                    <button type="submit"><i className="bi bi-search"></i></button>
                  </form>
                </div>
                
                <h3 className="sidebar-title mt-4">Artigos Recentes</h3>
                <div className="sidebar-item recent-posts">
                  {posts.slice(0, 5).map(post => {
                    const title = post.title?.[currentLang] || post.title?.pt;
                    return (
                      <div className="post-item clearfix" key={`sidebar-${post._id}`}>
                        <img src={post.imageUrl} alt="" style={{ objectFit: 'cover' }} />
                        <h4><Link to={`/Tech-Museum/blog/single/${post._id}`}>{title}</Link></h4>
                        <time>{new Date(post.createdAt).toLocaleDateString()}</time>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;