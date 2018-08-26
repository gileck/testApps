module.exports = {
    controller: function () {
        return {
            pageReady: $w => {
                $w("@button3").label = 'CONTROLLER 3';
            }
        }
    }
};

