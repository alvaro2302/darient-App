import Category from "@/app/helper/Category";

const URLCategories = 'https://api.chucknorris.io/jokes/categories';
const getCategories = async (): Promise<Category[]> => {
    const response = fetch(URLCategories).then((response) => {
        if (!response.ok) {
            throw new Error('Network Error response get Categories');
        }
        return response.json();
    });
    console.log("data",response);
   return response;
}
export default getCategories;