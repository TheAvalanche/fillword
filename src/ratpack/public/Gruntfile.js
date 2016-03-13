module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        bower_concat: {
            main: {
                dest: {
                    'js': 'build/third_party.js',
                    'css': 'build/third_party.css'
                },
                mainFiles: {
                    'bootstrap': ['dist/css/bootstrap.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('default', ['uglify']);

};