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
    concat: {
      css: {
        files: {
          'dist/css/bundle.css': [
            'assets/css/*.css'
          ]
        }
      },
      vendor: {
        files: {
          'dist/js/vendor.js': [
            'assets/vendor/angular.js',
            'assets/vendor/angular-*.js',
            'assets/vendor/pouchdb.js',
            'assets/vendor/showdown.js'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/vendor.min.js': ['dist/js/vendor.js'],
          'dist/js/bundle.min.js': ['dist/js/bundle.js']
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
        files: ['assets/vendor/*.js'],
        tasks: ['concat']
      },
      css: {
        files: ['assets/css/*.css'],
        tasks: ['concat:css']
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
    'concat',
    // 'uglify', // enable when index.html can chooses min, non-min dynamically
    'copy',
    'browserify'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'mkcouchdb',
    'couchapp'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect',
    'watch'
  ]);
};