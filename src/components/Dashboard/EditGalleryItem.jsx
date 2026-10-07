import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import galleryService from "../../services/galleryService";
import "./Dashboard.css"; 
const EditGalleryItem = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [titlePt, setTitlePt] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleJa, setTitleJa] = useState("");
  const [descPt, setDescPt] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descJa, setDescJa] = useState("");
  const [category, setCategory] = useState("PC");
  const [releaseYear, setReleaseYear] = useState("");
  
  const [currentImage, setCurrentImage] = useState(""); 
  const [newImage, setNewImage] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await galleryService.getById(id);
        
        setTitlePt(data.title?.pt || "");
        setTitleEn(data.title?.en || "");
        setTitleJa(data.title?.ja || "");
        
        setDescPt(data.description?.pt || "");
        setDescEn(data.description?.en || "");
        setDescJa(data.description?.ja || "");
        
        setCategory(data.category || "PC");
        setReleaseYear(data.releaseYear || "");
        setCurrentImage(data.imageUrl); 
        
      } catch (err) {
        console.error("Erro ao buscar a peça:", err);
        setError("Erro ao carregar os dados da peça.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const formData = new FormData();
      
      const titleObject = { pt: titlePt, en: titleEn, ja: titleJa };
      const descObject = { pt: descPt, en: descEn, ja: descJa };

      formData.append("title", JSON.stringify(titleObject));
      formData.append("description", JSON.stringify(descObject));
      formData.append("category", category);
      formData.append("releaseYear", releaseYear);
      
      if (newImage) {
        formData.append("image", newImage);
      }

      await galleryService.update(id, formData);
      
      navigate("/Tech-Museum/dashboard/manage-gallery");
    } catch (err) {
      console.error("Erro ao atualizar peça:", err);
      setError("Ocorreu um erro ao atualizar a peça. Verifique a sua ligação.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-5 mt-5" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="spinner-border" style={{ width: '4rem', height: '4rem', color: '#0d3b66' }} role="status"></div>
        <h3 className="mt-4 text-muted">A carregar dados da peça...</h3>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Editar Peça | Museu Tech</title>
      </Helmet>
      
      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="dashboard-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Editar Peça do Acervo</h2>
                  <Link to="/Tech-Museum/dashboard/manage-gallery" className="dashboard-btn dashboard-btn-outline" style={{ padding: '8px 15px', fontSize: '14px' }}>
                    Cancelar
                  </Link>
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit} className="dashboard-form">
                
                  <div className="mb-5">
                    <h5 className="dashboard-section-title">Informações Básicas</h5>
                    <div className="row align-items-center">
                      <div className="col-md-4 mb-3">
                        <label>Categoria</label>
                        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value="PC">PC</option>
                          <option value="Console">Consola</option>
                          <option value="Hardware">Hardware</option>
                        </select>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Ano de Lançamento</label>
                        <input type="number" className="form-control" required value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-3 text-center">
                         <label className="d-block">Imagem Atual</label>
                         {currentImage && (
                           <img src={currentImage} alt="Atual" className="img-thumbnail" style={{ height: '80px', objectFit: 'cover' }} />
                         )}
                      </div>
                      <div className="col-12 mb-3 mt-2">
                        <label><i className="bi bi-image me-2 text-primary"></i>Trocar Imagem (Deixe em branco para manter a atual)</label>
                        <input type="file" className="form-control" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h5 className="dashboard-section-title">Nomes da Peça</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label>Nome (PT) 🇧🇷</label>
                        <input type="text" className="form-control" required value={titlePt} onChange={(e) => setTitlePt(e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Nome (EN) 🇺🇸</label>
                        <input type="text" className="form-control" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Nome (JA) 🇯🇵</label>
                        <input type="text" className="form-control" required value={titleJa} onChange={(e) => setTitleJa(e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="dashboard-section-title">História / Descrição</h5>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label>Descrição (PT) 🇧🇷</label>
                        <textarea className="form-control" rows="5" required value={descPt} onChange={(e) => setDescPt(e.target.value)}></textarea>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Descrição (EN) 🇺🇸</label>
                        <textarea className="form-control" rows="5" required value={descEn} onChange={(e) => setDescEn(e.target.value)}></textarea>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label>Descrição (JA) 🇯🇵</label>
                        <textarea className="form-control" rows="5" required value={descJa} onChange={(e) => setDescJa(e.target.value)}></textarea>
                      </div>
                    </div>
                  </div>

                  <hr style={{ borderColor: '#e6e6e6', margin: '30px 0' }} />
                  
                  <button type="submit" className="dashboard-btn dashboard-btn-primary w-100" disabled={isSaving}>
                    {isSaving ? "A Atualizar a Nuvem..." : "Salvar Alterações"}
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

export default EditGalleryItem;