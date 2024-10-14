'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setGmId, setGmYear, setGmRound, setGmRoundDetailType } from '../store/module/game';
import { getGame, getGameDetail } from '../js/api';
import { isNullOrEmpty } from '../js/method';
import $ from 'jquery';
import { loadingStyle } from '../css/common';

const createGameListBox = (games, onChange) => {
  const sortedGames = games.sort((r1, r2) => {
    const yearName1 = r1['gmYearName'];
    const yearName2 = r2['gmYearName'];

    if (yearName1 < yearName2) {
      return -1;
    } else if (yearName1 == yearName2) {
      const idName1 = r1['gmId'];
      const idName2 = r2['gmId'];

      if (idName1 < idName2) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 1;
    }
  });

  return (
    <select name="game" id="gameSelect" onChange={(event) => onChange(event)}>
      <option value=""></option>
      {sortedGames.map((game, index) => {
        let titleType = game['gmId'] === 'AR271' || game['gmId'] === 'AR281' ? '평가전' : '선발전';

        return (
          <option key={index} value={`${game['gmYear']} ${game['gmId']}`}>
            {`${game['gmYearName']}년도 ${game['gmIdName']}차 ${titleType}`}
          </option>
        );
      })}
    </select>
  );
};

const createRoundListBox = (rounds, onChange) => {
  const sortedRounds = rounds.sort((r1, r2) => {
    return r1 - r2;
  });

  return (
    <select name="round" id="roundSelect" onChange={(event) => onChange(event)}>
      <option value=""></option>
      {sortedRounds.map((round, index) => {
        return (
          <option key={index} value={round}>
            {`${round}회전`}
          </option>
        );
      })}
    </select>
  );
};

const createRoundDetailListBox = (roundDetails, onChange) => {
  const sortedRoundDetails = roundDetails.sort((r1, r2) => {
    const detail1 = r1['gmRoundDetail'];
    const detail2 = r2['gmRoundDetail'];

    return detail1 - detail2;
  });

  return (
    <select name="roundDetail" id="roundDetailSelect" onChange={(event) => onChange(event)}>
      <option value=""></option>
      {sortedRoundDetails.map((obj, index) => {
        return (
          <option key={index} value={obj['gmRoundType']}>
            {`${obj['gmRoundDetail']}회전`}
          </option>
        );
      })}
    </select>
  );
};

const Body = () => {
  const [load, setLoad] = useState(true);

  const [gameNameList, setGameNameList] = useState([]);
  const [gamesMap, setGamesMap] = useState([]);
  const [roundList, setRoundList] = useState([]);
  const [roundDetailList, setRoundDetailList] = useState([]);

  const [id, setId] = useState('');
  const [year, setYear] = useState('');
  const [round, setRound] = useState('');
  const [roundDetail, setRoundDetail] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();
  const { gmId, gmYear } = useSelector((state) => state.game);

  useEffect(() => {
    const getGameList = async () => {
      const gameList = await getGame();
      setGameNameList(gameList.data);
      setLoad(false);
    };

    setLoad(true);
    getGameList();
  }, []);

  const onChangeGameList = (event) => {
    const value = event.target.value;

    if (value === '' || value === null || value === undefined) {
      return;
    }

    const gameInfo = value.split(' ');

    dispatch(setGmYear(gameInfo[0]));
    dispatch(setGmId(gameInfo[1]));
    setYear(gameInfo[0]);
    setId(gameInfo[1]);

    let filterData = gameNameList.filter((item) => item['gmYear'] === gameInfo[0] && item['gmId'] === gameInfo[1]);

    const getGameDetailList = async () => {
      const listMap = new Map();

      const result = await getGameDetail(filterData[0]['gmDetailId']);

      if (isNullOrEmpty(result)) {
        return;
      }

      Object.keys(result).forEach((key) => {
        const value = result[key];
        const round = value['gmRound'];

        let detailList = listMap.get(round);

        if (detailList == null || detailList == undefined) {
          detailList = new Array();
        }

        detailList.push(value);
        listMap.set(round, detailList);
      });

      setRoundList(listMap.keys().toArray());
      setGamesMap(listMap);
      setLoad(false);
    };

    setLoad(true);
    getGameDetailList();
  };

  const onChangeRoundList = (event) => {
    const round = event.target.value;
    const roundDetails = gamesMap.get(round);
    setRoundDetailList(roundDetails);
    dispatch(setGmRound(round));
    setRound(round);
  };

  const onChangeRoundDetailList = (event) => {
    const roundDetail = event.target.value;
    dispatch(setGmRoundDetailType(roundDetail));
    setRoundDetail(roundDetail);
  };

  const moveResult = () => {
    router.push(
      {
        pathname: '/results',
        query: {
          id: id,
          year: year,
          round: round,
        },
      },
      '/result'
    );
  };

  const moveRecord = () => {
    const row = roundDetailList.filter((obj) => obj['gmRoundType'] === roundDetail);
    router.push(
      {
        pathname: '/records',
        query: {
          id: id,
          year: year,
          round: round,
          roundDetail: roundDetail,
          item: JSON.stringify(row),
        },
      },
      '/record'
    );
  };

  return (
    <>
      {load ? (
        <div style={loadingStyle}>
          <label>loading...</label>
        </div>
      ) : (
        ''
      )}
      <div>
        <label>대회명 : </label>
        {createGameListBox(gameNameList, onChangeGameList)}
      </div>
      <div>
        <label>회전 : </label>
        {createRoundListBox(roundList, onChangeRoundList)}
      </div>
      <div>
        <label>회차 : </label>
        {createRoundDetailListBox(roundDetailList, onChangeRoundDetailList)}
      </div>
      <div>
        <button onClick={moveResult} disabled={id && year && round ? false : true}>
          순위 보기
        </button>
        <button onClick={moveRecord} disabled={id && year && round && roundDetail ? false : true}>
          경기 결과 보기
        </button>
      </div>
    </>
  );
};

export default Body;
