#! /bin/bash
# /etc/init.d/buddy-service

### BEGIN INIT INFO
# Provides:          granslive-service
# Required-Start:    $local_fs $syslog $network
# Required-Stop:     $local_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Script to Start, Stop or Restart the GransLive Gateway Service
# chkconfig: 234 20 80  
### END INIT INFO

#BUDDY_SERVICE_USAGE is the message if this script is called without any options
BUDDY_SERVICE_USAGE="Usage: $0 {\e[00;32mstart\e[00m|\e[00;31mstop\e[00m|\e[00;31mkill\e[00m|\e[00;32mstatus\e[00m|\e[00;31mrestart\e[00m}"

node_pid() {
	echo `ps -fe | grep node | grep -v grep | tr -s " "|cut -d" " -f2`
}

start() {
	echo "Starting Granslive Buddy service"
    pid=$(node_pid)
	if [ -n "$pid" ]; then
    	echo -e "\e[00;31mGransLive Buddy App is already running (pid: $pid)\e[00m"
	else
    	cd ~/granslive/buddy
    	sudo node server.js &
    	echo $! > node.pid
	fi
	return 0
}

stop() {
	echo "Stopping Granslive Buddy service"
	if [ -n "$(node_pid)" ]; then
     for pid in $(node_pid)
		do
		kill -9 $pid 2>&1 > /dev/null
		done
	fi

    PIDFile=~/granslive/buddy/node.pid
    if [ -f "$PIDFile" ]; then
        sudo kill -9 $(cat $PIDFile)
        sudo kill -9 $(($(cat $PIDFile) + 1))
        sudo rm $PIDFile
    fi
    return 0
}

status(){
	pid=$(node_pid)
	if [ -n "$pid" ]
    	then echo -e "\e[00;32mGransLive Buddy Service is running with pid: $pid\e[00m"
	else
    	echo -e "\e[00;31mGransLive Buddy Service is not running\e[00m"
    	return 3
	fi
}

terminate() {
	echo -e "\e[00;31mTerminating GransLive Buddy Service \e[00m"
    sudo kill -9 $(node_pid)
}

case $1 in
	start)
	  start
	;;
	stop)  
	  stop
	;;
	restart)
	  stop
	  start
	;;
	status)
		status
		exit $?  
	;;
	kill)
		terminate
	;;		
	*)
		echo -e $BUDDY_SERVICE_USAGE
	;;
esac   

exit 0
