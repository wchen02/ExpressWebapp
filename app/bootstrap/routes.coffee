passport = require 'passport'
home = require '../routes'

exports.init = (app, options...) ->
  app.get '/', home.index
  app.all '*', home.index
