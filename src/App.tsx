import { useEffect, useState, createContext } from "react";
import "./index.css";
import { UserPage } from "../components/userInterface/UserPage";
import LoginRegister from "../components/header/LoginRegister";
import { UserPurchases } from "../components/userInterface/UserPurchases";
import UpdateUserData from "../components/userInterface/UpdateUserData";
import UserData from "../components/userInterface/UserData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";

type Produtos = {
  id: number;
  nome: string;
  valor: number;
  preco: number;
  estoque: number;
  imagem: string;
  quantidade?: number;
};
type Usuarios = {
  id: number;
  nome: string;
  email: string;
  numero: string;
  cpf: string;
  senha: string;
};

type ContextType = {
  data: Produtos[];
  setData: React.Dispatch<React.SetStateAction<Produtos[]>>;
  produtosNoCarrinho: Produtos[];
  setProdutosNoCarrinho: React.Dispatch<React.SetStateAction<Produtos[]>>;
  precoTotal: number;
};

export const DataContext = createContext<ContextType | null>(null);

function App() {
  const [data, setData] = useState<Produtos[]>([]);
  const [users, setUsers] = useState<Usuarios[]>([]);
  const [userOn, setUserOn] = useState({});
  const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<Produtos[]>([]);
  const [precoTotal, setPrecoTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [resultadoBusca, setResultadoBuca] = useState<boolean>(true);

  //Paginação

  // Fetch para buscar APi e devolver os dados
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://dbmercadopagopostgre.onrender.com/db/pagadores",
      );
      const data = await resp.json();

      setUsers(data);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch(
        "https://dbmercadopagopostgre.onrender.com/dbProdutos/celulares",
      );
      const data = await resp.json();
      setData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (produtosNoCarrinho) {
      const total = produtosNoCarrinho.reduce(
        (acc, valorAtual) =>
          acc + valorAtual.valor_item * valorAtual.quantidade,
        0,
      );
      setPrecoTotal(total);
      console.log(total);
    }
  }, [produtosNoCarrinho]);

  useEffect(() => {
    console.log(userOn.id, userOn.firstname);
  }, [userOn]);

  return (
    <div className="h-screen w-screen flex flex-col relative">
      <DataContext.Provider
        value={{
          users,
          userOn,
          setUserOn,
          data,
          setData,
          produtosNoCarrinho,
          setProdutosNoCarrinho,
          precoTotal,
          setCount,
          resultadoBusca,
          setResultadoBuca,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/Ecomerce"
              element={<HomePage count={count} setCount={setCount} />}
            />
            <Route path="/userPage/:id" element={<UserPage />} />
            <Route path="/minhasCompras/:id" element={<UserPurchases />} />
            <Route path="/register" element={<LoginRegister />} />
            <Route path="/atualizarDados/:id" element={<UpdateUserData />} />
            <Route path="/dadosDoUsuário/:id" element={<UserData />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export default App;
