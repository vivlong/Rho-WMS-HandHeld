require 'rho/rhocontroller'
require 'helpers/browser_helper'

class VGPController < Rho::RhoController
  include BrowserHelper

  def vgp_scan_sotreno
    @strSSN = @params['id']
    if @strSSN
        render :action => :vgp_scan_sotreno, :back => url_for(:action => :index)
    else
        redirect :action => :index
    end
  end
     
  def vgp_scan_barcode
      @strSBC = @params['id']
      if @strSBC
          render :action => :vgp_scan_barcode, :back => url_for(:action => :index)
      else
          redirect :action => :index
      end
  end
  
  # GET /VGP
  def index
    @vgps = VGP.find(:all)
    render :back => '/app'
  end

end
