import { useContext, useState } from "react";
import { AddProductsButton } from "./AddProductsButton";
import { DataContext } from "../../src/App";
import { Footer } from "../footer/Footer";

type Produtos = {
  id: number;
  nome: string;
  preco: number;
  vendido: boolean;
  imagem: string;
};

type PropsCount = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

type Page = {
  paginaAtual: number;
  setPaginaAtual: React.Dispatch<React.SetStateAction<number>>;
};

export const Items = ({ setCount }: PropsCount) => {
  const context = useContext(DataContext);
  if (!context) return null;
  const { data } = context;

  const [paginaAtual, setPaginaAtual] = useState<Page>(1);

  const itemsPorPagina: number = 11;
  const ultimoIndex: number = paginaAtual * itemsPorPagina;
  const indexInicial: number = ultimoIndex - itemsPorPagina;

  const itemsAtuais: Produtos[] = data.slice(indexInicial, ultimoIndex);

  const totalDePaginas: number = Math.ceil(data.length / itemsPorPagina);

  return (
    <div className="flex flex-col h-[90vh] relative w-screen p-5 mt-10 max-sm:p-0.5">
      <div className="relative w-[100%] ml-[50%] translate-x-[-50%] p-15 gap-7 flex flex-wrap justify-around scroll-smooth overflow-scroll overflow-x-hidden ->responsive max-lg:p-10">
        {itemsAtuais.map((item: Produtos, index: number) => {
          return (
            <li
              className="relative h-[350px] w-[180px] list-none bg-white/50 border-green-400 border-[1px]  text-center rounded-lg /responsive max-lg:w-[150px] max-lg:h-[300px] max-sm:w-[110px] max-sm:h-[230px]"
              key={item.id}
            >
              <img
                className="w-[100%] h-[240px] bg-black/50 /responsive max-lg:h-[200px] max-sm:h-[150px]"
                src={`https://dbmercadopagopostgre.onrender.com/${item.img}`}
                alt=""
              />
              <i className="w-[100%] font-bold absolute mt-1.5 left-[50%] translate-x-[-50%] /->responsive max-lg:text-[15px] max-lg:font-medium max-lg:mt-0.5 max-sm:text-[10px]">
                {item.nome}
              </i>
              <i className="w-[100%] font-normal absolute mt-8 left-[50%] translate-x-[-50%] /->responsive max-lg:font-light max-lg:mt-6 max-sm:text-[10px] max-sm:mt-[20%]">
                R${item.valor_item}
              </i>
              <AddProductsButton
                className="h-[50px] w-[100%] bg-green-500 hover:bg-green-400 p-1.5 rounded-sm w-[100%] absolute bottom-0 left-0 /->responsive max-lg:h-[45px] max-lg:w-[100%] max-sm:h-[40px] max-sm:text-[9px] max-sm:font-bold"
                id={item.id}
                setCount={setCount}
              />
            </li>
          );
        })}
      </div>
      <Footer
        paginaAtual={paginaAtual}
        setPaginaAtual={setPaginaAtual}
        totalDePaginas={totalDePaginas}
      />
    </div>
  );
};
