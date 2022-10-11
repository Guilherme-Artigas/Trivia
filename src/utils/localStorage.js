const saveTokenLocal = (token) => localStorage.setItem('token', token);

const getTokenLocal = () => localStorage.getItem('token');

const getInfoScorePlayer = () => JSON.parse(localStorage.getItem('ranking')) || [];

const saveInfoScorePlayer = (infoScorePlayer) => {
  const infos = getInfoScorePlayer() || [];
  return localStorage.setItem('ranking', JSON.stringify([...infos, infoScorePlayer]));
};

export { saveTokenLocal, getTokenLocal, saveInfoScorePlayer, getInfoScorePlayer };
