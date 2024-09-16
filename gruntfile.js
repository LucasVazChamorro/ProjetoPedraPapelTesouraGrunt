module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Limpeza de diretórios
        clean: {
            dist: ['dist'],
            dev: ['dev'],
            prebuild: ['prebuild']
        },

        // Compilação do LESS
        less: {
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        // Minificação e cópia do JavaScript
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    preserveComments: 'all'
                },
                files: {
                    'dev/scripts/main.js': 'src/scripts/main.js'
                }
            },
            dist: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },

        // Minificação do HTML
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },

        // Substituição de strings nos arquivos
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Cópia de arquivos estáticos
        copy: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['images/**', 'fonts/**'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['images/**', 'fonts/**'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Observar mudanças nos arquivos
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            },
            js: {
                files: ['src/scripts/**/*.js'],
                tasks: ['uglify:dev']
            }
        }
    });

    // Carregando os plugins do Grunt
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tarefa de desenvolvimento
    grunt.registerTask('dev', [
        'clean:dev',
        'less:development',
        'uglify:dev',
        'replace:dev',
        'copy:dev'
    ]);

    // Tarefa padrão (desenvolvimento com watch)
    grunt.registerTask('default', ['dev', 'watch']);

    // Tarefa de build para produção
    grunt.registerTask('build', [
        'clean:dist',
        'clean:prebuild',
        'less:production',
        'uglify:dist',
        'htmlmin:dist',
        'replace:dist',
        'copy:dist',
        'clean:prebuild'
    ]);
};