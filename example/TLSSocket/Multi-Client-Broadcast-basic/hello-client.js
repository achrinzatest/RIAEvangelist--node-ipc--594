import ipc from '../../../node-ipc.js';

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id = 'hello';
ipc.config.retry= 1500;
ipc.config.maxRetries=10;
ipc.config.tls={
    rejectUnauthorized:false
};

ipc.connectToNet(
    'world',
    function(){
        ipc.of.world.on(
            'connect',
            function(){
                ipc.log('## connected to world ##', ipc.config.delay);
                ipc.of.world.emit(
                    'app.message',
                    {
                        id      : ipc.config.id,
                        message : 'hello'
                    }
                );
            }
        );
        ipc.of.world.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world');
            }
        );
        ipc.of.world.on(
            'app.message',
            function(data){
                ipc.log('got a message from world : ', data.message);
            }
        );
        ipc.of.world.on(
            'kill.connection',
            function(data){
                ipc.log('world requested kill.connection');
                ipc.disconnect('world');
            }
        );
    }
);
