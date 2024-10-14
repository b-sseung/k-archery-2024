'use client';
import { useAppSelector } from '@/src/store/delete/store';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getGameDetail } from '@/src/js/api';
import { isNullOrEmpty } from '@/src/js/method';

const RoundSelectBody = () => {
  const router = useRouter();
  const [gameDetailList, setGameDetailList] = useState([]);

  // const { gmId, gmYear } = useAppSelector((state) => state.stateReducer);
  const { detailId } = router.query;

  useEffect(() => {}, []);

  return <div></div>;
};

export default RoundSelectBody;
