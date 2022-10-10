export const getTokenApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpoint);
  const tokenInfo = await requestToken.json();
  return tokenInfo;
};

export const getQuestions = async (token) => {
  const requestAPI = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await requestAPI.json();
  return json;
};
