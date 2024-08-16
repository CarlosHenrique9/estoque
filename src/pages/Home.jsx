import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";

export default function Home() {
  const { items } = useStock();
  // Verificando se items está definido antes de acessá-lo
  const diversity = items ? items.length : 0;
  const inventoryTotal = items ? items.reduce((sum, item) => +sum + +item.quantity, 0) : 0;

  const today = new Date()
  const limitDate = new Date()
  limitDate.setDate(limitDate.getDate() - 10)
  
  // Filtrando items apenas se estiver definido
  const recentitems = items ? items.filter((item) => item.createdAt >= limitDate && item.createdAt <= today) : [];
  const recentTotal = recentitems.length;

  // Filtrando items apenas se estiver definido
  const lowQuantityitems = items ? items.filter((item) => item.quantity < 10) : [];
  const lowQuantityTotal = lowQuantityitems.length;

  return (
    <main>
      {/* Se items não estiver definido, a renderização dos cards será vazia */}
      <h1>Dashboard</h1>
      <div className="row">
        <div className="dashboard-card">
          Diversidade de itens
          <span>{diversity}</span>
        </div>
        <div className="dashboard-card">
          Inventário total
          <span>{inventoryTotal}</span>
        </div>
        <div className="dashboard-card">
          Itens recentes
          <span>{recentTotal}</span>
        </div>
        <div className="dashboard-card">
          Itens acabando
          <span>{lowQuantityTotal}</span>
        </div>
      </div>
      <div className="row">
        <div className="recent">
          <table>
            <thead>
              <tr><th>Itens Recentes</th>
              <th>Ações</th>
            </tr>
            </thead>
            <tbody>
              {/* Mapeando recentItems apenas se items estiver definido */}
              {items && recentitems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td><Link to={`/items/${item.id}`} className="button is-small">Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="low">
          <table>
            <thead>
              <tr>
                <th>Itens acabando</th>
                <th>Qtd.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeando lowQuantityitems apenas se items estiver definido */}
              {items && lowQuantityitems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td><Link to={`/items/${item.id}`} className="button is-small">Ver</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
