### server module

this module is a class that can create server with config information.

config is an object is as follows:
``` bash
config = {
    hostname,
    port,
    eventEmitter,
    event
}
```
after we create server, server will emit every requests sent to.
