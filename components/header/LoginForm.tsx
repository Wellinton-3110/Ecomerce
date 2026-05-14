import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../src/App";
import { useState, useEffect, useContext } from "react";

type dadosLoginForm = {
  senha: string;
  email: string;
};

const LoginForm = ({ loginForm }) => {
  const context = useContext(DataContext);
  if (!context) {
    return null;
  }
  const { userOn, setUserOn } = context;
  const navigate = useNavigate();
  const logUser = async (userDataConfirm) => {
    try {
      const response = await fetch(
        "https://dbmercadopagopostgre.onrender.com/db/pagadores",
      );
      const data = await response.json();
      const authorize: boolean = data.find(
        (item) =>
          item.email === userDataConfirm.email &&
          item.senha === userDataConfirm.senha,
      );

      if (!authorize) {
        alert("usuário não cadastrado");
      }

      const userId = data
        .filter(
          (item) =>
            item.email === userDataConfirm.email &&
            item.senha === userDataConfirm.senha,
        )
        .map((item) => {
          return item.id;
        });

      const userIdParam = userId[0].toString();
      const userName = data
        .filter(
          (item) =>
            item.email === userDataConfirm.email &&
            item.senha === userDataConfirm.senha,
        )
        .map((item) => item.nome);

      const firstName = userName[0].split(" ")[0];

      setUserOn((prev) => ({ id: userIdParam, firstname: firstName }));

      localStorage.setItem(
        "auth",
        JSON.stringify({
          id: userIdParam,
          firstname: firstName,
        }),
      );

      const localStorageData = localStorage.getItem("auth");

      console.log(localStorageData);

      if (authorize) {
        navigate(`/userPage/${userId[0]}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<dadosLoginForm>();

  const onSubmit = (dados: dadosLoginForm) => {
    logUser(dados);
  };

  return (
    <div className="absolute top-[100%] z-2 left-[50%] w-[350px] h-[250px] translate-x-[-50%] /->responsive max-sm:top-[100%] max-sm:w-[320px]">
      <form
        className={`flex flex-col p-1.5 h-[100%] w-[100%] bg-amber-300 gap-2.5 border-black/70 border-[0.5px] ${loginForm ? "hidden" : ""}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            className="w-[100%] h-[37px] bg-white rounded-md"
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "Email obrigatório",
              },
              maxLength: 50,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
          />
        </div>

        {errors.email && (
          <p className="text-red-400 text-[13px]">{errors.email.message}</p>
        )}
        <div className="flex flex-col gap-2">
          <label className="">Senha</label>
          <input
            className="w-[100%] h-[37px] bg-white rounded-md"
            type="password"
            {...register("senha", { required: true, maxLength: 50 })}
          />
        </div>

        <div className="w-[100%] bg-amber-200 absolute bottom-0 left-0">
          <button
            className="w-[50%] bg-green-400 hover:bg-green-300 border-black/70 border-[0.1px] h-[40px] "
            type="submit"
          >
            Login
          </button>
          <Link to="register">
            <button className="w-[50%] bg-green-400 hover:bg-green-300 border-black/70 border-[0.1px] h-[40px] ">
              Cadastro
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
