import { useForm } from "react-hook-form";
import { CartButton } from "../cart/CartButton";
import { AddProductsButton } from "../body/AddProductsButton";
import CartItems from "../cart/CartItems";
import { DataContext } from "../../src/App";
import { useContext, useState } from "react";
import { ImMenu3 } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import UserOptions from "./UserOptions";

type SubmitItems = {
  buscaProduto: string;
};

type Produtos = {
  id: number;
  nome: string;
  preco: number;
  vendido: boolean;
  imagem: string;
  quantidade?: number;
};

export const UserHeader = () => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { data, setData, setCount, setResultadoBuca, userOn } = context;

  const [hidden, setHidden] = useState<boolean>(true);
  const [hiddenSearch, setHiddenSearch] = useState<boolean>(true);
  const [options, setOptions] = useState(true);

  function showOptions() {
    return setOptions((prev) => !prev);
  }
  const [buscaProdutos, setBuscaProdutos] = useState<Produtos[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitItems>();

  const onSubmit = (dados: SubmitItems) => {
    const dadosDaBusca = data.filter((item) => {
      return item.nome.toLowerCase().includes(dados.buscaProduto.toLowerCase());
    });
    if (dadosDaBusca.length === 0) {
      return;
    }

    setResultadoBuca(false);

    setBuscaProdutos(() => {
      return [...dadosDaBusca];
    });

    reset();
  };

  return (
    <div className="absolute bg-black h-[6vh] w-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex absolute items-center w-screen h-[6vh] bg-amber-300 p-1 z-2">
          <input
            className="absolute w-[200px] h-[30px] ml-10 bg-amber-50 p-2 top-[50%] translate-y-[-50%]   /-> responsive  max-lg:w-[130px] max-lg:h-[25px]"
            type="text"
            placeholder="buscar produto"
            {...register("buscaProduto", { required: true, minLength: 1 })}
          />
          <button type="submit">
            <CiSearch
              onClick={() => {
                setHiddenSearch((prev) => false);
              }}
              className="absolute ml-2.5 w-[30px] h-[30px] cursor-pointer bg-amber-50  top-[50%] translate-y-[-50%] /-> responsive max-lag:w-[25px] max-lg:h-[25px] "
            />
          </button>
          {errors.buscaProduto && (
            <p className="absolute bottom-0 left-4 text-red-500 flex text-[11px] ml-1 /-> responsive max-lg:text-[9px] max-lg:left-2">
              Digite pelo menos um produto para busca
            </p>
          )}
          <CartButton setHidden={setHidden} />
          <CartItems hidden={hidden} />
          {/* resultado da busca */}
          <div
            className={`absolute w-screen h-[300px] top-[100%] left-0 bg-black/70 z-2 ${hiddenSearch ? "hidden" : ""}`}
          >
            <span
              onClick={() => {
                setHiddenSearch((prev) => !prev);
              }}
              className="absolute cursor-pointer top-1 right-3.5 text-[15px] font-bold text-white hover:text-red-400 z-2 -> max-lg:top-0 max-lg:right-1 "
            >
              X
            </span>
            <div className="absolute top-3 left-5 w-[98%] overflow-x-scroll overflow-y-hidden h-[90%] flex gap-1.5 p-5">
              {buscaProdutos.map((item) => {
                return (
                  <li
                    className="relative bottom-3 flex-shrink-0 bg-white h-[240px] w-[130px] list-none rounded-sm border-green-400 border-[1px] text-center rounded-lg"
                    key={item.id}
                  >
                    <img
                      className="w-[100%] h-[150px] bg-black/50 "
                      src={`https://dbmercadopagopostgre.onrender.com/${item.img}`}
                      alt=""
                    />
                    <i className="w-[100%] h-[20px] flex text-center left-0 font-bold absolute mt-0.5 text-[10px]">
                      <p className="absolute w-[100%] left-[50%] translate-x-[-50%] translate-y-[+10%] overflow-y-clip">
                        {item.nome}
                      </p>
                    </i>
                    <i className="absolute mt-1 w-[100%] text-[12px] mt-1.5 font-normal top-[70%] left-[50%] translate-x-[-50%]">
                      R${item.valor_item}
                    </i>
                    <AddProductsButton
                      className="absolute b-0 h-[40px] text-[11px] text-center font-bold w-[100%] bg-green-500 hover:bg-green-400 p-1.5 rounded-sm w-[100%]  bottom-0 left-0 "
                      id={item.id}
                      setCount={setCount}
                    />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
      </form>
      <div className="absolute flex flex-col items-center justify-center translate-x-[-50%] left-[50%] top-[0] h-[100%] z-2 w-[200px] /-> responsive max-lg:left-[50%] max-lg:translate-x-[-30%]">
        <ImMenu3
          onClick={showOptions}
          className="top-[2%] h-[25px] w-[35px] z-2 cursor-pointer /-> responsive max-sm:h-[25px] max-sm:w-[30px]"
        />
        <p className="top-[5%] z-2 font-bold text-black /-> responsive max-sm:text-[12px] max-sm:font-bold">
          {userOn.firstname}
        </p>
      </div>
      <UserOptions options={options} />
    </div>
  );
};
