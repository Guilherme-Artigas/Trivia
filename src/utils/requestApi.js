const getTokenApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpoint);
  const tokenInfo = await requestToken.json();
  return tokenInfo;
};

export default getTokenApi;
