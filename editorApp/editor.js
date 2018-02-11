let editorSDK;

async function editorReady(_editorSDK, _appDefinitionId) {
    editorSDK = _editorSDK;
    console.log(editorSDK);
    console.log(_appDefinitionId);
    const playButtonId = "comp-jd00kqxo";
    const pauseButtonId = "comp-jd00kpvv";

    let controllerRef;
    const pageRef = await editorSDK.pages.getCurrent();

    const controllers = await editorSDK.controllers.listAllControllers();
    console.log(controllers);
    if (controllers.length === 0) {
        controllerRef = editorSDK.components.add('token', {
            componentDefinition: {
                componentType: 'platform.components.AppController',
                data: {
                    applicationId: _appDefinitionId,
                    controllerType: 'fooBar',
                    name: 'Item'
                }
            },
            pageRef
        });
    } else {
        controllerRef = controllers[0].controllerRef;
    }
    editorSDK.controllers.connect('token', {
        controllerRef,
        connectToRef: {
            type: "DESKTOP", id: playButtonId
        },
        role: 'Play',
        isPrimary: true
    });
    editorSDK.controllers.connect('token', {
        controllerRef,
        connectToRef: {
            type: "DESKTOP", id: pauseButtonId
        },
        role: 'Pause',
        isPrimary: true
    });

}

function onEvent(event) {
    if (event === "controllerAdded") {
        console.log(event);
    }
}

function getAppManifest() {
    return {
        controllersStageData: {
            fooBar: {
                default: {
                    connections: {
                        "Play": {
                            "behavior": {
                                "resizable": false,
                                "toggleShowOnAllPagesEnabled": true,
                                "pinnable": true
                            }
                        },
                        "Pause": {
                            "behavior": {
                                    "resizable": 'proportional',
                                    "toggleShowOnAllPagesEnabled": false,
                                    "pinnable": false
                            }
                        }
                    }
                }
            }
        }
    }
}


module.exports = {
    editorReady,
    onEvent,
    getAppManifest
};


/*
const META_DATA_OVERRIDES = {
    [META_DATA_TYPES['IS_PROPORTIONALLY_RESIZABLE']]: true,
    [META_DATA_TYPES['ENFORCE_RESIZABLE_CORNERS']]: undefined,
    [META_DATA_TYPES['RESIZABLE_SIDES']]: [constants.RESIZE_SIDES.TOP, constants.RESIZE_SIDES.LEFT, constants.RESIZE_SIDES.BOTTOM, constants.RESIZE_SIDES.RIGHT],
    [META_DATA_TYPES['RESIZE_ONLY_PROPORTIONALLY']]: undefined,
    [META_DATA_TYPES['CONTAINABLE']]: false,
    [META_DATA_TYPES['CONTAINABLE_BY_STRUCTURE']]: undefined,
    [META_DATA_TYPES['LAYOUT_LIMITS']]: {
        minWidth: utils.siteConstants.COMP_SIZE.MIN_WIDTH,
        minHeight: utils.siteConstants.COMP_SIZE.MIN_HEIGHT,
        maxWidth: utils.siteConstants.COMP_SIZE.MAX_WIDTH,
        maxHeight: utils.siteConstants.COMP_SIZE.MAX_HEIGHT,
        aspectRatio: 4
    }
};
 */