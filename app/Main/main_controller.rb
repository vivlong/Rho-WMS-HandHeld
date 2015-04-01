require 'rho/rhocontroller'
require 'helpers/browser_helper'

class MainController < Rho::RhoController
  include BrowserHelper
 
  # GET /Main
  def index
    @mains = Main.find(:all)
    render :back => '/app'
  end

end
