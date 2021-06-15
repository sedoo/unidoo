module.exports = {
    title: "UNIDOO Library",
    description: 'by Sedoo',
    base:'/unidoo/',
    themeConfig: {
        nav: [
            { text: 'root', link: '/' },
            { text: 'components', items: [{ text: 'Unidoo Alert', link: '/unidoo-alert/' }, { text: 'modal de confirmation', link: '/confirm-dialog/' }] },
            { text: "git", link: 'https://github.com' },
        ],
        sidebar: {
            '/unidoo-alert': [{
                title: 'UNIDOO ALERT'
            },],
            '/confirm-dialog': [{
                children: ['']
            }]
        },
    }
}