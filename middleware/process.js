export default ({ app, store, redirect }) => {
    if (!app.$cookies.get('user')) {
        return redirect('/login')
    }
    else {
        const answered = app.$cookies.get('pre-use-answered');
        const photo = app.$cookies.get('pre-use-photos');
        if (photo < 1) {
            return redirect('upload-photo')
        }
        if (answered < 5) {
            return redirect('/answer-questions')
        }
    }
}