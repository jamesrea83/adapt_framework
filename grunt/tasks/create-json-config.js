module.exports = function(grunt) {
    // This is a simple function to take the course's config.json and append the theme and menu .json
    grunt.registerTask('create-json-config', 'Creating config.json', function() {
        var customItems = ['theme', 'menu'];
        var configJson = grunt.file.readJSON(grunt.config.get('sourcedir') + 'course/config.json');

        customItems.forEach(function (customItem) {
            // As any theme folder may be used, we need to first find the location of the
            // theme.json file
            grunt.file.recurse(grunt.config.get('sourcedir') + customItem + '/', function(abspath, rootdir, subdir, filename) {
                if (filename == customItem + '.json') {
                    customItemJsonFile = rootdir + subdir + '/' + filename;
                }
            });

            if (customItemJsonFile == '') {
                grunt.fail.fatal('Unable to locate ' + customItem + '.json, please ensure a valid ' + customItem + ' exists');
            }

            var customItemJson = grunt.file.readJSON(customItemJsonFile);

            // This effectively combines the JSON
            for (var prop in customItemJson) {
                configJson[prop] = customItemJson[prop];
            }
        });

        grunt.file.write(grunt.config.get('outputdir') + 'course/config.json', JSON.stringify(configJson));
    });
}
