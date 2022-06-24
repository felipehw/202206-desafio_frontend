import usersData from './users';
import User from '../../interfaces/user';

const api = (jest.createMockFromModule('../index') as any);
//const api = (jest.requireActual('../index') as any);
api.fetchUsers.mockImplementation(() => Promise.resolve(usersData));
api.fetchUsers.mockName('mockedFetchUsers');
api.fetchUsers.__setUsers = (users: User[]) => {
    api.fetchUsers.mockImplementation(() => Promise.resolve(users ? users : usersData));
};
api.fetchUsers.__set404 = () => {
    const reject404 = Promise.reject((new Response(null, {status: 404, statusText: 'Not Found'})));
    api.fetchUsers.mockImplementation(() => reject404);
};
api.fetchUsers.__setNetworkError = () => {
    const networkErrorMessage = "NetworkError when attempting to fetch resource.";
    const networkError = Promise.reject(new TypeError(networkErrorMessage));
    api.fetchUsers.mockImplementation(() => networkError);
};
const { fetchUsers, onGenericRejectedFetch } = api;
export { fetchUsers , onGenericRejectedFetch };