import { useForm } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { CartButton } from "../cart/CartButton";
import CartItems from "../cart/CartItems";
import LoginForm from "./LoginForm";
import { useContext, useState } from "react";
import { DataContext } from "../../src/App";
import { SearchResults } from "../header/SearchResults";
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

  const { data, setData, itemsPaginacao, setResultadoBuca } = context;
  const [hidden, setHidden] = useState<boolean>(true);
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
    console.log("oiiii");

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
    <div className="absolute h-[7vh] w-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex relative items-center w-screen h-[7vh] bg-amber-300 p-1 z-2 /-> responsive ">
          <button type="submit">
            <CiSearch className="w-[30px] h-[30px] z-2 cursor-pointer bg-amber-50 rounded-r-none ml-[70%] /-> responsive max-lg:rounded-r-none max-lg:rounded-l-sm max-lag:w-[25px] max-lg:h-[25px] max-lg:ml-[40%] max-lg:mt-[-26%]" />
          </button>
          <input
            className="w-[200px] h-[30px] ml-5 bg-amber-50 outline-none /-> responsive max-lg:w-[130px] max-lg:h-[25px] max-sm:ml-[21%] max-sm:translate-x-[-50%] max-sm:mt-[-2%]"
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
          <SearchResults buscaProdutos={buscaProdutos} />
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
    </div>
  );
};
