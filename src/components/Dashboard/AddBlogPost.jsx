import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../contexts/AuthContext";
import blogService from "../../services/blogService";
import "./Dashboard.css"; 

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const AddBlogPost = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [titlePt, setTitlePt] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleJa, setTitleJa] = useState("");
  
  const [contentPt, setContentPt] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentJa, setContentJa] = useState("");

  const [image, setImage] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!contentPt || contentPt === '<p><br></p>' || 
        !contentEn || contentEn === '<p><br></p>' || 
        !contentJa || contentJa === '<p><br></p>') {
      setError("Por favor, preencha o conteúdo do artigo nos três idiomas.");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      
      const titleObject = { pt: titlePt, en: titleEn, ja: titleJa };
      const contentObject = { pt: contentPt, en: contentEn, ja: contentJa };

      formData.append("title", JSON.stringify(titleObject));
      formData.append("content", JSON.stringify(contentObject));
      formData.append("author", user?.name || "Administrador"); 
      formData.append("image", image);

      await blogService.create(formData);
      
      navigate("/Tech-Museum/dashboard/manage-blog");
    } catch (err) {
      console.error("Erro ao publicar post:", err);
      setError("Ocorreu um erro ao publicar o artigo. Verifique todos os campos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Escrever Post | Museu Tech</title></Helmet>
      
      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="dashboard-card shadow">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Escrever Novo Artigo</h2>
                  <Link to="/Tech-Museum/dashboard/manage-blog" className="dashboard-btn dashboard-btn-outline" style={{ padding: '8px 15px', fontSize: '14px' }}>
                    Voltar
                  </Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="dashboard-form">
                  
                  <div className="mb-5">
                    <h5 className="dashboard-section-title">Capa do Artigo</h5>
                    <div className="row">
                      <div className="col-md-8 mb-3">
                        <label><i className="bi bi-image me-2 text-primary"></i>Imagem de Capa (Obrigatório)</label>
                        <input type="file" className="form-control" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Autor</label>
                        <input type="text" className="form-control bg-light" value={user?.name || "Administrador"} disabled />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h5 className="dashboard-section-title">Títulos do Artigo</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label>Título (PT) 🇧🇷</label>
                        <input type="text" className="form-control border-success" required value={titlePt} onChange={(e) => setTitlePt(e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Título (EN) 🇺🇸</label>
                        <input type="text" className="form-control border-primary" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Título (JA) 🇯🇵</label>
                        <input type="text" className="form-control border-danger" required value={titleJa} onChange={(e) => setTitleJa(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="dashboard-section-title">Corpo do Texto</h5>
                    <div className="row">
                      <div className="col-12 mb-5">
                        <label className="fw-bold mb-2">Conteúdo (PT) 🇧🇷</label>
                        <ReactQuill theme="snow" modules={modules} value={contentPt} onChange={setContentPt} style={{ height: '200px', marginBottom: '40px' }} />
                      </div>
                      <div className="col-12 mb-5">
                        <label className="fw-bold mb-2">Conteúdo (EN) 🇺🇸</label>
                        <ReactQuill theme="snow" modules={modules} value={contentEn} onChange={setContentEn} style={{ height: '200px', marginBottom: '40px' }} />
                      </div>
                      <div className="col-12 mb-5">
                        <label className="fw-bold mb-2">Conteúdo (JA) 🇯🇵</label>
                        <ReactQuill theme="snow" modules={modules} value={contentJa} onChange={setContentJa} style={{ height: '200px', marginBottom: '40px' }} />
                      </div>
                    </div>
                  </div>

                  <hr style={{ borderColor: '#e6e6e6', margin: '30px 0' }} />
                  <button type="submit" className="dashboard-btn dashboard-btn-primary w-100 fs-5 mt-3" disabled={isLoading}>
                    {isLoading ? "A Publicar Artigo na Nuvem..." : "Publicar Artigo no Blog"}
                  </button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddBlogPost;