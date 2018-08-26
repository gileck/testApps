
module.exports = {
    controller: () => ({
        pageReady: $w => {
            $w("@button2").label = 'CONTROLLER 2';
        }
    })
};

