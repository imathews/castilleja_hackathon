var redivisPackage = require('./package.json');

module.exports = {
    local: {
        redis : {
            session:{
                host: 'localhost',
                port: 6379,
                db: 0
            },
            cache: {
                host: 'localhost',
                port: 6379,
                db: 3
            },
            series: {
                host: 'localhost',
                port: 6379,
                db: 1
            },
            timepoints: {
                host: 'localhost',
                port: 6379,
                db: 2
            }
        },
        postgres:{
            host: '',
            database: '',
            user: '',
            password: '',
            port: ''
        },
        publicRoot: '/'
    },
    development : {
        redis : {
            session:{
                host: 'test.redivis.com',
                port: 6379,
                db: 0
            },
            cache: {
                host: 'test.redivis.com',
                port: 6379,
                db: 0
            },
            series: {
                host: 'test.redivis.com',
                port: 6379,
                db: 1
            },
            timepoints: {
                host: 'test.redivis.com',
                port: 6379,
                db: 2
            }
        },
        publicRoot: '/',
        versionString: ''
    },
    test: {
        redis : {
            session:{
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 0
            },
            cache: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 4
            },
            series: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 1
            },
            timepoints: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 2
            }
        },
        publicRoot: '/',
        versionString: redivisPackage.hash + '.'
    },
    staging: {
        redis : {
            session:{
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 0
            },
            cache: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 3
            },
            series: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 1
            },
            timepoints: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 2
            }
        },
        publicRoot: 'https://redivis.s3.amazonaws.com/',
        versionString: redivisPackage.version + '/'
    },
    production: {
        redis : {
            session:{
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 0
            },
            cache: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 3
            },
            series: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 1
            },
            timepoints: {
                host: 'redivis-global.ubbxey.0001.usw1.cache.amazonaws.com',
                port: 6379,
                db: 2
            }
        },
        publicRoot: 'https://redivis.s3.amazonaws.com/',
        versionString: redivisPackage.version + '/'
    }




};