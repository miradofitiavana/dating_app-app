export default ({ app }, inject) => {
    inject('get_categories', (id, token) => {
        return fetch(`${process.env.API_URL}/categories`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
            },
        })
            .then((res) => res.json())
    })
}