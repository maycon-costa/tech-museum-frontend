import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import galleryService from "../../services/galleryService";
import "./Dashboard.css";

const AddGalleryItem = () => {
  const navigate = useNavigate();
  
  const [titlePt, setTitlePt] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleJa, setTitleJa] = useState("");

  const [descPt, setDescPt] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descJa, setDescJa] = useState("");

  const [category, setCategory] = useState("PC");
  const [releaseYear, setReleaseYear] = useState("");
  const [image, setImage] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      
      const titleObject = { pt: titlePt, en: titleEn, ja: titleJa };
      const descObject = { pt: descPt, en: descEn, ja: descJa };

      formData.append("title", JSON.stringify(titleObject));
      formData.append("description", JSON.stringify(descObject));
      formData.append("category", category);
      formData.append("releaseYear", releaseYear);
      formData.append("image", image); 

      await galleryService.create(formData);
      
      navigate("/Tech-Museum/gallery");
    } catch (err) {
      console.error("Erro ao adicionar peça:", err);
      setError("Ocorreu um erro ao enviar a peça. Verifique se preencheu todos os campos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Adicionar Peça | Museu Tech</title>
      </Helmet>
      
      <div className="container mt-5 pt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow p-4 mt-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Adicionar Nova Peça ao Acervo</h2>
                <Link to="/Tech-Museum/dashboard" className="btn btn-outline-secondary btn-sm">
                  Voltar ao Painel
                </Link>
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row bg-light p-3 rounded mb-4">
                  <h5 className="mb-3 text-primary">Informações Básicas</h5>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Categoria</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                      <option value="PC">PC</option>
                      <option value="Console">Console</option>
                      <option value="Hardware">Hardware</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ano de Lançamento</label>
                    <input type="number" className="form-control" required value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label text-danger fw-bold"><i className="bi bi-cloud-upload me-2"></i>Imagem da Peça (Obrigatório)</label>
                    <input type="file" className="form-control" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} />
                  </div>
                </div>

                <div className="row mb-4">
                  <h5 className="mb-3 text-primary">Nomes da Peça (Internacionalização)</h5>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nome (PT) 🇧🇷</label>
                    <input type="text" className="form-control border-success" required value={titlePt} onChange={(e) => setTitlePt(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nome (EN) 🇺🇸</label>
                    <input type="text" className="form-control border-primary" required value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Nome (JA) 🇯🇵</label>
                    <input type="text" className="form-control border-danger" required value={titleJa} onChange={(e) => setTitleJa(e.target.value)} />
                  </div>
                </div>

                <div className="row mb-4">
                  <h5 className="mb-3 text-primary">História / Descrição</h5>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Descrição (PT) 🇧🇷</label>
                    <textarea className="form-control border-success" rows="4" required value={descPt} onChange={(e) => setDescPt(e.target.value)}></textarea>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Descrição (EN) 🇺🇸</label>
                    <textarea className="form-control border-primary" rows="4" required value={descEn} onChange={(e) => setDescEn(e.target.value)}></textarea>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Descrição (JA) 🇯🇵</label>
                    <textarea className="form-control border-danger" rows="4" required value={descJa} onChange={(e) => setDescJa(e.target.value)}></textarea>
                  </div>
                </div>

                <hr />
                <button type="submit" className="dashboard-btn dashboard-btn-primary w-100 fs-5 mt-3" disabled={isLoading}>
                  {isLoading ? "A fazer Upload para a Nuvem..." : "Guardar Peça no Museu"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGalleryItem;