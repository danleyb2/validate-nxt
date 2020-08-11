module.exports = {

    buildModules: [
        '@nuxtjs/vuetify'
    ],
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        treeShake: true,
        theme: {
            options: {
                customProperties: true
            },
            dark: true,
            themes: {
                dark: {
                    background: '#00a86b'
                },
                light: {
                    background: '#d0f0c0'
                }
            }
        }
    }
}
