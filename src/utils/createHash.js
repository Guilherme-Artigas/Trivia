import md5 from 'crypto-js/md5';

const createHash = (email) => {
  const hash = md5(email).toString().trim();
  const playerHash = `https://www.gravatar.com/avatar/${hash}`;
  return playerHash;
};

export default createHash;
