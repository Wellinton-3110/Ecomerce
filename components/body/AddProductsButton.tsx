import { useContext } from "react";
import { DataContext } from "../../src/App";

export const AddProductsButton = ({ id, className }: any) => {
  const context = useContext(DataContext);
  if (!context) return null;
  const { data, setProdutosNoCarrinho } = context;

  const adicionarProduto = (id: number) => {
    setProdutosNoCarrinho((prevProdutos) => {
      const existe = prevProdutos.find((item) => {
        return item.id === id;
      });

      if (existe) {
        return prevProdutos.map((items) => {
          return items.id === id
            ? { ...items, quantidade: items.quantidade + 1 }
            : items;
        });
      }

      const novoProduto = data.find((item) => item.id === id);
      const httpImagem = `https://dbmercadopagopostgre.onrender.com${novoProduto.img}`;

      return [
        ...prevProdutos,
        {
          ...novoProduto,
          quantidade: 1,
          img: httpImagem,
        },
      ];
    });
  };

  return (
    <div>
      <button
        id={id}
        className={className}
        onClick={() => {
          adicionarProduto(id);
        }}
      >
        Adicionar produto
      </button>
    </div>
  );
};
