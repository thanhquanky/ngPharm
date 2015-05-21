module.exports = function(grunt) {
	grunt.initConfig({
		bower: {
			install: {
				options: {
					targetDir: 'public/components/',
					install: true,
					
				}
			}
		},
		watch: {
			scripts: {
				files: ["**/*.js"],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}
		},
		jshint: {
			options: {
		      curly: true,
		      eqeqeq: true,
		      eqnull: true,
		      browser: true,
		      globals: {
		        jQuery: true
		      },
		    }
		},
		express: {
		    options: {
		      // Override defaults here 
		    },
		    dev: {
		      options: {
		        script: 'server.js'
		      }
		    },
		    prod: {
		      options: {
		        script: 'server.js',
		        node_env: 'production'
		      }
		    }
		  }
	});
	
	grunt.registerTask('default', ['bower', 'npm-install', 'express', 'watch']);
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-npm-install');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-express-server');

}