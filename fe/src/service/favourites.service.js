import api from "../config/api";

export const getMyFavourites = async () => {
    const rs = await api.get("/favourites/my-favourites");
    return rs.data;
};
