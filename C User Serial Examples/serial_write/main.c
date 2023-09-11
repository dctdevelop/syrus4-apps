/***************************************************************************************************
 ** Module name: main.c
 **
 ** Copyright 2020 Digital Communication Technologies
 ** All Rights Reserved.
 **
 ** The information contained here is confidential property of Digital
 ** Communications Technologies.
 ** The use, copying, transfer or disclosure of such information is prohibited
 ** except by express written agreement with Digital Communications Technologies.
 **
 ** Project:              Syrus4 - serial_test
 ** Author:               Fabian A. Ramirez Rodriguez
 **                       fabian.ramirez@digitalcomtech.com
 ** Date created:         Aug 30, 2023
 ** Compiler:             Cross compiler
 **                       gcc-linaro-7.4.1-2019.02-x86_64_arm-linux-gnueabihf
 ** IDE:                  Eclipse
 **
 **************************************************************************************************/


/***************************************************************************************************
 ** Includes
 **************************************************************************************************/
#include <stdbool.h>
#include <string.h>
#include <syslog.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <termios.h>
#include <stdint.h>
#include <unistd.h>
#include <fcntl.h>
#include <signal.h>
#include <errno.h>

#define USER_SERIAL_PORT    "/dev/ttyS4"

/***************************************************************************************************
 **                                 Private functions prototype
 **              (Prototypes of the functions that are only used by this module)
 **************************************************************************************************/
void tty_write(int32_t fd, const void *p_data, uint16_t len);
int32_t tty_open(char *p_port, speed_t baud);
void tty_close(int32_t fd);
/***************************************************************************************************
 **                                      Private functions
 **                       (Functions that only can be used by this module)
 **************************************************************************************************/
int main(int argc, char ** argv)
{
  signal(SIGPIPE, SIG_IGN);


  	int32_t tty_port = tty_open(USER_SERIAL_PORT, (speed_t)B19200);

	if (0 >= tty_port)
	{
		//* Error opening port
		printf("Error opening tty: %s", strerror(errno));
		tty_port = 0;
		return 1;
	}

	if (2 > argc)
	{
		printf("Usage: serial_write \"message\"\n");
		return 1;
	}

	tty_write(tty_port, argv[1], strlen(argv[1]));
	tty_close(tty_port);

  return 0;
}

/*******************************************************************************
 * Function name    : 	void tty_write(int32_t fd, const char *p_data)
 * Created by       :	Nestor Andres Cabezas
 *                      ncabezas@digitalcomtech.com
 * Description      :   Write data to the tty port opened
 * Parameters:		:	int32_t fd
 * 							The file descriptor of the tty port opened
 * 						char *p_data
 * 							the data to be sent
 * Returns          :   void
 ******************************************************************************/
void tty_write(int32_t fd, const void *p_data, uint16_t len)
{
	if (0 != fd)
	{
		write(fd, p_data, len);
	}
}

/*******************************************************************************
 * Function name    : 	int32_t tty_open(char *p_port, uint32_t baud)
 * Created by       :	Nestor Andres Cabezas
 *                      ncabezas@digitalcomtech.com
 * Description      :   Opens the tty interface to use and gets a file
 * 						descriptor for it
 * Parameters:		:	char *p_port
 * 							Pointer to the tty port id to use
 * 						uint32_t baud
 * 							The baud rate to use in the communication
 * Returns          :   Return a new file descriptor for the tty opened,
 * 						 or -1 on error.
 ******************************************************************************/
int32_t tty_open(char *p_port, speed_t baud)
{
	//Create the structure
	struct termios tty;
	/*
	 * File Descriptor
	 * port  	- /dev/tty...
	 * O_RDWR   - Read/Write access to serial port
	 * O_NOCTTY - No terminal will control the process
	 * */

	int32_t fd = open(p_port, O_RDWR | O_NOCTTY | O_SYNC);
	if (fd < 0)
	{ //Error opening port
		return -1;
	}

	/*---------- Setting the Attributes of the serial port using termios structure --------- */

	//Get the current attributes of the Serial port
	if (tcgetattr(fd, &tty) != 0)
	{
		//Error getting attributes
		return -1;
	}

	cfsetospeed(&tty, baud); //Set write speed
	cfsetispeed(&tty, baud); //Set read speed

	/* 8N1 Mode */
	tty.c_cflag |= (CLOCAL | CREAD); /* ignore modem controls */
	tty.c_cflag &= ~CSIZE;
	tty.c_cflag |= CS8; /* 8-bit characters */
	tty.c_cflag &= ~PARENB; /* no parity bit */
	tty.c_cflag &= ~CSTOPB; /* only need 1 stop bit */
	tty.c_cflag &= ~CRTSCTS; /* no hardware flowcontrol */

	/* setup for non-canonical mode */
	tty.c_iflag &= ~(IGNBRK | BRKINT | PARMRK | ISTRIP | INLCR | IGNCR | ICRNL | IXON);
	tty.c_lflag &= ~(ECHO | ECHONL | ICANON | ISIG | IEXTEN);
	tty.c_oflag &= ~OPOST;

	tty.c_cc[VMIN] = 0;            // read doesn't block
	tty.c_cc[VTIME] = 1;            // 0.5 seconds read timeout

	if (tcsetattr(fd, TCSANOW, &tty) != 0)
	{
		//Error setting attributes
		return -1;
	}
	return fd;
}

/*******************************************************************************
 * Function name    : 	void tty_close(int32_t fd)
 * Created by       :	Nestor Andres Cabezas
 *                      ncabezas@digitalcomtech.com
 * Description      :   Closes the tty interface specified
 * Parameters:		:	int32_t fd
 * 							The file descriptor of the tty port opened
 * Returns          :   void
 ******************************************************************************/
void tty_close(int32_t fd)
{
	close(fd);
}



