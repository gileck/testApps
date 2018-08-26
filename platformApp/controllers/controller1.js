module.exports = {
    controller: function (controllerConfig) {
        return {
            pageReady: $w => {
                $w("@button1").label = 'CONTROLLER 1';
            }
        }
    }
};

