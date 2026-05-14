import { AddProductsButton } from "../body/AddProductsButton";
import { DataContext } from "../../src/App";
import { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";

type Produtos = {
  id: number;
  nome: string;
  preco: number;
  vendido: boolean;
  imagem: string;
  quantidade?: number;
};

export const SearchResults = (props: Produtos[]) => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { setCount, resultadoBusca, setResultadoBuca } = context;

  const fecharBusca = () => {
    setResultadoBuca((prev) => !prev);
  };

  return (
    <div
      className={`w-screen h-[33vh] bg-black/90 border-b-2 absolute top-[100%] z-10 flex items-center justify-center ${resultadoBusca ? "hidden" : ""} `}
    >
      <div className="relative w-[100%] h-full flex p-5 items-center justify-center /->responsite max-sm:gap-2">
        <IoCloseOutline
          className="w-[40px] h-[40px] absolute top-0 right-5 text-white/80 /-> responsive max-lg:right-1.5 max-lg:w-[23px] max-lg:h-[23px]"
          onClick={() => fecharBusca()}
        />
        <div className="absolute top-5 left-1 w-[100%] h-[90%] gap-5 overflow-x-scroll flex">
          {props.buscaProdutos.map((item) => {
            return (
              <li
                className="relative h-[250px] w-[160px] list-none  bg-white border-green-400 border-[1px] text-center rounded-lg flex-shrink-0 /->responsive max-lg:w-[110px] max-lg:h-[195px]"
                key={item.id}
              >
                <img
                  className="w-[100%] h-[150px] bg-black/50 ->responsive max-lg:h-[110px]"
                  src={`https://dbmercadopagopostgre.onrender.com/${item.img}`}
                  alt=""
                />
                <i className="w-[100%] h-[30px] flex items-center left-0 font-bold absolute mt-0.5 text-[12px]">
                  <p className="absolute w-[100%] left-[50%] translate-x-[-50%] overflow-y-clip /->responsive max-sm:text-[10px]">
                    {item.nome}
                  </p>
                </i>
                <i className="w-[100%] font-normal absolute top-[70%] left-[50%] translate-x-[-50%] /->responsive max-sm:text-[11px] max-sm:mt-1.5">
                  R${item.valor_item}
                </i>
                <AddProductsButton
                  className="h-[45px] text-[14px] font-bold w-[100%] bg-green-500 hover:bg-green-400 p-1.5 rounded-sm w-[100%] absolute bottom-0 left-0 /->responsive max-lg:text-[10px] max-lg:h-[30px]"
                  id={item.id}
                  setCount={setCount}
                />
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};
