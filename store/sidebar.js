export const state = () => ({
    openFrontSidebar: true,

    openBackSidebar: false
});

export const mutations = {
    openFrontSidebar(state) {
        state.openFrontSidebar = true;
    },

    closeFrontSidebar(state) {
        state.openFrontSidebar = false;
    },

    //
    openBackSidebar(state) {
        state.openBackSidebar = true;
    },

    closeBackSidebar(state) {
        state.openBackSidebar = false;
    },
}