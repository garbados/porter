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
      dist: {
        files: {
          'dist/css/bundle.css': ['assets/css/*.css'],
          'dist/js/vendor.js': ['assets/vendor/*.js']
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
          'dist/js/bundle.js': ['assets/js/app.js', 'assets/js/**/*.js']
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
      css: {
        files: ['assets/css/*.css'],
        tasks: ['concat']
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