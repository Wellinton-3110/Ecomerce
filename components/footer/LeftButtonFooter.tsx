import { FaChevronLeft } from "react-icons/fa";

export const LeftButtonFooter = ({ setPaginaAtual, paginaAtual }) => {
  const setPageToLeft = () => {
    if (paginaAtual < 2) {
      return;
    }
    setPaginaAtual((prev) => prev - 1);
  };
  return (
    <button
      onClick={() => {
        setPageToLeft();
      }}
    >
      <FaChevronLeft className="w-[20px] hover:w[25px] h-20px hover:h-[25px]" />
    </button>
  );
};
