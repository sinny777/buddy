#! /bin/sh

 ### BEGIN INIT INFO
 # Short-Description: GransLive Gateway Startup Script
 ### END INIT INFO

wget -q --spider http://google.com
if [ $? -eq 0 ]; then
    echo "Online"
    sudo rm -rf buddy-install.sh
	wget https://raw.githubusercontent.com/sinny777/buddy/master/app/resources/shellscripts/buddy-install.sh
	sudo bash buddy-install.sh
	
	sudo rm -rf buddy-service.sh
	wget https://raw.githubusercontent.com/sinny777/buddy/master/app/resources/shellscripts/init.d/buddy-service.sh
	sudo bash buddy-service.sh restart
else
    echo "Offline"
    sudo bash buddy-service.sh restart
fi

exit 0
