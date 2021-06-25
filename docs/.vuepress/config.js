module.exports = {
    title: "UNIDOO Library",
    description: 'by Sedoo',
    base: '/unidoo/',
    themeConfig: {
    	logo: '/public/img/unidoo.png',
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
                    '/confirm-dialog/'
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