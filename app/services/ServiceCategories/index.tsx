
const URLCategories = 'https://api.chucknorris.io/jokes/categories';
const getCategories = async (): Promise<string[]> => {
    const response = fetch(URLCategories).then((response) => {
        if (!response.ok) {
            throw new Error('Network Error response get Categories');
        }
        return response.json();
    });
   return response;
}
export default getCategories;