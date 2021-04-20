export default ({ app, store, redirect }) => {
    if (!app.$cookies.get('token')) {
        return redirect('/login')
    }
    else {
        store.commit("auth/setUser", app.$cookies.get('user'));
        store.commit("auth/setNbrAnswered", (5 - (app.$cookies.get('pre-use-answered') || 0)));
    }
}