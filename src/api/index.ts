import { API_URL } from "../env";
import User from "../interfaces/user";

const USERS_URL = `${API_URL}/users/`; 

const fetchUsers = () => fetch(USERS_URL).then(
    (response) => {
        if (response.ok) {
            return response.json() as Promise<User[]>;
        }
        return Promise.reject(response);
    });

const onGenericRejectedFetch = (reason: any) => {
    if (reason instanceof Response) {
        console.error(
            `Error from server:
            Code:${reason.status}.
            Description: ${reason.statusText}
            Contact the admin or try again later.`
        );
    } else if (typeof reason.message === 'string' && (reason.message as string).includes('NetworkError')) {
        console.error('Check your internet connection');
    } else {
        console.error(reason);
    }
};
export { fetchUsers, onGenericRejectedFetch };