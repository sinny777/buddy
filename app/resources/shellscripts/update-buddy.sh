#!/bin/bash
#
# Provides: buddy
# Short-Description: Start/Stop Granslive Buddy  
# chkconfig: 234 20 80  
#
#
# Copyright (C) 2016 GransLive
#
# This program is free software: you can redistribute it and/or modify it under
# the terms of the GNU General Public License as published by the Free Software
# Foundation, either version 3 of the License, or (at your option) any later
# version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or FITNESS
# FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License along with
# this program.  If not, see <http://www.gnu.org/licenses/>.
#
# Source: https://github.com/sinny777/buddy

# sudo -i
 echo "<<<< INSIDE GRANSLIVE BUDDY STARTUP SCRIPT  >>>>>"

# Functions ==============================================

# return 1 if global command line program installed, else 0
# example
# echo "node: $(program_is_installed node)"
function program_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  type $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# return 1 if local npm package is installed at ./node_modules, else 0
# example
# echo "gruntacular : $(npm_package_is_installed gruntacular)"
function npm_package_is_installed {
  # set to 1 initially
  local return_=1
  # set to 0 if not found
  ls node_modules | grep $1 >/dev/null 2>&1 || { local return_=0; }
  # return value
  echo "$return_"
}

# display a message in red with a cross by it
# example
# echo echo_fail "No"
function echo_fail {
  # echo first argument in red
  printf "\e[31m✘ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# display a message in green with a tick by it
# example
# echo echo_fail "Yes"
function echo_pass {
  # echo first argument in green
  printf "\e[32m✔ ${1}"
  # reset colours back to normal
  echo "\033[0m"
}

# echo pass or fail
# example
# echo echo_if 1 "Passed"
# echo echo_if 0 "Failed"
function echo_if {
  if [ $1 == 1 ]; then
    echo_pass $2
  else
    echo_fail $2
  fi
}

# ============================================== Functions

cd ~
if [ ! -d "granslive" ]; then
	mkdir granslive
	echo "<<<< granslive DIRECTORY CREATED >>>>>"
fi
cd granslive
if [ ! -d "tools" ]; then
	mkdir tools
	echo "<<<< tools DIRECTORY CREATED >>>>>"
fi

cd tools
if [ $(program_is_installed node) == 0 ]; then
	echo "<<<< GOING TO INSTALL NODEJS INSIDE granslive/tools DIRECTORY >>>>>"
	wget https://nodejs.org/dist/v4.3.2/node-v4.3.2-linux-armv6l.tar.gz
	tar -xvf node-v4.3.2-linux-armv6l.tar.gz
	sudo rm -rf node-v4.3.2-linux-armv6l.tar.gz
	cd node-v4.3.2-linux-armv6l
	sudo cp -R * /usr/local/
else
	echo "node $(echo_if $(program_is_installed node))"
	echo "NODE ALREADY INSTALLED"
fi

if [ $(program_is_installed git) == 0 ]; then
	echo "<<<< GOING TO INSTALL GIT >>>>>"
	sudo apt-get install git
	sudo npm install bower -g
else
	echo "git  $(echo_if $(program_is_installed git))"
	echo "GIT ALREADY INSTALLED"
fi

cd ..

if [ ! -d "granslive-gateway" ]; then
	echo "<<<< GOING TO CREATE GRANSLIVE BUDDY APPLICATION >>>>>"
	sudo git clone https://github.com/sinny777/buddy.git
	cd granslive-gateway
else
	echo "<<<< GOING TO UPDATE GRANSLIVE BUDDY APPLICATION >>>>>"
	cd buddy
	sudo git fetch --all
	sudo git reset --hard origin/master
fi

sudo npm install
sudo bower --allow-root install
  
exit 0
