const saveTokenLocal = (token) => localStorage.setItem('token', token);

const getTokenLocal = () => localStorage.getItem('token');

export { saveTokenLocal, getTokenLocal };
