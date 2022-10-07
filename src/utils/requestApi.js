export const playerGet = async (hash) => {
  const request = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return request.url;
};

export const getTokenApi = async () => {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const requestToken = await fetch(endpoint);
  const tokenInfo = await requestToken.json();
  return tokenInfo;
};
