import axios from "axios"

interface ApiError {
    message: string;
    status?: number;
}

export function createHttpClient(baseURL: string) {
    const client = axios.create({
        baseURL,
        timeout: 10_000,
        headers: {
            "Content-Type": "application/json",
        },
    })

    client.interceptors.response.use(
        (response) => response.data,
        (error) => {
            const customError: ApiError = {
                message:
                    error.response?.data?.message ||
                    error.message ||
                    "Something went wrong",
                status: error.response?.status,
            }

            return Promise.reject(customError)
        }
    )

    return client
}