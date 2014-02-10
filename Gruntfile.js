module.exports = function (grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: grunt.file.readJSON('config.json'),
    jshint: {
      assets: [
        'Gruntfile.js',
        'app/core/js/**/*.js'
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
      },
      core: {
        files: {
          'dist/js/bundle.js': ['app/**/*.js']
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
            cwd: 'app/core/html/',
            src: ['*.html'],
            dest: 'dist/',
            filter: 'isFile'
          }, {
            expand: true,
            cwd: 'app/bootstrap/',
            src: ['**/*.html'],
            dest: 'dist/template/'
          }, {
            expand: true,
            cwd: 'lib/bootstrap/',
            src: ['*.eot', '*.svg', '*.ttf', '*.woff'],
            dest: 'dist/fonts/',
            filter: 'isFile'
          }
        ]
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
        files: ['app/**/*.js'],
        tasks: ['jshint', 'concat:core'],
      },
      vendor: {
        files: ['lib/*/*.js'],
        tasks: ['concat:bower']
      },
      html: {
        files: ['app/**/*.html'],
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
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.registerTask('build', [
    'jshint',
    'bower',
    'cssmin',
    'concat',
    'copy'
  ]);

  grunt.registerTask('prod', [
    // TODO ensure this breaks nothing
    'build',
    'uglify'
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

  grunt.registerTask('test', [
    'build',
    'karma'
  ]);
};