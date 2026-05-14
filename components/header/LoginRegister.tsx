import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaCircleArrowLeft } from "react-icons/fa6";

type dadosRegisterForm = {
  senha: string;
  email: string;
  nome: string;
  cpf: string;
  numero: string;
};

const LoginRegister = () => {
  const cadastrarCliente = async (dataClient) => {
    try {
      const response = await fetch(
        "https://dbmercadopagopostgre.onrender.com/db/pagadores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: dataClient.nome,
            email: dataClient.email,
            senha: dataClient.senha,
            numero: dataClient.numero,
            cpf: dataClient.cpf,
          }),
        },
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("erro original" + error);
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<dadosRegisterForm>();

  const onSubmit = (dados: dadosRegisterForm) => {
    console.log(dados);
    cadastrarCliente(dados);
    setTimeout(() => {
      alert("Cadastrado com sucesso!");
    }, 500);
    reset();
  };
  return (
    <div className="flex itens-center justify-center bg-black/70 w-full h-full">
      <Link
        className="absolute top-5 left-15 ->responsive max-lg:left-2 max-lg:top-2"
        to="/Ecomerce"
      >
        <FaCircleArrowLeft className="w-[25px] h-[25px] max-lg:w-[20px] max-lg:h-[20px]" />
      </Link>
      <form
        className="w-[900px] bg-gray-600 h-[100%] p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col mt-5">
          <label className="font-bold">Nome</label>
          <input
            className="h-[35px] rounded-md mt-1 bg-white/80 ->responsive max-lg:w-[330px]"
            type="text"
            {...register("nome", {
              required: { value: true, message: "dado obrigatório" },
              maxLength: 100,
            })}
          />
          {errors.nome && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.nome.message}
            </p>
          )}
        </div>
        <div className="flex mt-1 flex-col">
          <label className="font-bold">Email</label>
          <input
            className="h-[35px] rounded-md mt-1 bg-white/80 ->responsive max-lg:w-[330px]"
            type="text"
            {...register("email", {
              required: { value: true, message: "dado obrigatório" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email inválido",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex mt-1 flex-col">
          <label className="font-bold">Senha</label>
          <input
            className="h-[35px] rounded-md mt-1 bg-white/80 ->responsive max-lg:w-[330px]"
            type="text"
            {...register("senha", {
              required: { value: true, message: "dado obrigatório" },
            })}
          />
          {errors.senha && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.senha.message}
            </p>
          )}
        </div>
        <div className="flex mt-1 flex-col">
          <label className="font-bold">Cpf</label>
          <input
            placeholder="000.000.000-00"
            className="h-[35px] rounded-md mt-1 bg-white/80 ->responsive max-lg:w-[330px]"
            type="number"
            {...register("cpf", {
              required: { value: true, message: "dado obrigatório" },
              maxLength: {
                value: 11,
                message: "o cpf tem que conter 11 digitos.",
              },
              minLength: {
                value: 11,
                message: "o cpf tem que conter 11 digitos.",
              },
              pattern: {
                value: "\d{3}\.\d{3}\.\d{3}-\d{2}",
                message: "formato inválido",
              },
            })}
          />
          {errors.cpf && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.cpf.message}
            </p>
          )}
        </div>
        <div className="flex mt-1 flex-col">
          <label className="font-bold">Numero</label>
          <input
            maxLength={11}
            placeholder="somente números ddd+ número"
            className="h-[35px] rounded-md mt-1 bg-white/80 ->responsive max-lg:w-[330px]"
            type="number"
            {...register("numero", {
              required: { value: true, message: "dado obrigatório" },
              maxLength: {
                value: 11,
                message: "preencha os 11 digitos DDD+número",
              },
              minLength: {
                value: 11,
                message: "preencha os 11 digitos DDD+número",
              },
              pattern: {
                value: "\(\d{2}\)\s\d{5}-\d{4}",
                message: "formato inválido",
              },
            })}
          />
          {errors.numero && (
            <p className="text-red-800 text-[13px] font-bold w-[400px] h-[20px]">
              {errors.numero.message}
            </p>
          )}
        </div>
        <button
          className="absolute left-[50%] translate-x-[-50%] top-[50%] bg-green-500 hover:bg-green-400 cursor-pointer w-[150px] h-[50px] rounded-md ->responsive max-lg:top-[70%] max-lg:h-[40px]"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default LoginRegister;
