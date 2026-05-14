import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { DataContext } from "../../src/App";

type dadosLoginForm = {
  senha: string;
  email: string;
  nome: string;
  numero: string;
  cpf: string;
};

const UpdateUserData = () => {
  const setUserData = async (param) => {
    console.log(userOn.id);

    const response = await fetch(
      `https://dbmercadopagopostgre.onrender.com/db/altPagador/${userOn.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...param,
        }),
      },
    );
  };

  const context = useContext(DataContext);
  if (!context) {
    return null;
  }

  const { userOn } = context;

  const [chageOnlyRead, setChageOnlyRead] = useState({
    nome: true,
    email: true,
    senha: true,
    numero: true,
    cpf: true,
  });

  const chageOnlyReadFunc = (param) => {
    setChageOnlyRead((prev) => ({ ...prev, [param]: !prev[param] }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<dadosLoginForm>();

  const onSubmit = (dados: dadosLoginForm) => {
    const dataFilter = Object.fromEntries(
      Object.entries(dados).filter(([__, value]) => value.trim() != ""),
    );

    console.log(dados);
    console.log(dataFilter);
    setUserData(dataFilter);
    reset();
    alert("dados enviados com sucesso");
  };
  return (
    <div className="bg-black/70 w-full h-full flex items-center justify-center">
      <Link
        className="absolute top-5 left-15 ->responsive max-lg:left-3 max-lg:top-3"
        to={`/userPage/${userOn.id}`}
      >
        <FaCircleArrowLeft className="w-[25px] h-[25px] ->responsive max-lg:w-[20px] max-lg:h-[20px] max-lg:ml-[-20%]" />
      </Link>
      <form
        className="bg-gray-500 w-[900px] h-full p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="font-medium /->responsive max-lg:ml-7">Nome</label>
          <div className="flex max-lg:justify-center">
            <input
              readOnly={chageOnlyRead.nome}
              className="w-[400px] h-[35px] mb-3 border border-black-[1px] rounded-sm bg-white/70 read-only:bg-white/10 /-> responsive max-lg:w-[270px]"
              type="text"
              {...register("nome", {
                required: {
                  value: true,
                  message: "Preencha o seu nome completo",
                },
                maxLength: 50,
              })}
            />
            <HiMiniPencilSquare
              onClick={() => {
                chageOnlyReadFunc("nome");
              }}
              className="w-[30px] h-[30px] ml-1 cursor-pointer"
            />
          </div>
          {errors.nome && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.nome.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium /->responsive max-lg:ml-7">Email</label>
          <div className="flex max-lg:justify-center">
            <input
              readOnly={chageOnlyRead.email}
              className="w-[400px] h-[35px] mb-3 border border-black-[1px] rounded-sm bg-white/70 read-only:bg-white/10 /-> responsive max-lg:w-[270px]"
              type="text"
              {...register("email", {
                maxLength: 50,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
            />
            <HiMiniPencilSquare
              onClick={() => {
                chageOnlyReadFunc("email");
              }}
              className="w-[30px] h-[30px] ml-1 cursor-pointer"
            />
          </div>
          {errors.email && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium /->responsive max-lg:ml-7">Senha</label>
          <div className="flex max-lg:justify-center">
            <input
              readOnly={chageOnlyRead.senha}
              className="w-[400px] h-[35px] mb-3 border border-black-[1px] rounded-sm bg-white/70 read-only:bg-white/10 /-> responsive max-lg:w-[270px]"
              type="text"
              {...register("senha", { maxLength: 50 })}
            />
            <HiMiniPencilSquare
              onClick={() => {
                chageOnlyReadFunc("senha");
              }}
              className="w-[30px] h-[30px] ml-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-medium /->responsive max-lg:ml-7">
            Numero
          </label>
          <div className="flex max-lg:justify-center">
            <input
              readOnly={chageOnlyRead.numero}
              placeholder="(DD+)0 0000-0000"
              className="w-[400px] h-[35px] mb-3 border border-black-[1px] rounded-sm bg-white/70 read-only:bg-white/10 /-> responsive max-lg:w-[270px]"
              type="number"
              {...register("numero", {
                maxLength: {
                  value: 11,
                  message: "digite os 11 numeros completos ddd+numero",
                },
                minLength: {
                  value: 11,
                  message: "digite os 11 numeros completos ddd+numero",
                },
              })}
            />
            <HiMiniPencilSquare
              onClick={() => {
                chageOnlyReadFunc("numero");
              }}
              className="w-[30px] h-[30px] ml-1 cursor-pointer"
            />
          </div>
          {errors.numero && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.numero.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="font-medium /->responsive max-lg:ml-7">Cpf</label>
          <div className="flex max-lg:justify-center">
            <input
              readOnly={chageOnlyRead.cpf}
              placeholder="000.000.000-00"
              className="w-[400px] h-[35px] mb-3 border border-black-[1px] rounded-sm bg-white/70 read-only:bg-white/10 /-> responsive max-lg:w-[270px]"
              type="number"
              {...register("cpf", {
                maxLength: {
                  value: 11,
                  message: "digite somente os 11 numeros do seu cpf",
                },
                minLength: {
                  value: 11,
                  message: "digite todos os 11 digitos do seu cpf",
                },
              })}
            />
            <HiMiniPencilSquare
              onClick={() => {
                chageOnlyReadFunc("cpf");
              }}
              className="w-[30px] h-[30px] ml-1 cursor-pointer"
            />
          </div>
          {errors.cpf && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.cpf.message}
            </p>
          )}
        </div>

        <input
          type="submit"
          className="w-[200px] h-[35px] mt-5 bg-green-500 hover:bg-green-400 cursor-pointer rounded-md ml-[50%] translate-x-[-50%]"
        />
      </form>
    </div>
  );
};

export default UpdateUserData;
