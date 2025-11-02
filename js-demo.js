function login1(user) {
    console.log(user.username, user.password);
}

login1({ username: 'dani', password: '1234' });

//#region object destructuring
function login2({ username, password = 123 }) {
    console.log(username, password);
}
login2({ password: 111, username: 'aaa' })
//#endregion

//#region immutable data
setProducts(products.toSorted());

const copy = [...products]
copy.sort()
setProducts(copy)
//#endregion