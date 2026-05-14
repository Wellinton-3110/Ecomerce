import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { DataContext } from "../../src/App";

type Produtos = {
  id: number;
  nome: string;
  preco: number;
  vendido: boolean;
  imagem: string;
};

export const CartButton = ({ setHidden }: any) => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }
  const { produtosNoCarrinho } = context;

  return (
    <div
      onClick={() => {
        setHidden((prev) => !prev);
      }}
      className="absolute bg-amber-300 right-[1%]"
    >
      <div className="absolute top-[-5px] right-8 flex items-center justify-center w-[18px] h-[18px] text-red-400 font-bold">
        {produtosNoCarrinho.reduce((acc, itemAtual) => {
          return acc + itemAtual.quantidade;
        }, 0)}
      </div>
      <CiShoppingCart className="w-[32px] h-[30px] cursor-pointer font-bold" />
    </div>
  );
};
