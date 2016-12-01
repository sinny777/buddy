#!/bin/bash

interfaces="/home/pi/Templates/interfaces"
if [ -f "$interfaces" ]
then
	sudo mv $interfaces /etc/network/interfaces
else
	echo "$interfaces not found."
fi

dhcpd="/home/pi/Templates/dhcpd.conf"
if [ -f "$dhcpd" ]
then
	sudo mv $dhcpd /etc/dhcp/dhcpd.conf
else
	echo "$dhcpd not found."
fi

iscdhcpserver="/home/pi/Templates/isc-dhcp-server"
if [ -f "$iscdhcpserver" ]
then
	sudo mv $iscdhcpserver /etc/default/isc-dhcp-server
else
	echo "$iscdhcpserver not found."
fi
   
hostapdconf="/home/pi/Templates/hostapd.conf"
if [ -f "$hostapdconf" ]
then
	sudo mv $hostapdconf /etc/hostapd/hostapd.conf
else
	echo "$hostapdconf not found."
fi

hostapd="/home/pi/Templates/hostapd"
if [ -f "$hostapd" ]
then
	sudo mv $hostapd /etc/default/hostapd
else
	echo "$hostapd not found."
fi

exit 0