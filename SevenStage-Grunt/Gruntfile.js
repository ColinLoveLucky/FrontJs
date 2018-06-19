module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt); //加载所有的任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                // separator: ";"
            },
            dist: {
                src: ['app/src/**/*.js'],
                dest: 'app/dist/<%=pkg.name%>.js'
            },
            css: {
                src: ['app/src/asset/*.css'],
                dest: 'app/dist/all.css'
            }
        },
        cssmin: {
            css: {
                src: 'app/dist/all.css',
                dest: 'app/dist/all-min.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'app/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'app/src/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/src/**/*.js', 'app/src/index.html'],
                tasks: ['concat', 'jshint', 'uglify']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            copy: {
                files: ["app/src/*.html"],
                tasks: ['copy']
            },
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },
                files: [  //下面文件的改变就会实时刷新网页
                    'app/dist/*.html',
                    'app/dist/style/{,*/}*.css',
                    'app/dist/scripts/{,*/}*.js',
                    'app/dist/images/{,*/}*.{png,jpg}'
                ]
            }
        },
        wiredep: {
            target: {
                src: ['app/src/*.html'],
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'app/src/',
                src: '*.html',
                dest: 'app/dist/',
            },
        },
        connect: {
            options: {
                port: 9000,
                hostname: '*', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },
            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'app/dist/'  //主目录
                    ]
                }
            }
        },
        imagemin:{
            dist: {
                options: {
                    optimizationLevel: 1 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'app/src/imgs/',//原图存放的文件夹
                    src: ['*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'app/dist/imgs/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        }
    });
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-wiredep');
    // grunt.loadNpmTasks('grunt-contrib-copy');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('build', ['concat', 'uglify', 'jshint', 'wiredep', 'copy']);
    grunt.registerTask('test', ['watch']);
    grunt.registerTask('import', ['wiredep']);
    grunt.registerTask('cosplay', ['copy:main']);
    grunt.registerTask('server', ['connect:server', 'watch']);
    grunt.registerTask("cssMin", ["concat","cssmin"]);
    grunt.registerTask("img",["imagemin"]);
};