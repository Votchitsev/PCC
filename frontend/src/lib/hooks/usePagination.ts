import { ERoutes } from '@lib/routes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function usePagination(
  route: string,
  count: number,
  defaultPage: number,
) {
  const [page, setPage] = useState<number>(defaultPage);
  const [start, setStart] = useState<number>(1);
  const [end, setEnd] = useState<number>(12);

  const navigation = useNavigate();

  const handlePagination = (direction: 'left' | 'right') => {
    if (page === null && direction === 'right') {
      setPage(2);
      return;
    }

    if (direction === 'left' && page && page > 1 ) {
      setPage(page - 1);
      return;
    }

    if (direction === 'right' && page && page < Math.ceil(count / 12)) {
      setPage(page + 1);
      return;
    }
  };

  useEffect(() => {
    if (page) {
      navigation(`${route}?page=${page}`);
    }
  }, [page]);

  useEffect(() => {
    if (typeof page === 'number') {
      setStart(page * 12 - 11);

      if (page * 12 > count) {
        setEnd(count);
        return;
      }

      setEnd(page * 12);
    }
  }, [page, count]);

  return {
    handlePagination,
    page,
    start,
    end,
  };
};
