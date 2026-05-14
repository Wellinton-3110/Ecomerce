import { use, useContext, useEffect, useState } from "react";
import { DataContext } from "../../src/App";
import { RiDeleteBin2Line } from "react-icons/ri";

type viewCartItems = {
  hidden: boolean;
};

const CartItems = ({ hidden }: viewCartItems) => {
  const [qrCodeBase64, setQrCodeBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [mostrarQrCode, setMostrarQrCode] = useState(true);
  const [pagamentoId, setPagamentoId] = useState("");
  const [pagamentoStatus, setPagamentoStatus] = useState("pending");

  const context = useContext(DataContext);
  if (!context) null;
  const { precoTotal, produtosNoCarrinho, setProdutosNoCarrinho, userOn } =
    context;

  const gerarQRCode = async () => {
    setLoading(true);
    if (precoTotal <= 0) {
      alert("Nenhum produto no carrinho, por favor adicione produtos!");
      return;
    }

    try {
      const response = await fetch(
        "https://dbmercadopagopostgre.onrender.com/pix/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(precoTotal.toFixed(2)), // valor do Pix
            description: "Pagamento",
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.error || "Erro ao gerar QR Code");
        return;
      }

      // QR code base64 retornado pelo backend
      setQrCodeBase64(data.qr_code_base64);
      setPagamentoId(data.id);
    } catch (err) {
      setError("Erro na requisição: " + err.message);
    } finally {
      setLoadingImg(true);
      setLoading(false);
    }
  };

  const verificarPagamento = async () => {
    try {
      const response = await fetch(
        "https://dbmercadopagopostgre.onrender.com/pix/updateStatusPix",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: pagamentoId,
          }),
        },
      );
      const data = await response.json();

      setPagamentoStatus(data.status);

      return data.status;
    } catch (err) {
      setError("Erro na requisição: " + err.message);
    }
  };
  const gerarCompra = async () => {
    const compraResponse = await fetch(
      `https://dbmercadopagopostgre.onrender.com/addCompra/${userOn.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          valor_total: Number(precoTotal.toFixed(2)),
          pix_id: pagamentoId,
        }),
      },
    );

    const compraData = await compraResponse.json();

    return compraData;
  };
  const gerarPedido = async (pedidos, compraId) => {
    try {
      const responses = await Promise.all(
        pedidos.map((item) =>
          fetch(`https://dbmercadopagopostgre.onrender.com/addPedido`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              valor_produto: item.valor_item,
              compra_id: compraId,
              produto_id: item.id,
              quantidade: item.quantidade,
            }),
          }),
        ),
      );

      const data = await Promise.all(responses.map((r) => r.json()));
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const excluirProduto = (id: number) => {
    const produtoAtual = produtosNoCarrinho.find((item) => item.id === id);
    if (produtoAtual) {
      setProdutosNoCarrinho((prev) =>
        prev.map((items) => {
          return items.id === id && items.quantidade > 0
            ? { ...items, quantidade: items.quantidade - 1 }
            : items;
        }),
      );
    }

    if (produtoAtual.quantidade === 1) {
      const currentItens = produtosNoCarrinho.filter((item) => {
        return item.id !== id;
      });
      setProdutosNoCarrinho(currentItens);
    }
  };

  useEffect(() => {
    if (!pagamentoId) return;
    console.log("gerado id pix");

    const interval = setTimeout(async () => {
      console.log("status gerado", pagamentoStatus);
      const status = await verificarPagamento();

      if (status === "approved") {
        console.log("compra aprovada gerando compra");
        const compra = await gerarCompra();
        console.log("gerendo pedido");
        gerarPedido(produtosNoCarrinho, compra.id);
      }
    }, 55000);

    return () => clearTimeout(interval);
  }, [pagamentoId]);

  console.log("carrinho...", produtosNoCarrinho);

  return (
    <div
      className={`cartItems flex flex-col top-[100%] absolute z-20 w-[500px] h-[850px] bg-gray-50 border-l-[2px] border-green-300 right-1 ${hidden ? "hidden" : ""} /-> responsive max-lg:w-[300px] max-lg:h-[600px] [@media(max-height:750px)]:h-[580px] [@media(max-height:750px)]:w-[330px]`}
    >
      <div className="h-[95%] w-[99%] overflow-scroll absolute">
        {produtosNoCarrinho.map((item) => {
          return (
            <li key={item.id} className="flex flex-col w-[100%] p-5 gap-5">
              <i className="font-medium flex justify-around items-center">
                <img
                  src={item.img}
                  alt=""
                  className="w-[10%] h-[50px] bg-black/70 ->responsive max-lg:w-[14%]"
                />
                <p className="max-lg:text-[14px]">{item.nome}</p>
                <p>{item.quantidade}</p>

                <p className="max-lg:text-[14px] max-lg:mr-3">
                  R${item.valor_item}
                </p>
                <RiDeleteBin2Line
                  onClick={(e) => {
                    excluirProduto(item.id);
                  }}
                  className="absolute right-2 w-[35px] h-[27px] rounded-lg cursor-pointer right-0 hover:bg-red-300"
                />
              </i>
            </li>
          );
        })}
      </div>

      <div className="bg-amber-400 w-[100%] h-[60px] flex absolute bottom-0">
        <div className="relative h-[100%] w-[100%]">
          <span
            onClick={() => {
              compraTeste();
            }}
            className="font-bold absolute left-3 top-[50%] translate-y-[-50%]"
          >
            total
          </span>

          <span className="font-bold absolute left-[20%] top-[50%] translate-y-[-50%]">
            R${precoTotal.toFixed(2)}
          </span>
          <button
            onClick={() => {
              gerarQRCode();
            }}
            disabled={!userOn.id}
            className="absolute bg-amber-500 hover:bg-amber-300 font-bold w-[150px] h-[100%] right-0 cursor-pointer disabled:cursor-no-drop"
          >
            {loading ? "gerando pix" : "Finalizar pedido"}
          </button>
        </div>
      </div>

      <div
        className={`${loadingImg ? "" : "hidden"} ${mostrarQrCode ? "" : "hidden"} absolute w-[100%] h-[100%] bg-black/70 z-20 top-0 left-0`}
      >
        <span
          onClick={() => setMostrarQrCode((prev) => !prev)}
          className="absolute z-20 top-0 right-1 w-[25px] h-[25px] bg-black/70 rounded-sm text-white text-center cursor-pointer"
        >
          X
        </span>
        <img
          src={`data:image/png;base64,${qrCodeBase64}`}
          alt="qrCode"
          className={`${loadingImg ? "" : "hidden"} absolute w-[200px] h-[200px] bg-black  left-[50%] translate-x-[-50%] top-[40%]`}
        />
        <div
          className={`absolute flex items-center justify-center bottom-0 w-[100%] h-[60px]  font-bold ${pagamentoStatus === "pending" ? "bg-amber-400" : "bg-green-400"}`}
        >
          <p>
            status do pagamento:{" "}
            {pagamentoStatus === "pending" ? "Pendente" : "Aprovado"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
