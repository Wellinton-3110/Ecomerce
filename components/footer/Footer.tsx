import { LeftButtonFooter } from "../footer/LeftButtonFooter";
import { RightButtonFooter } from "../footer/RightButtonFooter";
import { AllPagesFooter } from "../footer/AllPagesFooter";

type Page = {
  paginaAtual: number;
  totalDePaginas: number;
  setPaginaAtual: React.Dispatch<React.SetStateAction<number>>;
};

export const Footer = ({
  setPaginaAtual,
  totalDePaginas,
  paginaAtual,
}: Page) => {
  return (
    <div className="flex fixed w-screen h-[5%] bottom-0 left-0 text-white bg-black/50">
      <div className="absolute h-[100%] w-[150px] flex items-center justify-center gap-5 bottom-0 left-[50%] translate-x-[-50%]">
        <LeftButtonFooter
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
        />
        <RightButtonFooter
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
          totalDePaginas={totalDePaginas}
        />
        <AllPagesFooter
          totalDePaginas={totalDePaginas}
          paginaAtual={paginaAtual}
        />
      </div>
    </div>
  );
};
