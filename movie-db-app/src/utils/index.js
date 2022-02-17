import { getUser } from "../Helper/Storage"

export const isLogin = () => {
    let user = getUser()
    if (user && user.isLogin) {
        return true
    } else {
        return false
    }
}