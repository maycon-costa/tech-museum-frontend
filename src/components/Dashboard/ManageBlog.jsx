import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api"; 
import "./Dashboard.css"; 
import Swal from "sweetalert2";

const ManageBlog = () => {
  const [posts, setPosts] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await api.get("/blog");
      setPosts(response.data.data || []);
    } catch (error) {
      console.error("Erro ao carregar posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id, title) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: `Deseja apagar permanentemente o artigo "${title}"? Esta ação não pode ser desfeita!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d3b66',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/blog/${id}`);
          setPosts(posts.filter((p) => p._id !== id));
          
          Swal.fire({
            title: 'Apagado!',
            text: 'O artigo foi removido do blog com sucesso.',
            icon: 'success',
            confirmButtonColor: '#0d3b66'
          });
        } catch (error) {
          console.error("Erro ao apagar artigo:", error);
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao tentar apagar o artigo.',
            icon: 'error',
            confirmButtonColor: '#0d3b66'
          });
        }
      }
    });
  };

  const filteredPosts = posts.filter(post => {
    const title = post.title?.pt || "";
    const author = post.author || "";
    const searchLower = searchTerm.toLowerCase();

    return (
      title.toLowerCase().includes(searchLower) ||
      author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <Helmet><title>Gestão de Blog | Museu Tech</title></Helmet>

      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="dashboard-card shadow">
            
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Gerenciar Publicações do Blog</h2>
              <div>
                <Link to="/Tech-Museum/dashboard/add-blog" className="btn-primary-action me-2">
                  + Novo Artigo
                </Link>
                <Link to="/Tech-Museum/dashboard" className="btn-primary-action">
                  Voltar
                </Link>
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
                    placeholder="Pesquisar por título ou autor..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ boxShadow: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Capa</th>
                    <th>Título do Artigo</th>
                    <th>Autor</th>
                    <th>Data</th>
                    <th className="text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post._id}>
                      <td>
                        <img src={post.imageUrl} alt={post.title.pt} style={{ width: "80px", borderRadius: "4px" }} />
                      </td>
                      <td><strong>{post.title.pt}</strong></td>
                      <td>{post.author}</td>
                      <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td className="text-center">
                        <Link to={`/Tech-Museum/dashboard/edit-blog/${post._id}`} className="btn-table-action" title="Editar Artigo">
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        
                        <button onClick={() => handleDelete(post._id, post.title.pt)} className="btn-table-action" title="Excluir Artigo">
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                  {filteredPosts.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          Nenhum artigo encontrado com esse termo.
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageBlog;