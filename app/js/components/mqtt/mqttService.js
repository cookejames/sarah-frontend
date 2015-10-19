(function() {
    class MqttService {
        /*@ngInject*/
        constructor(mqttConfig, $q, LoopBackAuth) {
            this.mqttConfig = mqttConfig;
            this.$q = $q;
            this.LoopBackAuth = LoopBackAuth;
            var clientId = 'sarah-frontend-' + new Date().getTime();
            this.client = new Paho.MQTT.Client(mqttConfig.host, parseInt(mqttConfig.port), clientId);
            this.subscribers = [];
        }

        connect() {
            if (this.connected) {
                return this.$q(function(resolve) {
                    resolve();
                });
            }

            return this.$q((resolve) => {
                this.client.connect({
                    userName: this.LoopBackAuth.currentUserId,
                    password: 'Bearer ' + this.LoopBackAuth.accessTokenId,
                    onSuccess: () => {
                        this.connected = true;
                        this.client.onMessageArrived = (message) => {
                            this.subscribers.forEach((subscriber) => {
                                subscriber(message);
                            });
                        };
                        resolve();
                    }
                });
            });
        }

        addSubscriber(subscriber) {
            this.subscribers.push(subscriber);
        }

        subscribe(topic) {
            this.client.subscribe(topic);
        }

        publish(topic, message) {
            var msg = new Paho.MQTT.Message(message);
            msg.destinationName = topic;
            this.client.send(msg);
        }
    }
    register('sarahApp.mqtt').
        service('MqttService', MqttService);
})();