import { FaChevronRight } from "react-icons/fa";

export const RightButtonFooter = ({
  setPaginaAtual,
  totalDePaginas,
  paginaAtual,
}) => {
  const setPageToRIght = () => {
    if (paginaAtual >= totalDePaginas) {
      return;
    }
    setPaginaAtual((prev) => prev + 1);
  };
  return (
    <button
      onClick={() => {
        return setPageToRIght();
      }}
    >
      <FaChevronRight className="w-[20px] hover:w[25px] h-20px hover:h-[25px]" />
    </button>
  );
};
