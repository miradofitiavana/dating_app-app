import fr from "date-fns/locale/fr";

export default ({ app }, inject) => {
    inject('getFrenchDate', (date, withHour = false) => {
        return app.$dateFns.format(new Date(date), `DD MMMM YYYY${withHour ? ' à HH:mm' : ''}`, {
            locale: fr,
        });
    }),
        inject('fromNow', (date, suffix = true) => {
            return app.$dateFns.distanceInWords(new Date(), new Date(date), {
                locale: fr,
                addSuffix: suffix,
            })
        })
}