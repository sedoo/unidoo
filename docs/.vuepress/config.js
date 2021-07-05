module.exports = {
    title: "UNIDOO Library",
    head: [
    	['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }],
    	['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' }],
    	['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css' }]
    ],
    description: 'by Sedoo',
    base: '/unidoo/',
    themeConfig: {
    	logo: '/img/unidoo.png',
        nav: [
            { text: 'root', link: '/' },
            // { text: 'components', items: [{ text: 'Unidoo Alert', link: '/unidoo-alert/' }, { text: 'modal de confirmation', link: '/confirm-dialog/' }] },
            { text: "git", link: 'https://github.com' },
        ],
        sidebar: {
            '/': [{
                title: 'composants',
                collapsable: false,
                sidebarDepth: 0,
                children: [
                    '/unidoo-alert/',
                    '/captcha/',
                    '/confirm-dialog/',
                    '/crud-table/'
                ]
            }],
            // '/unidoo-alert': [{
            //     title: 'UNIDOO ALERT'
            // },],
            // '/confirm-dialog': [{
            //     children: ['']
            // }]
        },
    }
}