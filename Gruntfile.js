// Generated on 2013-05-28 using generator-webapp 0.2.2
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true
            },
            coffee: {
                files: ['<%= yeoman.app %>/**/*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/**/*.coffee'],
                tasks: ['coffee:test']
            },
            jade: {
                files: ['<%= yeoman.app %>/views/**/*.jade'],
                tasks: ['jade:dist']
            },
            less: {
                files: ['<%= yeoman.app %>/public/styles/{,*/}*.less'],
                tasks: ['less:dist']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/public/*.html',
                    '<%= yeoman.app %>/views/**/*.jade',
                    '<%= yeoman.app %>/views/**/*.coffee',
                    '{.tmp,<%= yeoman.app %>}/public/styles/**/*.css',
                    '{.tmp,<%= yeoman.app %>}/**/*.js',
                    '<%= yeoman.app %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // express: {
            // options: {
                // port: 3000,
                // hostname: 'localhost',
                // bases: yeomanConfig.app + '/public',
                // server: yeomanConfig.app + '/app',
                // debug: true
            // },
            // livereload: {
            // }
        // },
        connect: {
            options: {
                port: 3000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'//,
                // debug: true,
                // server: yeomanConfig.app + '/app',
                // bases: yeomanConfig.app + '/public'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app + '/public'),
                            lrSnippet,
                            require('./' + yeomanConfig.app + '/app')
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist + '/public')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            },
            express: {
                path: 'http://localhost:<%= express.livereload.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/**/*.js',
                '!<%= yeoman.app %>/public/scripts/vendor/*',
                '!<%= yeoman.app %>/**/node_modules/**/*',
                '!<%= yeoman.app %>/**/bower_components/**/*',
                'test/spec/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['**/*.coffee', '!**/node_modules/**/*', '!**/bower_components/**/*'],
                    dest: '.tmp',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.coffee',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },
        jade: {
            dist: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/views',
                    src: '**/*.jade',
                    dest: '.tmp/views',
                    ext: '.html'
                }]
            }
        },        
        less: {
            dist: {
                options: {
                    paths: ['<%= yeoman.app %>/public/styles'],
                    yuicompress: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/public/styles',
                    src: '**/*.less',
                    dest: '.tmp/public/styles',
                    ext: '.css'
                }]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    // `name` and `out` is set by grunt-usemin
                    baseUrl: yeomanConfig.app + '/public/scripts',
                    optimize: 'none',
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/public/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/public/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/public/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/public/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>/public'
            },
            html: '.tmp/views/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>/public']
            },
            html: ['<%= yeoman.dist %>/public/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/public/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/public/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/public/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/public/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/public/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/public/styles/main.css': [
                        '.tmp/public/styles/{,*/}*.css',
                        '<%= yeoman.app %>/public/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/public',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>/public'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'public/*.{ico,txt}',
                        'public/.htaccess',
                        'public/images/{,*/}*.{webp,gif}',
                        'public/styles/fonts/*',
                        'views/**/*',
                        'package.json',
                        'bower.json',
                        '.bowerrc'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '**/*',
                        '!views/**/*'
                    ]
                }]
            },
            bower: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>/public',
                    dest: '.tmp/views',
                    src: [
                        'bower_components/**/*'
                    ]
                }]
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'less:dist',
                'jade'
            ],
            test: [
                'coffee',
                'less',
                'jade'
            ],
            dist: [
                'coffee',
                'less:dist',
                'jade',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%= yeoman.app %>/public/scripts/main.js'
            }
        }
    });

    // grunt.registerTask('server', function (target) {
        // if (target === 'dist') {
            // return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        // }
// 
        // grunt.task.run([
            // 'clean:server',
            // 'concurrent:server',
            // 'connect:livereload',
            // 'open:server',
            // 'watch'
        // ]);
    // });

    grunt.registerTask('node', function () {
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent:dist',
        'copy:bower',
        'useminPrepare',
        'requirejs',
        'cssmin',
        'concat',
        'uglify',
        'copy:dist',
        //'rev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
