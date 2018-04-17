module.exports = function () {
    let app;
    const VIDEO_COMP_TYPE = 'wysiwyg.viewer.components.Video';
    const BUTTON_COMP_TYPE = 'wysiwyg.viewer.components.SiteButton';
    const CONTAINER_BOX_COMP_TYPE = 'mobile.core.components.Container';

    async function editorReady(_editorSDK, _appDefinitionId, options) {
        console.log("editorReady");
        console.log(_editorSDK);

        _editorSDK.editor.setAppAPI("token", {a: () => {}});

        const pageRef = await _editorSDK.pages.getCurrent();
        app = new App(_editorSDK, _appDefinitionId, pageRef);
        if (options.firstInstall) await app.install2();
    }

    async function onEvent(event) {
        console.log(event);
        if (app.eventHandlers[event.eventType]) {
            app.eventHandlers[event.eventType].call(app, event.eventPayload);
        }
    }

    function getAppManifest() {
        return {
            controllersStageData: {
                fooBar: {
                    default: {
                        visibility: 'DEV',
                        connections: {
                            "Box": {
                                "gfpp": {
                                    desktop: {
                                        mainAction1: {
                                            label: "MAIN"
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

    class App {
        constructor(editorSDK, appDefinitionId, pageRef) {
            this.editorSDK = editorSDK;
            this.appDefinitionId = appDefinitionId;
            this.pageRef = pageRef;
            this.components = {};
            this.eventHandlers = {
                "componentDeleted": this.onComponentDeleted,
                "controllerAdded": this.onControllerAdded,
                "controllerSettingsButtonClicked": this.onControllerSettingsButtonClicked

            }
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

        async addContainerBoxInController(compType, root, layout) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: compType,
                    layout
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
            // await this.addControllerComponent("c1");
            // await this.removeTPAWidget("14ffd3c2-de00-73d6-1831-64f837bb83f6");
        }

        async install() {
            const controller = await this.addController({height: 290, width: 392, x: 208, y: 65});

            const containerBox = await this.addContainerBoxInController(CONTAINER_BOX_COMP_TYPE, controller,
                {x: 29, y: 14, height: 259, width: 324});

            const playButtonRef = await this.addComponentInContainer(BUTTON_COMP_TYPE, containerBox, {},
                {x: 18, y: 149});

            const pauseButtonRef = await this.addComponentInContainer(BUTTON_COMP_TYPE, containerBox, {},
                {x: 194, y: 149});

            await this.editorSDK.components.data.update(null, {componentRef: pauseButtonRef, data: {label: 'Pause'}});
            await this.editorSDK.components.data.update(null, {componentRef: playButtonRef, data: {label: 'Play'}});

            await this.connect(controller, playButtonRef, "Play");
            await this.connect(controller, pauseButtonRef, "Pause");
            await this.connect(controller, containerBox, "Box");

            await this.removeTPAWidget("14ffd3c2-de00-73d6-1831-64f837bb83f6");
            // await this.addConnectedComponent(VIDEO_COMP_TYPE, 'Player', {videoId: "WWpQK3nQclU"});
            // const playButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Play');
            // await this.editorSDK.components.data.update(null, {componentRef: playButtonRef, data: {label: 'Play'}});
            // const pauseButtonRef = await this.addConnectedComponent(BUTTON_COMP_TYPE, 'Pause');
            // await this.editorSDK.components.data.update(null, {componentRef: pauseButtonRef, data: {label: 'Pause'}});
        }

        async addControllerComponent(type) {
            await this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppController',
                    data: {
                        applicationId: this.appDefinitionId,
                        controllerType: type,
                        name: 'Name'
                    },
                },
                pageRef: this.pageRef
            });
        }

        async addController(layout) {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppWidget',
                    data: {
                        applicationId: this.appDefinitionId,
                        controllerType: 'fooBar',
                        name: 'Item'
                    },
                    layout
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

    }

    return {

        editorReady,
        onEvent,
        getAppManifest
    }
}();



















