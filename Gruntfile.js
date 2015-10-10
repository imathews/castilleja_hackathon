module.exports = function(grunt) {

    var fs = require('fs');

    //grunt.initConfig({});

    require('load-grunt-tasks')(grunt);

    grunt.config.init({
        pkg: grunt.file.readJSON('package.json'),
        date: grunt.template.date(new Date(), 'yyyy-mm-dd,HH.MM.ss'),
        exec: {
            clearAssets: 'rm -rf public/javascripts/* && rm -rf public/stylesheets/*'
        },
        sshexec: {
            options: {
                privateKey: '<%= grunt.file.read(grunt.config.get("pemPath")) %>',
                host: '<%= grunt.config.get("hostname") %>',
                username: "ec2-user"
            },
            unzip: {
                command: "cd ~/redivis/releases/" + "<%=date%>" + " && tar -zxvf archive.tar.gz && rm archive.tar.gz"
            },
            removeOldPublicAssets: {
                command: "rm -rf ~/redivis/public/{stylesheets,javascripts,icons,images/defaults,images/general}"
            },
            movePublicAssets: {
                command: "cp -ar ~/redivis/current/public/{icons,javascripts,stylesheets,fonts} ~/redivis/public && " +
                "cp -ar ~/redivis/current/public/images/{general,defaults} ~/redivis/public/images && " +
                "rm -rf ~/redivis/current/public && ln -s ~/redivis/public ~/redivis/current/public"
            },
			setDevelopment: {
				command: "export NODE_ENV='development'"
			},
            reload: {
                command: "sudo service pm2 restart"
            },
            'makeReleaseDir': {
                command: "mkdir -m 777 -p ~/redivis/releases/<%=date%> && ln -s ~/redivis/node_modules/ ~/redivis/releases/<%=date%>"
            },
            removeOldReleases : {
                command:"cd ~/redivis/releases/ && ls -t | sed -e '1,5d' | xargs -d '\\n' sudo rm -r"
            },
            'updateSymLinks': {
                command: "sudo rm -rf ~/redivis/current && ln -s ~/redivis/releases/" + '<%=date%>' + " ~/redivis/current && ln -s ~/redivis/filesystem ~/redivis/current/"
            },
            'npmInstall': {
                command: "cd ~/redivis/current && npm install --production"
            }
        },
        sftp: {
            deploy: {
                files: {
                    "./": "archive.tar.gz"
                },
                options: {
                    host: '<%= grunt.config.get("hostname") %>',
                    username: "ec2-user",
                    privateKey: '<%= grunt.file.read(grunt.config.get("pemPath")) %>',
                    path: '/home/ec2-user/redivis/releases/' + '<%=date%>',
                    srcBasePath: "./",
                    showProgressBar: true
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: './archive.tar.gz',
                    mode: 'tgz'
                },
                files: [
					{src:
						['./bin/**', './config.js', './sockets/**',
						'./app.js', './pm2Config.json', './package.json'],
						dest: './'
					}
                ]
            }
        }
    });

	grunt.registerTask('cleanUp', function(){
		grunt.file.delete('archive.tar.gz')
		grunt.task.run('exec:clearAssets')
	});

	var tasks = [
		'compress:main', 'sshexec:makeReleaseDir',
		'sftp:deploy', 'sshexec:unzip',
		'sshexec:updateSymLinks',
		'sshexec:npmInstall', 'sshexec:setDevelopment',
		'sshexec:reload', 'sshexec:removeOldReleases', 'cleanUp'
	];


	grunt.registerTask('deploy', function(){
		grunt.config.set('pemPath', '/Users/Ian/.ssh/redivis_staging.pem');
		grunt.config.set('hostname', 'staging.redivis.com');

		tasks.forEach(function(task){
			grunt.task.run(task);
		})
	});





};