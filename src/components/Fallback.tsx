import { useNavigate } from "react-router-dom";

// Компонент fallback
export function Fallback({ resetError }: { resetError: () => void }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
	resetError();      // скидаємо стан помилки
	navigate("/");      // перекидаємо на головну
  };

  return (
	<div style={{ padding: "20px", textAlign: "center" }}>
	  <h2>Ой! Щось пішло не так 😅</h2>
	  <button onClick={handleGoHome}>На головну</button>
	</div>
  );
}