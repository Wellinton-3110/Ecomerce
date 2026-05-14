import { useContext } from "react";
import { DataContext } from "../../src/App";
import { Link } from "react-router-dom";
const UserOptions = ({ options }) => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { userOn, SetUserOn } = context;

  if (userOn) {
    console.log(userOn.id);
  }

  return (
    <div
      className={`absolute top-[100%] left-[50%] translate-x-[-50%] flex flex-col items-center justify-center w-[180px] h-[100px] z-2 font-bold bg-amber-300 ${options ? "hidden" : ""}`}
    >
      <Link
        className="flex flex-col items-center justify-center w-[100%] h-[40px] hover:bg-amber-400 border-[1px] border-b-0 border-black"
        to={`/minhasCompras/${userOn.id}`}
      >
        <button className="cursor-pointer">Histórico de Compras</button>
      </Link>
      <Link
        className="flex flex-col items-center justify-center w-[100%] h-[40px] hover:bg-amber-400 border-[1px] border-b-0 border-black"
        to={`/dadosDoUsuário/${userOn.id}`}
      >
        <button className="cursor-pointer">Meus dados</button>
      </Link>
      <Link
        to={`/atualizarDados/${userOn.id}`}
        className="flex flex-col items-center justify-center w-[100%] h-[40px] hover:bg-amber-400 border-[1px] border-b-0 border-black"
      >
        <button className="cursor-pointer">Atualizar dados</button>
      </Link>
      <Link
        onClick={() => {
          SetUserOn({});
        }}
        to={"/Ecomerce"}
        className="flex flex-col items-center justify-center w-[100%] h-[40px] hover:bg-amber-400 border-[1px] border-black"
      >
        <button className="cursor-pointer">Sair</button>
      </Link>
    </div>
  );
};

export default UserOptions;
