import { API_URL } from "../env";
import User from "../interfaces/user";

const USERS_URL = `${API_URL}/users/`;

const fetchUsers = () => fetch(USERS_URL).then(
    async (response) => {
        if (response.ok) {
            return (await response.json() as User[]);
        }
        console.error(response);
        throw(new Error(`Request status: ${response.status}`));
    });

export { fetchUsers };
