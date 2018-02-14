module.exports = function () {
    let app;

    async function editorReady(_editorSDK, _appDefinitionId, options) {
        console.log(_editorSDK);
        const pageRef = await _editorSDK.pages.getCurrent();
        app = new App(_editorSDK, _appDefinitionId, pageRef);
        if (options.firstInstall) {
            await app.install();
        }
        // setTimeout(() => , 3000);
        const playButton = await app.getComponentByRole("Play");
        console.log(playButton);
        await app.updateConnection(playButton.componentRef, "Play", {a: 1});
        const playButtonAfterUpdate = await app.getComponentByRole("Play");
        console.log(playButtonAfterUpdate);
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
            this.controllerRef = null;
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

        async addComponent(compType, data) {
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

        async addConnectedComponent(componentType, role, data = {}) {
            const compRef = await this.addComponent(componentType, data);
            await this.connect(this.controllerRef, compRef, role);
            this.components.push(compRef);
            return compRef;
        }

        async install() {
            this.controllerRef = await this.addController();
            await this.addConnectedComponent('wysiwyg.viewer.components.Video', 'Player', {videoId: "WWpQK3nQclU"});
            const playButtonRef = await this.addConnectedComponent('wysiwyg.viewer.components.SiteButton', 'Play');
            await this.editorSDK.components.data.update(null, {componentRef: playButtonRef, data: {label: 'Play'}});
            const pauseButtonRef = await this.addConnectedComponent('wysiwyg.viewer.components.SiteButton', 'Pause');
            await this.editorSDK.components.data.update(null, {componentRef: pauseButtonRef, data: {label: 'Pause'}});
        }

        async addController() {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppController',
                    data: {
                        applicationId: this.appDefinitionId,
                        controllerType: 'fooBar',
                        name: 'Item'
                    }
                },
                pageRef: this.pageRef
            });
        }

        async removeAllConnectedComponents() {
            const connectedComponents = await this.editorSDK.controllers.listConnectedComponents(null, {controllerRef: this.controllerRef});
            connectedComponents.forEach(componentRef => {
                this.editorSDK.components.remove(null, {componentRef});
            });
        }

        async removeController() {
            console.log(this.controllerRef);
            this.editorSDK.components.remove(null, {componentRef: this.controllerRef});
        }

        async onComponentDeleted() {
            await this.removeAllConnectedComponents();
            await this.removeController();
            await this.removeTPAWidget();
        }

        async onControllerAdded() {

        }

        async removeTPAWidget() {
            const componentsRefs = await this.editorSDK.components.getAllComponents();
            const componentsData = await Promise.all(componentsRefs.map(compRef => this.editorSDK.components.data.get(null, {componentRef: compRef})));
            const components = componentsData.map((comp, index) => Object.assign({}, comp, {componentRef: componentsRefs[index]}));
            const widget = await components.find(c => c.applicationId === "1336");
            if (!widget) return;
            this.editorSDK.components.remove(null, {componentRef: widget.componentRef});
        }

        async onControllerSettingsButtonClicked({componentRef}) {
            this.editorSDK.editor.openModalPanel(null, {
                title: "MY MODAL",
                componentRef,
                initialData: {a: 1},
                width: "99%",
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
        getAppManifest,
    }
}();


