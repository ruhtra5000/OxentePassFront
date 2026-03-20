'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function Paginacao({ page, totalPages , index = 'pag' }: any) {
  const router = useRouter()
  const params = useSearchParams()

  const setPage = (newPage: number) => {
    const newParams = new URLSearchParams(params);
    newParams.set(index, newPage.toString())

    router.push(`?${newParams.toString()}`)
  };

  return (
    <div className="flex flex-row justify-center grow gap-3">
      {page > 0 && ( 
        <button 
          className='p-2 border border-slate-200 cursor-pointer'
          onClick={() => setPage(page - 1)}
        >
          ‹ Anterior
        </button>
      )}

      {page < totalPages-1 && ( 
        <button 
          className='p-2 border border-slate-200 cursor-pointer'
          onClick={() => setPage(page + 1)}
        >
          Próxima ›
        </button>
      )}
    </div>
  );
}