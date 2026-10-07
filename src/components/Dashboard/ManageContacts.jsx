import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../services/api"; 
import "./Dashboard.css";

import Swal from "sweetalert2";

const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/contacts");
      
      setContacts(response.data || response.data.data || []);
      
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id, name) => {
    Swal.fire({
      title: 'Tem a certeza?',
      text: `Deseja apagar permanentemente a mensagem de "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d3b66',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/contacts/${id}`);
          setContacts(contacts.filter(c => c._id !== id));
          
          Swal.fire({
            title: 'Apagada!',
            text: 'A mensagem foi removida da caixa de entrada.',
            icon: 'success',
            confirmButtonColor: '#0d3b66'
          });
        } catch (error) {
          console.error("Erro ao apagar mensagem:", error);
          Swal.fire({
            title: 'Erro!',
            text: 'Ocorreu um erro ao tentar apagar a mensagem.',
            icon: 'error',
            confirmButtonColor: '#0d3b66'
          });
        }
      }
    });
  };

  return (
    <>
      <Helmet><title>Gestão de Contactos | Museu Tech</title></Helmet>
      
      <section className="dashboard-section mt-5">
        <div className="container">
          <div className="dashboard-card shadow">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Mensagens Recebidas</h2>
              <Link to="/Tech-Museum/dashboard" className="dashboard-btn dashboard-btn-outline">Voltar</Link>
            </div>

           {isLoading ? (
              <div className="text-center py-5 my-5">
                <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} role="status">
                  <span className="visually-hidden">A carregar...</span>
                </div>
                <h5 className="mt-3 text-muted" style={{ fontWeight: '600' }}>A carregar mensagens...</h5>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Nome</th>
                      <th>E-mail</th>
                      <th>Assunto</th>
                      <th>Mensagem</th>
                      <th>Data</th>
                      <th className="text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c._id}>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.email}</td>
                        <td>{c.subject}</td>
                        <td>{c.message}</td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                        <td className="text-center">
                          <button 
                            onClick={() => handleDelete(c._id, c.name)} 
                            className="btn btn-sm btn-outline-danger"
                            title="Excluir Mensagem"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {contacts.length === 0 && (
                      <tr><td colSpan="6" className="text-center py-4">Nenhuma mensagem nova.</td></tr>
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

export default ManageContacts;