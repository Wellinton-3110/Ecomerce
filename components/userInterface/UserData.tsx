import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../src/App";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

const UserData = () => {
  const [showData, setShowData] = useState(false);
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }
  const { userOn, users, setUsers, setUserOn } = context;

  useEffect(() => {
    const localData = localStorage.getItem("auth");
    if (localData) {
      const parsed = JSON.parse(localData);

      setUserOn({ ...parsed });
    }

    const usersReCatch = async () => {
      const resp = await fetch(
        "https://dbmercadopagopostgre.onrender.com/db/pagadores",
      );
      const data = await resp.json();
      setUsers(data);
    };
    usersReCatch();
  }, []);

  const id = userOn?.id;

  const currentData = users?.find((item) => {
    return item.id === Number(id);
  });

  const nome = currentData?.nome;
  console.log(nome);
  const email = currentData?.email;
  const senha = currentData?.senha;
  const cpf = currentData?.cpf;
  const numero = currentData?.numero;

  const ddd = numero?.slice(0, 2);
  const num = numero?.slice(2, 11);

  return (
    <div className="w-full h-full bg-gray-500 ">
      <Link
        className="absolute top-5 left-15 max-lg:left-3 max-lg:top-3 max-lg:text-[10px]"
        to={`/userPage/${id}`}
      >
        <FaCircleArrowLeft className="w-[25px] h-[25px] ->responsive max-lg:w-[15px] max-lg:h-[15px]" />
      </Link>
      <li className="relative flex flex-col  w-[1000px] h-full bg-gray-700 left-[50%] list-none translate-x-[-50%] ->responsive max-lg:w-[270px] max-lg:text-[10px]">
        <i className="ml-5 p-1 font-bold">Nome : {nome}</i>
        <i className="ml-5 p-1 font-bold">Email: {email}</i>

        <i className="ml-5 p-1 font-bold flex items-center gap-1 w-[400px]">
          Senha:{" "}
          <input
            className="w-[60px] h-[15px]"
            type={showData ? "text" : "password"}
            value={showData ? senha : "*****"}
          />
          <FaRegEyeSlash
            onClick={() => {
              setShowData(!showData);
            }}
            className="w-[20px] h-[20px] cursor-pointer hover:bg-white/80 "
          />
        </i>

        <i className="ml-5 p-1 font-bold">cpf: {cpf}</i>
        <i className="ml-5 p-1 font-bold">
          numero: ({ddd}){num}
        </i>
      </li>
    </div>
  );
};

export default UserData;
