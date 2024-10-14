export const getGame = async () => {
  const result = await fetch(`./api/get-game`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return result;
};

export const getGameDetail = async (detailId) => {
  const result = await fetch(`./api/get-game-detail`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ detailId: detailId }),
  }).then((res) => res.json());

  return result.data;
};
