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
      className={`absolute ml-[-4px] w-screen h-[33vh] bg-black/90 top-[100%] z-10 flex items-center justify-center ${resultadoBusca ? "hidden" : ""} `}
    >
      <div className="relative w-[95%] h-full flex p-5 items-center justify-center /->responsite max-lg:gap-2">
        <IoCloseOutline
          className="w-[30px] h-[30px] absolute top-1 right-[-30px] z-10 text-white/80 /-> responsive max-lg:right-[-10px] max-lg:top-0 max-lg:text-red-500 max-lg:font-bold max-lg:w-[23px] max-lg:h-[23px]"
          onClick={() => fecharBusca()}
        />
        <div className="absolute left-0  top-5 w-[90%] h-[80%] gap-5 overflow-x-scroll overflow-y-hidden flex">
          {props.buscaProdutos.map((item) => {
            return (
              <li
                className="relative bg-white h-[240px] w-[160px] list-none rounded-sm rounded-b-right-lg  border-green-400 border-[1px] text-center rounded-lg flex-shrink-0 /->responsive max-lg:w-[105px] max-lg:h-[175px]"
                key={item.id}
              >
                <img
                  className="w-[100%] h-[150px] bg-black/50 ->responsive max-lg:h-[100px]"
                  src={`https://dbmercadopagopostgre.onrender.com/${item.img}`}
                  alt=""
                />
                <i className="w-[100%] h-[30px] flex items-center left-0 font-bold absolute mt-0.5 text-[12px]">
                  <p className="absolute w-[100%] left-[50%] translate-x-[-50%] overflow-y-clip /->responsive max-lg:text-[8px]">
                    {item.nome}
                  </p>
                </i>
                <i className="w-[100%] text-[12px] mt-1.5 font-normal absolute top-[70%] left-[50%] translate-x-[-50%] /->responsive max-lg:text-[11px] max-lg:mt-0.5">
                  R${item.valor_item}
                </i>
                <AddProductsButton
                  className="h-[40px] text-[14px] font-bold w-[100%] bg-green-500 hover:bg-green-400 p-1.5 rounded-sm w-[100%] absolute bottom-0 left-0 /->responsive max-lg:text-[9px] max-lg:h-[30px] max-lg:text-center"
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
