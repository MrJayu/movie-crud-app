
export const setUser = (userObj) => {
    // userObj = {
    //     email: '',
    //     password: '',
    //     isLogin: true
    // }
    localStorage.setItem('user', JSON.stringify(userObj))
}
export const getUser = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    return user
}
export const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}
export const getData = (key) => {
    let data = JSON.parse(localStorage.getItem(key))
    return data
}

