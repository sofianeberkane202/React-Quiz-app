export async function fetchData(url){
    try {
        const response= await fetch(url);
        if(!response.ok) throw new Error('No fetching Data');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}