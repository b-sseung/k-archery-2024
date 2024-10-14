import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Record from '@/src/records/record';
import Tourment from '@/src/records/tourment';
import League from '@/src/records/league';

export default function Home() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [round, setRound] = useState('');
  const [roundDetail, setRoundDetail] = useState('');
  const [roundList, setRoundList] = useState([]);

  useEffect(() => {
    setId(router.query['id']);
    setYear(router.query['year']);
    setRound(router.query['round']);
    setRoundDetail(router.query['roundDetail']);
    setRoundList(JSON.parse(router.query['item']));
  }, []);

  const roundInfo = roundList.filter((obj) => obj['gmRoundType'] === roundDetail);

  return <>{roundInfo['gmRule'] === 'AR001' || 'AR004' ? <Record></Record> : roundInfo['gmRule'] === 'AR002' ? <Tourment></Tourment> : <League></League>}</>;
}
