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

#include <hiredis/async.h>
#include <hiredis/hiredis.h>
#include <hiredis/adapters/libevent.h>

void in_msg(redisAsyncContext * context, void *reply, void * privdata) {

  redisReply * rd_reply = reply;
  if (rd_reply == NULL)
    return;


  if (rd_reply->type == REDIS_REPLY_ARRAY)
  {

	if (3 >= rd_reply->elements)
		return;


    for (uint8_t element = 0; element < rd_reply->elements; element++) 
    {

      switch (element)
      {
        case 1:
          printf("Subscribed Channel: %s\n", rd_reply->element[element]->str);
          break;

        case 2:
          printf("Incoming Channel: %s\n", rd_reply->element[element]->str);
          break;

        case 3:
          printf("Message: %s\n", rd_reply->element[element]->str);
          break;

        default:
          break;
      }
    }
  }
}

int main(int argc, char ** argv) 
{
  signal(SIGPIPE, SIG_IGN);
  struct event_base * base = event_base_new();

  redisAsyncContext * context = redisAsyncConnect("127.0.0.1", 6379);
  if (context->err)
  {
    printf("error: %s\n", context->errstr);
    return 1;
  }

  redisLibeventAttach(context, base);
  redisAsyncCommand(context, in_msg, NULL, "PSUBSCRIBE test_channel/*");
  event_base_dispatch(base);

  return 0;
}
