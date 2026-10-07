import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh', fontFamily: 'Nunito, sans-serif' }}>
        <h3>Verificando permissões...</h3>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/Tech-Museum/member-login" replace />;
  }

  if (user.role !== 'member') {
    alert("Acesso negado: Você não tem permissão de administrador para acessar esta área.");
    
    return <Navigate to="/Tech-Museum/" replace />;
  }

  return children;
};

export default ProtectedRoute;