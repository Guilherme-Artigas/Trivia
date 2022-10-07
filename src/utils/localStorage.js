const saveTokenLocal = (token) => localStorage.setItem('token', JSON.stringify(token));

const getTokenLocal = () => JSON.parse(localStorage.getItem('token'));

export { saveTokenLocal, getTokenLocal };
