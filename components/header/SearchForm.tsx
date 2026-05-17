import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { CartButton } from "../cart/CartButton";
import CartItems from "../cart/CartItems";
import LoginForm from "./LoginForm";
import { useContext, useState } from "react";
import { DataContext } from "../../src/App";
import { SearchResults } from "../header/SearchResults";
import { AddProductsButton } from "../body/AddProductsButton";
import { LuCircleUserRound } from "react-icons/lu";

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

export const SearchForm = () => {
  /////////////////////
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { data, setData, setCount, setResultadoBuca } = context;
  const [hidden, setHidden] = useState<boolean>(true);
  const [hiddenSearch, setHiddenSearch] = useState<boolean>(true);
  const [loginForm, setLoginForm] = useState(true);

  function showLoginForm() {
    return setLoginForm((prev) => !prev);
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
    <div className="absolute h-[70px] w-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex absolute left-0  w-screen h-[100%] bg-amber-300 p-1 z-2 /-> responsive ">
          <button
            onClick={() => {
              setHiddenSearch((prev) => false);
            }}
            type="submit"
          >
            <CiSearch className="absolute top-[50%] translate-y-[-50%] ml-3 rounded-l-sm w-[30px] h-[30px] z-2 cursor-pointer bg-amber-50  /-> responsive max-lg:rounded-r-none max-lg:rounded-l-sm max-lag:w-[25px] max-lg:h-[25px] " />
          </button>
          <input
            className="absolute top-[50%] translate-y-[-50%] ml-10 w-[200px] h-[30px] ml-5 p-1 bg-amber-50 /-> responsive max-lg:w-[130px] max-lg:h-[25px] ml-10"
            type="text"
            placeholder="buscar produto"
            {...register("buscaProduto", { required: true, minLength: 1 })}
          />

          {errors.buscaProduto && (
            <p className="text-red-500 flex text-[13px] ml-1 /-> responsive max-lg:text-[11px] max-lg:absolute max-sm:bottom-1 max-sm:left-[25%] max-sm:translate-x-[-40%] max-sm:text-[8px] max-sm:w-[200px] max-sm:font-bold">
              Digite pelo menos um produto para busca
            </p>
          )}
          <CartButton setHidden={setHidden} />
          <CartItems hidden={hidden} />
          {/* <SearchResults buscaProdutos={buscaProdutos} /> */}
        </div>
      </form>
      <div className="p-0.5 absolute flex flex-col items-center justify-center translate-x-[-50%] left-[50%] top-[0] h-[100%] z-2 w-[200px] /-> responsive max-sm:ml-[7%]">
        <LuCircleUserRound className=" text-[80px] max-lg:text-[50px] max-sm:text-[30px]" />

        <div
          onClick={showLoginForm}
          className="z-2 font-medium text-green-700 rounded-sm hover:text-green-800 hover:font-bold /-> responsive max-lg:text-[14px] [@media(max-height:800px)]:text-[14px] max-sm:text-[13px]"
        >
          Login
        </div>
      </div>
      <LoginForm loginForm={loginForm} />
      /resultado das buscas
      <div
        className={`absolute w-screen h-[300px] top-[100%] bg-black/70 z-2 ${hiddenSearch ? "hidden" : ""}`}
      >
        <span
          onClick={() => {
            setHiddenSearch((prev) => !prev);
          }}
          className="absolute cursor-pointer top-1 right-3.5 text-[15px] font-bold text-white hover:text-red-400 z-2"
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
  );
};
