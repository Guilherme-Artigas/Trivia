const saveTokenLocal = (token) => localStorage.setItem('token', token);

const getTokenLocal = () => JSON.parse(localStorage.getItem('token'));

export { saveTokenLocal, getTokenLocal };
