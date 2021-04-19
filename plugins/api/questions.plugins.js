export default ({ app }, inject) => {
    /** question à voter */
    inject('question_to_vote', () => {
        const token = app.$cookies.get("token");
        return fetch(`${process.env.API_URL}/question-to-vote`, {
            method: "GET",
            headers: {
                "Content-type": "Application/json",
                Authorization: token,
            },
        })
            .then((res) => res.json());
    }),
        /** vote question */
        inject('vote', (data) => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/question-to-vote`, {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
                body: JSON.stringify(data)
            })
                .then((res) => res.json());
        }),
        /** répondre à une question */
        inject('question_random', () => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/question-random`, {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
            })
                .then((res) => res.json());
        }),
        /** répondre à une question */
        inject('question_answer', (answerChosen, _id) => {
            const token = app.$cookies.get("token");
            return fetch(`${process.env.API_URL}/question-update`, {
                method: "PUT",
                headers: {
                    "Content-type": "Application/json",
                    Authorization: token,
                },
                body: JSON.stringify({
                    answerChosen: answerChosen,
                    question: _id,
                }),
            })
                .then((res) => res.json());
        })
}