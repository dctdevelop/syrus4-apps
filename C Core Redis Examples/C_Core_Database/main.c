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

  redisContext *context = redisConnect("127.0.0.1", 7480);
  if (context->err)
  {
    printf("error: %s\n", context->errstr);
    return 1;
  }


  // Using GET
  redisReply *reply = (redisReply *)redisCommand(context, "GET network_interface");
  if (reply == NULL)
  {
      printf("GET failed\n");
  }
  else
  {
	  printf("GET Result: %s\n\n", reply->str);
      freeReplyObject(reply);
  }

  // Using HGET
  const char *hash_name = "interface_current_analog";
  const char *hash_key = "BAT";
  reply = (redisReply *)redisCommand(context, "HGET %s %s", hash_name, hash_key);
  if (reply == NULL)
  {
	  printf("HGET failed\n");
  }
  else
  {
	  printf("HGET Result: %s\n\n", reply->str);
	  freeReplyObject(reply);
  }

  // Using HGETALL
  reply = (redisReply *)redisCommand(context, "HGETALL %s", hash_name);
  if (reply == NULL)
  {
	  printf("HGETALL failed\n");
  }
  else
  {
	  if (reply->type == REDIS_REPLY_ARRAY)
	  {
		  printf("HGETALL Result:\n");
		  for (size_t i = 0; i < reply->elements; i += 2)
		  {
			  printf("Field: %s, Value: %s\n", reply->element[i]->str, reply->element[i + 1]->str);
		  }
		  printf("\n");
	  }
	  freeReplyObject(reply);
  }

  // Using LRANGE
  const char *list = "psm_events";
  reply = (redisReply *)redisCommand(context, "LRANGE %s 0 -1", list);
  if (reply == NULL)
  {
      printf("LRANGE failed\n");
  }
  else
  {
      if (reply->type == REDIS_REPLY_ARRAY)
      {
          printf("LRANGE result:\n");
          for (size_t i = 0; i < reply->elements; i++)
          {
              printf("%s\n", reply->element[i]->str);
          }
          printf("\n");
      }
      freeReplyObject(reply);
  }


  return 0;
}
