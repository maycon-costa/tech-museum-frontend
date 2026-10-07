import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/AuthContext";
import blogService from "../../services/blogService";
import api from "../../services/api"; 
import "./BlogSingle.css"; 

const BlogSingle = () => {
  const { id } = useParams(); 
  const { t, i18n } = useTranslation();
  const { user } = useContext(AuthContext); 
  const currentLang = i18n.language || "pt";

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await blogService.getById(id);
      setPost(data);
    } catch (error) {
      console.error("Erro ao carregar o artigo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0); 
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const authorName = user?.name || commentName || "Visitante Anônimo";
      
      await api.post(`/blog/${id}/comments`, {
        author: authorName,
        text: commentText
      });
      
      setCommentText("");
      setCommentName("");
      fetchPost(); 
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
      alert("Não foi possível enviar o comentário.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="text-center py-5 mt-5">A carregar artigo...</div>;
  if (!post) return <div className="text-center py-5 mt-5">Artigo não encontrado.</div>;

  const title = post.title?.[currentLang] || post.title?.pt || "";
  const content = post.content?.[currentLang] || post.content?.pt || "";

  return (
    <>
      <Helmet><title>{title} | Museu Tech</title></Helmet>

      <section className="blog mt-5 pt-4">
        <div className="container">
          <div className="row justify-content-center">
            
            <div className="col-lg-8 entries">
              <article className="entry entry-single shadow-sm rounded p-4 bg-white">
                <div className="entry-img mb-4">
                  <img src={post.imageUrl} alt={title} className="img-fluid rounded" style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
                </div>

                <h2 className="entry-title mb-3">{title}</h2>

                <div className="entry-meta mb-4 pb-3 border-bottom">
                  <ul className="d-flex list-unstyled gap-4 text-muted mb-0">
                    <li><i className="bi bi-person text-primary me-2"></i> {post.author}</li>
                    <li>
                      <i className="bi bi-clock text-primary me-2"></i> 
                      {new Date(post.createdAt).toLocaleDateString(currentLang === 'en' ? 'en-US' : 'pt-PT')}
                    </li>
                  </ul>
                </div>

                <div className="entry-content">
                  <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>{content}</p>
                </div>
              </article>

              <div className="blog-comments mt-5">
                <h4 className="comments-count">{post.comments?.length || 0} Comentários</h4>

                {post.comments?.map((comment, index) => (
                  <div key={index} className="comment d-flex mb-4 p-3 bg-light rounded">
                    <div className="flex-shrink-0 me-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '20px' }}>
                        {comment.author.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <h5>{comment.author}</h5>
                      <time className="text-muted small d-block mb-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </time>
                      <p className="mb-0">{comment.text}</p>
                    </div>
                  </div>
                ))}

                <div className="reply-form bg-white p-4 rounded shadow-sm mt-4">
                  <h4>Deixe um Comentário</h4>
                  <p>O seu endereço de e-mail não será publicado.</p>
                  
                  <form onSubmit={handleCommentSubmit}>
                    {!user && (
                      <div className="row">
                        <div className="col-md-6 form-group mb-3">
                          <input type="text" className="form-control" placeholder="O seu Nome (Opcional)" value={commentName} onChange={(e) => setCommentName(e.target.value)} />
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div className="col form-group mb-3">
                        <textarea className="form-control" placeholder="Escreva o seu comentário aqui..." required rows="4" value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      {isSubmitting ? "A Enviar..." : "Publicar Comentário"}
                    </button>
                  </form>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSingle;