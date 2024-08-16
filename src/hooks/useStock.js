import { useContext } from "react";
import { StockContext } from "../pages/contexts/StockContext.jsx";

export default function useStock() {
  const stockContext = useContext(StockContext);

  if (!stockContext) {
    throw new Error("useStock must be used within a StockContextProvider");
  }

  const { addItem, updateItem } = stockContext;

  return { addItem, updateItem };
}
