import { extend } from 'vee-validate';

import { required, email } from 'vee-validate/dist/rules';

// Add the required rule
extend('required', {
    ...required,
    message: (field) => `Le champ ${field} est requis.`
})
// Add the email rule
extend('email', {
    ...email,
    message: (field) => `L'email n'est pas valide.`
})

// Password
extend('verify_password', {
    validate: value => {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@\?\.#\$%\^&\*])(?=.{8,})");
        return strongRegex.test(value);
    },
    message: (field) => `Le mot de passe doit contenir au moins : 1 majuscule, 1 minuscule, 1 chiffre et une caractère spéciale.`
})