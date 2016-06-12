var generators = require('yeoman-generator');
var mkdirp = require('mkdirp');
var yosay = require('yosay');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

module.exports = generators.Base.extend({
  _createFolder(answers) {
    this.fs.copy(this.sourceRoot(), this.destinationRoot());
    
    this.fs.copyTpl(this.sourceRoot() + '/package.json', this.destinationRoot() + '/package.json', {
      name: answers.name || "",
      desc: answers.desc || ""
    });  

    this.fs.copyTpl(this.sourceRoot() + '/bower.json', this.destinationRoot() + '/bower.json', {
      name: answers.name || "",
    });  
  },
  _logger(type) {
    var args = Array.prototype.slice.call(arguments);
    if(type === "info") {
      args[0] = chalk.green("INFO ");
      console.log.apply(console, args);
    }
  },

  _dummyCopy(filename) {
    this._logger('info', 'copy file... ' + chalk.blue(filename));
    this.fs.copy(this.sourceRoot() + '/' + filename, this.destinationRoot() + '/' + filename);
  },

  _getPrompt() {
    return [
      {
        type    : 'input',
        name    : 'name',
        message : chalk.green("What's your project name?"),
        default : chalk.bold("default " + this.appname + '\n')
      },
      {
        type    : 'input',
        name    : 'desc',
        message : chalk.green("What's your project description?"),
        default : chalk.bold("default " + this.appname + '\n')
      }
    ];
  },

  prompting: function () {
    return this.prompt(this._getPrompt(), function(answers) {
      this._createFolder(answers);
    }.bind(this));
  },

  install() {
    this.installDependencies({
      npm: true,
      bower: true,
      callback: function() {
        chalk.bold('Denpendencies successfully installed');
      }
    });
  },

  configuring() {
    this._dummyCopy('.babelrc');
    this._dummyCopy('.eslintrc');
    this._dummyCopy('.gitignore');
  }




})