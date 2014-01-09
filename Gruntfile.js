module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),
    jshint: {
      assets: [
        'Gruntfile.js',
        'assets/js/**/*.js'
      ]
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'lib/bootstrap/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.min.css'
      }
    },
    concat: {
      bower: {
        files: {
          'dist/js/vendor.js': [
            'lib/angular/*.js',
            'lib/pouchdb/*.js',
            'lib/showdown/*.js',
            'lib/angular-*/*.js'
          ]
        }
      }
    },
    bower: {
      install: {
        // "it just works" :D
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/vendor.js': ['dist/js/vendor.js'],
          'dist/js/bundle.js': ['dist/js/bundle.js']
        }
      }
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'assets/html/',
            src: ['*.html'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'lib/bootstrap/',
            src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
            dest: 'dist/fonts/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'lib/template/angular-bootstrap',
            src: ['**'],
            dest: 'dist/template/'
          }
        ]
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/bundle.js': ['assets/js/app.js']
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 5000,
          base: 'dist'
        }
      }
    },
    watch: {
      options: {
        livereload: 5000
      },
      scripts: {
        files: ['assets/js/**/*.js'],
        tasks: ['jshint', 'browserify'],
      },
      vendor: {
        files: ['lib/*/*.js'],
        tasks: ['concat:bower']
      },
      css: {
        files: ['assets/css/*.less'],
        tasks: ['less', '']
      },
      html: {
        files: ['assets/html/*.html'],
        tasks: ['copy']
      }
    },
    mkcouchdb: {
      app: {
        db: '<%= config.db %>',
        options: {
          okay_if_exists: true
        }
      }
    },
    couchapp: {
      app: {
        db: '<%= config.db %>',
        app: '<%= config.app %>'
      }
    }
  });

  grunt.registerTask('build', [
    'jshint',
    'bower',
    'cssmin',
    'concat',
    'copy',
    'browserify'
  ]);

  grunt.registerTask('deploy', [
    'build',
    // 'uglify', // currently breaks things :(
    'mkcouchdb',
    'couchapp'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'watch'
  ]);
};