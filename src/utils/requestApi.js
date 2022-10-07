const playerGet = async (hash) => {
  const request = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default playerGet;
