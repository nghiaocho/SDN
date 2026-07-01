import api from "../config/api"

export const login = async (email, password) => {
    const rs = await api.post("/users/login",{
        email, password,
    });

    return rs.data;

}

export const register = async (fullname, email, password) => {
    const rs = await api.post("/users/register", {
        fullname, email, password,
    });

    return rs.data;
}

export const getUserInfo = async () => {
    const rs = await api.get("/users/me");
    return rs.data;
}

export const updateProfile = async (fullname, email, password) => {
    const rs = await api.put("/users/me", {
        fullname, email, password
    });
    return rs.data;
}