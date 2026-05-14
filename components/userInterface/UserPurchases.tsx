import { useContext, useState } from "react";
import { DataContext } from "../../src/App";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export const UserPurchases = () => {
  const [mostraProdutos, setMostraProdutos] = useState(true);
  const [produtos, setProdutos] = useState([]);
  console.log("state", produtos);

  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { userOn, users, data } = context;

  const idUserAtual = Number(userOn.id);

  const usersFiltered = users.filter((item) => item.id === idUserAtual);

  const produtosNoCarrinho = (idCompra) => {
    const id = idCompra;
    const itemsCompra = usersFiltered[0].compras;
    const compraAtual = itemsCompra.find((item) => item.id === id);
    const produtosDaCompra = compraAtual.compras_carrinho.map(
      (item) => item.produto_id,
    );

    const produtos = data.filter((item) => produtosDaCompra.includes(item.id));

    console.log(" compra atual", compraAtual);
    console.log(" produtos da compra", produtosDaCompra);
    console.log("produtos retornados", produtos);
    setProdutos(produtos);
    setMostraProdutos((prev) => !prev);
  };

  return (
    <div className="w-full h-full bg-black/70">
      <Link
        className="absolute top-5 left-15 max-lg:left-1 max-lg:top-2"
        to={`/userPage/${userOn.id}`}
      >
        <FaCircleArrowLeft className="w-[25px] h-[25px] ->responsive max-lg:w-[17px] max-lg:h-[17px]" />
      </Link>
      <div className="relative flex flex-col w-[70%] h-[100%] items-center p-1.5 ml-[50%] translate-x-[-50%] gap-5 bg-gray-600 ->responsive max-lg:w-[85%] max-lg:h-[100%]">
        <p className="font-bold">Minhas compras</p>
        <div className="p-3.5 w-[70%] h-[90%] ml-[70%] translate-x-[-50%] overflow-y-scroll ->responsive max-lg:w-[95%] max-lg:ml-[90%]">
          <div className="flex justify-between w-[100%] p-1 font-bold ->responsive max-lg:text-[7px] max-lg:font-black">
            <i>N ª Compra</i>
            <i>Quantidade de items</i>
            <i>Valor Total</i>
            <i>Data/Hora</i>
          </div>
          {usersFiltered[0].compras.map((items, index) => {
            return (
              <li
                id={items.id}
                className=" flex justify-between list-none w-[100%] border-black border-[1px] p-1 ->responsive max-lg:text-[10px] max-lg:font-medium "
                key={items.id}
              >
                <i>{items.id}</i>
                <i className="flex items-center justify-center max-lg:ml-7.5">
                  {items.compras_carrinho.length}
                  <RiAlignItemLeftFill
                    onClick={() => {
                      produtosNoCarrinho(items.id);
                    }}
                    className="w-[20px] h-[20px] cursor-pointer hover:w-[23px] hover:h-[23px]"
                  />
                </i>
                <i className="mr-[-17%] max-lg:mr-[-5%] max-lg:text-[9px]">
                  R$: {items.valor_total}
                </i>
                <i className="max-lg:text-[8px] max-lg:font-bold">
                  {new Date(items.data_pagamento).toLocaleString("pt-BR")}
                </i>
              </li>
            );
          })}
          <div
            className={`w-[100%] h-[100%] p-2.5 bg-black absolute top-0 z-20 text-white text-center ${mostraProdutos ? "hidden" : ""}`}
          >
            <span
              className="absolute w-[25px] h-[25px] cursor-pointer hover:text-red-400 top-1 right-10 text-white font-black ->responsive max-lg:text-[12px] max-lg:right-5"
              onClick={() => setMostraProdutos((prev) => !prev)}
            >
              X
            </span>
            {produtos.map((item) => {
              return (
                <li
                  className="list-none gap-2.5 font-bold ->responsive max-lg:text-[10px] max-lg:mt-5 max-lg:gap-1"
                  key={item.id}
                >
                  <i>{item.nome} </i>
                  <i>- R${item.valor_item}</i>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
