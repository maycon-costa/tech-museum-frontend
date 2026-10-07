import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import galleryService from "../../services/galleryService";
import { useTranslation } from "react-i18next";
import "./Dashboard.css";
import Swal from "sweetalert2";

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const { i18n } = useTranslation();
  const currentLang = i18n.language || "pt";

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const data = await galleryService.getAll(1, 50); 
      setItems(data.items || data.data || data);
    } catch (error) {
      console.error("Erro ao carregar acervo", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id, title) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: `Deseja apagar permanentemente a peça "${title}"? Esta ação não pode ser desfeita!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', 
      cancelButtonColor: '#0d3b66',  
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await galleryService.delete(id);
          setItems(items.filter(item => item._id !== id)); 
          
          Swal.fire({
            title: 'Apagada!',
            text: 'A peça foi removida do acervo com sucesso.',
            icon: 'success',
            confirmButtonColor: '#0d3b66'
          });
        } catch (error) {
          console.error("Erro ao deletar:", error);
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao tentar apagar a peça do servidor.',
            icon: 'error',
            confirmButtonColor: '#0d3b66'
          });
        }
      }
    });
  };

  const filteredItems = items.filter(item => {
    const title = item.title?.[currentLang] || item.title?.pt || "Sem título";
    const searchLower = searchTerm.toLowerCase();
    
    return (
      title.toLowerCase().includes(searchLower) ||
      (item.category && item.category.toLowerCase().includes(searchLower)) ||
      (item.releaseYear && item.releaseYear.toString().includes(searchLower))
    );
  });

  return (
    <>
      <Helmet><title>Gerenciar Acervo | Museu Tech</title></Helmet>
      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="dashboard-card shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Gerenciar Acervo</h2>
              <div>
                <Link to="/Tech-Museum/dashboard/add-gallery" className="btn-primary-action me-2">+ Nova Peça</Link>
                <Link to="/Tech-Museum/dashboard" className="btn-primary-action">Voltar</Link>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <div className="input-group shadow-sm">
                  <span className="input-group-text bg-white border-end-0 text-primary">
                    <i className="bi bi-search"></i>
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-start-0" 
                    placeholder="Pesquisar por nome, categoria ou ano..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ boxShadow: 'none' }}
                  />
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border" style={{ width: '3rem', height: '3rem', color: '#0d3b66' }} role="status">
                  <span className="visually-hidden">A carregar...</span>
                </div>
                <h5 className="mt-3 text-muted" style={{ fontWeight: '600' }}>A carregar o acervo...</h5>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Imagem</th>
                      <th>Nome da Peça</th>
                      <th>Categoria</th>
                      <th>Ano</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => {
                      const title = item.title?.[currentLang] || item.title?.pt || "Sem título";
                      return (
                        <tr key={item._id}>
                          <td>
                            <img src={item.imageUrl} alt={title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                          </td>
                          <td className="fw-bold">{title}</td>
                          <td><span className="badge bg-secondary">{item.category}</span></td>
                          <td>{item.releaseYear}</td>
                          <td className="text-center">
                            <Link to={`/Tech-Museum/dashboard/edit-gallery/${item._id}`} className="btn-table-action btn-edit" title="Editar Peça">
                              <i className="bi bi-pencil-square"></i>
                            </Link>
                            <button onClick={() => handleDelete(item._id, title)} className="btn-table-action btn-delete" title="Excluir Peça">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          Nenhuma peça encontrada com esse termo.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageGallery;