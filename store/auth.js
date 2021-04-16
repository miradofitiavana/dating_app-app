export const state = () => ({
    isAuth: false,
    user: null,
    nbr_answered: 0
});

export const mutations = {
    isAuth(state) {
        state.isAuth = true;
    },

    loggedOut(state) {
        state.isAuth = false;
    },

    setUser(state, user) {
        console.log(user);
        state.user = user;
    },

    unsetUser(state) {
        state.user = null;
    },

    setNbrAnswered(state, nombre) {
        state.nbr_answered = nombre;
    },

    addNbrAnswered(state) {
        state.nbr_answered--;
    },
}