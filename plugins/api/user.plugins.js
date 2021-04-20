export default ({ app }, inject) => {
    inject('suggestions', (id) => {
        const token = app.$cookies.get("token");
        return fetch(`${process.env.API_URL}/user-suggestions`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json())
    }),
        inject('match', (id) => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/user-match`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    id_user: id,
                }),
            })
                .then((res) => res.json())
        }),
        inject('getMatch', (id) => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/user-match/${id}`, {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                }
            })
                .then((res) => res.json())
        }),
        inject('reject', (id) => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/user-reject`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    id_user: id,
                }),
            })
                .then((res) => res.json())
        })
}