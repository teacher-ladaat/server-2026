export const getAllUsers = (req, res) => {
    res.send('get all users, req time: ' + (new Date() - req.currentDate));
};

export const register = (req, res) => {
    res.send('register');
};

export const login = (req, res) => {
    res.send('login');
};