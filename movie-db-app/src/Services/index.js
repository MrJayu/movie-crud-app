const BASE_URL = 'https://api.themoviedb.org/3/discover/movie/';
const API_KEY = '9d8b66d618b60f3295c4ee17ec897a30';

export function PostRequestByToken(path, formData, isErrorHandle) {
    const requestOptions = {
        method: "POST",
        headers: {
            Accept: "application/json",
            device_type: 3,
            device_token: "",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            token: "",
            userid: "",
            email: "",
            deviceInfo: 3,
        },
        body: JSON.stringify(formData),
    };
    return fetch(`${BASE_URL}${path}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log("API DATA Response ::==>>>>> ", data);
            if (data.status === 200) {
                data.isSuccess = true;
                return data;
            } else if (data.status === 401) {
                console.log('status==>>', data.status);
                data.isSuccess = false;
                data.message = "Logout";
            }
            return data;
        })
        .catch((error) => {
            console.log('error==>>', error);
        });
}


export async function GetMovieDetailsRequest(page) {
    const requestOptions = {
        method: "GET",
        headers: {},
    };
    return await fetch(`${BASE_URL}?api_key=${API_KEY}&page=${page}`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log("API DATA Response ::==>>>>> ", data);
            data.isSuccess = true;
            return data;
        })
        .catch((error) => {
            console.log('error==>>', error);
        });
}
