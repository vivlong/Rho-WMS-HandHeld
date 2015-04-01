require 'rho/rhocontroller'
require 'helpers/browser_helper'

class PICKController < Rho::RhoController
  include BrowserHelper

  # GET /PICK
  def index
    @picks = PICK.find(:all)
    render :back => '/app'
  end

end
