module.exports = function () {
    let experiments = {};

    const createApiClass = function (Element) {
        return class API extends Element {
            constructor($w, args) {
                super(...args);
                this.$w = $w;
            }

            set label(label) {
                const button = this.$w("@button1");
                button.label = label;
            }

            get Items() {
                console.log({experiments});
                if (experiments['Experiment1']) {
                    return "123456";
                } else {
                    return "567890";
                }
            }
        }
    };

    function getExperiments() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    'newAPI': true,
                    'Experiment1': false,
                    'Experiment2': false,
                    'Experiment3': false
                })
            }, 100);
        })
    }
    async function initAppForPage(appParams, appUtils, Wix, SDK) {
        experiments = await getExperiments();
        return;
    }


    const emptyController = Promise.resolve({
        pageReady: _.noop,
        exports: {}
    });

    const controllersByType = {
        'c1': Promise.resolve({
            pageReady: ($w) => {
                return Promise.resolve()
            },
            apiClass: createApiClass
        })
    };

    function createControllers(controllerConfigs) {
        return controllerConfigs.map(function (config) {
            if (controllersByType[config.type]) {
                return controllersByType[config.type]
            } else {
                return emptyController
            }
        });
    }


    return {
        initAppForPage,
        createControllers,
        exports: {}
    }

}();









