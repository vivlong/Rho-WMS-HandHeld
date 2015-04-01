require 'rho/rhocontroller'
require 'helpers/browser_helper'

class GTController < Rho::RhoController
  include BrowserHelper

  # GET /GT
  def index
    @gts = GT.find(:all)
    render :back => '/app'
  end
  
end
