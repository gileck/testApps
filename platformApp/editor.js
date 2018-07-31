module.exports = function () {
    let app;
    const VIDEO_COMP_TYPE = 'wysiwyg.viewer.components.Video';
    const BUTTON_COMP_TYPE = 'wysiwyg.viewer.components.SiteButton';
    const CONTAINER_BOX_COMP_TYPE = 'mobile.core.components.Container';
    const containerStyle = {"type":"TopLevelStyle","styleType":"custom","metaData":{"isPreset":false,"schemaVersion":"1.0","isHidden":false},"style":{"groups":{},"properties":{"alpha-bg":0.3,"alpha-brd":"1","bg":"rgba(255,222,95,1)","boxShadowToggleOn-shd":"true","brd":"#FFDE5F","brw":"0","rd":"0px","shd":"5.66px 5.66px 0px 0px rgba(219,186,59,1)"},"propertiesSource":{"alpha-bg":"value","bg":"value","brd":"value","brw":"value","rd":"value","shd":"value"}},"componentClassName":"mobile.core.components.Container","pageId":"","compId":"","skin":"wysiwyg.viewer.skins.area.DefaultAreaSkin"};
    const bigLayout = {height: 500, width: 800, x: 0, y: 0};
    const smallLayout = {x: 300, y: 300, width: 142, height: 40};

    const createButtonStructure = sructureToOverride => Object.assign(buttonStructure, sructureToOverride || {});


    const buttonStructure  = {
        componentType: 'wysiwyg.viewer.components.SiteButton',
        layout: {x: 0, y: 0, width: 142, height: 40},
        styleId: "b1",
        skin: "wysiwyg.viewer.skins.button.ShinyButtonISkin",
        type: "Component",
        data: {
            label: "new label",
            type: "LinkableButton"
        },
        props: {
            align: "center",
            margin: 0,
            type: "ButtonProperties"
        }
    };



    const containerStructure = {
        componentType: 'mobile.core.components.Container',
        style: 'c4',
        type: 'Container',
        components: [buttonStructure, createButtonStructure({
            layout: smallLayout,
            data: {
                label: "new label 2 ",
                type: "LinkableButton"
            }
        })],
        layout: bigLayout,

    };


    const compStructure  = id => ({
        componentType: 'platform.components.AppWidget',
        layout: bigLayout,
        style: 'appWidget1',
        styleId: 'appWidget1',
        type: 'Container',
        data: {
            type: 'AppController',
            applicationId: id,
            name: 'fff',
            controllerType: 'ffff'
        },
        components: [containerStructure]
    });

    // documentServices.components.add(documentServices.pages.getCurrentPage(), compStructure)


    async function editorReady(_editorSDK, _appDefinitionId, options) {
        const pageRef = await _editorSDK.pages.getCurrent();
        const appInfo = await _editorSDK.document.tpa.app.getDataByAppDefId('', _appDefinitionId);
        app = new App(_editorSDK, _appDefinitionId, pageRef, appInfo.applicationId);
        console.log(_editorSDK);
        //
        // const boxId = "comp-jhqa96tj";
        // const buttonId = "comp-jhqa9mb3";

        // const boxRef = await _editorSDK.document.components.getById("",{id: boxId});
        // const buttonRef = await _editorSDK.document.components.getById("",{id: buttonId});
        // const page = await _editorSDK.document.getAncestors.getPage("",{componentRef: comp});
        // console.log("buttonRef",buttonRef);
        // const properties = await _editorSDK.document.components.style.get("",{componentRef: buttonRef});
        // console.log(properties);

        // if (options.firstInstall) await app.installAppWidget();
        // if (options.firstInstall) await app.install2();
        // if (options.firstInstall) await app.install2();
        await app.addControllerComponent('c1');
        // await _editorSDK.document.components.add('token', {
        //     componentDefinition: {
        //         componentType: 'platform.components.AppController',
        //         data: {
        //             applicationId: appInfo.applicationId.toString(),
        //             controllerType: 'c2',
        //             name: 'Name'
        //         }
        //     },
        //     pageRef: await _editorSDK.document.siteSegments.getSiteStructure('token')
        // });
    }

    async function onEvent(event) {
        console.log(event);
        if (app.eventHandlers[event.eventType]) {
            app.eventHandlers[event.eventType].call(app, event.eventPayload);
        }
    }

    async function getAppManifest() {
        return {
            controllersStageData: {
                fooBar: {
                    default: {
                        visibility: 'DEV',
                        connections: {
                            "Box": {
                                "displayName": "MyApp",
                                "behavior": {
                                    "resizable": true
                                },
                                "gfpp": {
                                    desktop: {
                                        mainAction1: {
                                            label: "MAIN",
                                            actionId: 1
                                        }
                                    }
                                }
                            },
                            "strip": {
                                "behavior": {
                                    "resizable": true,
                                    "toggleShowOnAllPagesEnabled": false,
                                    "pinnable": false
                                }
                            },
                            "fox": {
                                "behavior": {
                                    "resizable": 'false',
                                    "toggleShowOnAllPagesEnabled": false,
                                    "pinnable": false
                                }
                            },
                            "shape": {
                                "behavior": {
                                    "resizable": false,
                                    "toggleShowOnAllPagesEnabled": false,
                                    "pinnable": false
                                }
                            },
                            "Play": {
                                "displayName": "playButton",
                                "behavior": {
                                    "resizable": false,
                                    "toggleShowOnAllPagesEnabled": true,
                                    "pinnable": true
                                }
                            },
                            "Pause": {
                                "behavior": {
                                    "resizable": false,
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

    class App {
        constructor(editorSDK, appDefinitionId, pageRef, applicationId) {
            this.editorSDK = editorSDK;
            this.appDefinitionId = appDefinitionId;
            this.pageRef = pageRef;
            this.components = {};
            this.eventHandlers = {
                "componentDeleted": this.onComponentDeleted,
                "controllerAdded": this.onControllerAdded,
                "controllerSettingsButtonClicked": this.onControllerSettingsButtonClicked
            }
            this.applicationId = applicationId;
        }

        async connect(controllerRef, componentRef, role) {
            this.editorSDK.controllers.connect('token', {
                controllerRef,
                connectToRef: componentRef,
                role: role,
                isPrimary: true
            });
        }

        async addComponent(compType, data, root) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: compType,
                    data: {
                        applicationId: this.appDefinitionId,
                        ...data
                    }
                },
                pageRef: this.pageRef
            });
        }

        async addComponentInContainer(compType, root, data, layout) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: compType,
                    data: {
                        // applicationId: this.appDefinitionId,
                        ...data
                    },
                    layout
                },
                pageRef: root
            });
        }

        async addContainerBoxInController(compType, root, layout, style) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: compType,
                    layout,
                    style
                },
                pageRef: root
            });
        }

        async addConnectedComponent(componentType, role, data = {}) {
            const compRef = await this.addComponent(componentType, data);
            const controllerRef = await this.getController();
            await this.connect(controllerRef, compRef, role);
            return compRef;
        }

        async install2() {

            const controllerRef = await this.addControllerComponent("c1");
            const publish = await this.addComponentInContainer(BUTTON_COMP_TYPE, this.pageRef,
                {label: "Publish"},
                {x: 200, y: 20, width: 100, height: 30});
            const subscribe = await this.addComponentInContainer(BUTTON_COMP_TYPE, this.pageRef,
                {label: "Subscribe"},
                {x: 200, y: 80, width: 100, height: 30});
            const publish2 = await this.addComponentInContainer(BUTTON_COMP_TYPE, this.pageRef,
                {label: "Publish2"},
                {x: 200, y: 120, width: 100, height: 30});
            const subscribe2 = await this.addComponentInContainer(BUTTON_COMP_TYPE, this.pageRef,
                {label: "Subscribe2"},
                {x: 200, y: 160, width: 100, height: 30});

            await this.connect(controllerRef, publish, "publish");
            await this.connect(controllerRef, subscribe, "subscribe");
            await this.connect(controllerRef, publish2, "publish2");
            await this.connect(controllerRef, subscribe2, "subscribe2");
            // await this.removeTPAWidget("14ffd3c2-de00-73d6-1831-64f837bb83f6");
        }

        async install() {
            await this.removeTPAWidget("14ffd3c2-de00-73d6-1831-64f837bb83f6");
            const controller = await this.addController({height: 290, width: 392, x: 208, y: 65},
                'appWidget1',
                'AppWidget');
            const containerBox = await this.addContainerBoxInController(CONTAINER_BOX_COMP_TYPE, this.pageRef,
                {x: 29, y: 14, height: 259, width: 324}, containerStyle);
            //
            const playButtonRef = await this.addComponentInContainer(BUTTON_COMP_TYPE, containerBox, {},
                {x: 18, y: 149});

            const pauseButtonRef = await this.addComponentInContainer(BUTTON_COMP_TYPE, containerBox, {},
                {x: 194, y: 149});

            await this.editorSDK.components.data.update(null,
                {componentRef: pauseButtonRef, data: {label: 'Pause'}});
            await this.editorSDK.components.data.update(null,
                {componentRef: playButtonRef, data: {label: 'Play'}});

            await this.connect(controller, playButtonRef, "Play");
            await this.connect(controller, pauseButtonRef, "Pause");
            await this.connect(controller, containerBox, "Box");


            // await this.addConnectedComponent(VIDEO_COMP_TYPE, 'Player', {videoId: "WWpQK3nQclU"});
            // const playButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Play');
            // await this.editorSDK.components.data.update(null, {componentRef: playButtonRef, data: {label: 'Play'}});
            // const pauseButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Pause');
            // await this.editorSDK.components.data.update(null, {componentRef: pauseButtonRef, data: {label: 'Pause'}});
        }

        async installAppWidget() {
            await this.removeTPAWidget("14ffd3c2-de00-73d6-1831-64f837bb83f6");
            const appWidgetRef = await this.editorSDK.components.add('token', {
                componentDefinition: compStructure(this.appDefinitionId),
                pageRef: this.pageRef
            });









            // await this.addConnectedComponent(VIDEO_COMP_TYPE, 'Player', {videoId: "WWpQK3nQclU"});
            // const playButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Play');
            // await this.editorSDK.components.data.update(null, {componentRef: playButtonRef, data: {label: 'Play'}});
            // const pauseButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Pause');
            // await this.editorSDK.components.data.update(null, {componentRef: pauseButtonRef, data: {label: 'Pause'}});
        };

        async addControllerComponent(type) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppController',
                    data: {
                        applicationId: this.applicationId.toString(),
                        controllerType: type,
                        name: 'Name'
                    },
                },
                pageRef: this.pageRef
            });
        }

        async addController(layout, style, type = "AppController") {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.' + type,
                    data: {
                        applicationId: this.applicationId,
                        controllerType: 'fooBar',
                        name: 'Item'
                    },
                    layout,
                    style
                },
                pageRef: this.pageRef
            });
        }

        async addAppWidget(layout, style) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppWidget',
                    data: {
                        applicationId: this.appDefinitionId,
                        controllerType: 'fooBar',
                        name: 'Item'
                    },
                    layout,
                    style
                },
                pageRef: this.pageRef
            });
        }

        async removeAllConnectedComponents() {
            const controllerRef = await this.getController();
            const connectedComponents = await this.editorSDK.controllers.listConnectedComponents(null, {controllerRef});
            connectedComponents.forEach(componentRef => {
                this.editorSDK.components.remove(null, {componentRef});
            });
        }

        async removeController() {
            const controllerRef = await this.getController();
            this.editorSDK.components.remove(null, {componentRef: controllerRef});
        }

        async onComponentDeleted() {
            await this.removeAllConnectedComponents();
            await this.removeController();
            await this.removeTPAWidget();
        }

        async onControllerAdded() {

        }

        async removeTPAWidget(widgetId) {
            const componentsRefs = await this.editorSDK.components.getAllComponents();
            const componentsData = await Promise.all(componentsRefs.map(compRef => this.editorSDK.components.data.get(null, {componentRef: compRef})));
            const components = componentsData.map((comp, index) => Object.assign({}, comp, {componentRef: componentsRefs[index]}));
            const widget = await components.find(c => c.widgetId === widgetId);
            if (!widget) return;
            this.editorSDK.components.remove(null, {componentRef: widget.componentRef});
        }

        async onControllerSettingsButtonClicked({componentRef}) {
            this.editorSDK.editor.openModalPanel(null, {
                title: "MY MODAL",
                componentRef,
                initialData: {a: 1},
                width: "90%",
                height: "90%",
                url: "modal.html"
            })
        }

        async getController() {
            const componentsRefs = await this.editorSDK.components.getAllComponents();
            const componentsData = await Promise.all(componentsRefs.map(compRef => this.editorSDK.components.data.get(null, {componentRef: compRef})));
            const components = componentsData.map((comp, index) => Object.assign({}, comp, {componentRef: componentsRefs[index]}));
            const controller = components.find(c => c.type === "AppController");
            return controller.componentRef;
        }

        async getComponents() {
            const controllerRef = await this.getController();
            const connectedComponents = await this.editorSDK.controllers.getControllerConnections(null, {controllerRef});
            const connectedComponentsRefs = connectedComponents.map(c => c.componentRef);
            const componentsData = await Promise.all(connectedComponentsRefs.map(compRef => this.editorSDK.components.data.get(null, {componentRef: compRef})));
            const components = connectedComponents.map((comp, index) => Object.assign({}, comp, componentsData[index]));
            return components;
        }

        async getComponentByRole(role) {
            const components = await this.getComponents();
            return components.find(comp => comp.connection.role === role);
        }

        async updateConnection(componentRef, role, connectionConfig) {
            console.log(await this.getController());
            this.editorSDK.controllers.connect('token', {
                controllerRef: await this.getController(),
                connectToRef: componentRef,
                role: role,
                connectionConfig,
                isPrimary: true
            });
        }

        async printComponents() {
            this.editorSDK.components.get()
        }

        testAPI() {
            // const InvalidPrefixReason = _editorSDK.document.routers.InvalidPrefixReason;
            // _editorSDK.document.routers.isValidPrefix("", {prefix: "1"}).then((result) => {
            //     switch (result.errorCode) {
            //         case InvalidPrefixReason.PREFIX_CAN_NOT_BE_EMPTY:
            //             console.log(result.message);
            //             break;
            //         case InvalidPrefixReason.PREFIX_IS_TOO_LONG:
            //             console.log(result.message);
            //             break;
            //         case InvalidPrefixReason.PREFIX_IS_DUPLICATE_OF_URI_SEO:
            //             console.log(result.message);
            //             break;
            //         case InvalidPrefixReason.PREFIX_CONTAINS_INVALID_CHARACTERS:
            //             console.log(result.message);
            //             break;
            //         case InvalidPrefixReason.PREFIX_IS_FORBIDDEN_WORD:
            //             console.log(result.message);
            //             break;
            //         case InvalidPrefixReason.PREFIX_IS_IN_USE_BY_ANOTHER_APPLICATION:
            //             console.log(result.message);
            //             break;
            //     }
            // });

            // setTimeout(() => _editorSDK.document.save().then(() => console.log("SAVED")).catch(e => console.log("--------ERROR--------", e)), 4000);
        }

    }

    return {

        editorReady,
        onEvent,
        getAppManifest
    }
}();



















