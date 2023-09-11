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
 ** Project:              Syrus4 - redis_subs
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
#include <signal.h>
#include <stdio.h>


#include <hiredis/hiredis.h>



int main(int argc, char ** argv) 
{
  signal(SIGPIPE, SIG_IGN);

  redisContext *context = redisConnect("127.0.0.1", 6379);
  if (context->err)
  {
    printf("error: %s\n", context->errstr);
    return 1;
  }

  if (3 > argc)
  {
    printf("Usage: redis_publish channel message\n");
    return 1;
  }

  redisCommand(context, "PUBLISH %s %s", argv[1], argv[2]);

  return 0;
}
