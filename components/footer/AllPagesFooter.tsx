type CurrentPages = {
  totalDePaginas: number;
  paginaAtual: number;
};

export const AllPagesFooter = ({
  totalDePaginas,
  paginaAtual,
}: CurrentPages) => {
  return (
    <div className="w-[85px] text-center text-white">
      <p>
        {paginaAtual}/{totalDePaginas}
      </p>
    </div>
  );
};
