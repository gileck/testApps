const BOX_SLIDE_SHOW = {
    "type": "Container",
    "skin": "wysiwyg.common.components.boxSlideShow.viewer.skins.thinArrowsLargeSelectedCircleSkin",
    "layout": {
        "width": 980,
        "height": 440,
        "x": 0,
        "y": 0,
        "scale": 1,
        "rotationInDegrees": 0,
        "fixedPosition": false
    },
    "componentType": "wysiwyg.viewer.components.BoxSlideShow",
    "components": [
        {
            "type": "Container",
            "skin": "wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",
            "layout": {
                "width": 980,
                "height": 440,
                "x": 0,
                "y": 0,
                "scale": 1,
                "rotationInDegrees": 0,
                "anchors": [
                    {
                        "distance": 0,
                        "originalValue": 440,
                        "type": "BOTTOM_PARENT",
                        "locked": true,
                        "targetComponent": "comp-im0kb76b"
                    }
                ],
                "fixedPosition": false
            },
            "componentType": "wysiwyg.viewer.components.BoxSlideShowSlide",
            "components": [
                {
                    "layout": {
                        "x": 345,
                        "y": 72.83333333333334,
                        "fixedPosition": false,
                        "width": 248,
                        "height": 130,
                        "scale": 1,
                        "rotationInDegrees": 0
                    },
                    "componentType": "wysiwyg.viewer.components.WRichText",
                    "type": "Component",
                    "skin": "wysiwyg.viewer.skins.WRichTextNewSkin",
                    "data": {
                        "type": "StyledText",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "text": "<h3 class=\"font_3\">This is A</h3>\n\n<h3 class=\"font_3\"><span class=\"wixGuard\">​</span></h3>",
                        "stylesMapId": "CK_EDITOR_PARAGRAPH_STYLES",
                        "linkList": []
                    },
                    "props": {
                        "type": "WRichTextProperties",
                        "packed": false,
                        "brightness": 1,
                        "metaData": {
                            "isPreset": false,
                            "schemaVersion": "1.0",
                            "isHidden": false,
                            "autoGenerated": false
                        },
                        "minHeight": 81
                    },
                    "style": "txtNew",
                    "connections": {
                        "type": "ConnectionList",
                        "items": [{"type": "WixCodeConnectionItem", "role": "text2"}],
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false}
                    },
                    "mobileStructure": {
                        "layout": {
                            "x": 10,
                            "y": 10,
                            "fixedPosition": false,
                            "width": 260,
                            "height": 10,
                            "scale": 0.7567567567567568,
                            "rotationInDegrees": 0
                        }, "metaData": {"originalCompId": "comp-je2ytfbd", "author": "duplicate"}
                    },
                    "activeModes": {}
                },
                {
                    "layout": {
                        "x": 350,
                        "y": 213,
                        "fixedPosition": false,
                        "width": 243,
                        "height": 76,
                        "scale": 1,
                        "rotationInDegrees": 0
                    },
                    "componentType": "wysiwyg.viewer.components.SiteButton",
                    "type": "Component",
                    "skin": "wysiwyg.viewer.skins.button.BasicButton",
                    "data": {
                        "type": "LinkableButton",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "label": "Be in Touch",
                        "link": null
                    },
                    "props": {
                        "type": "ButtonProperties",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "align": "center",
                        "margin": 0
                    },
                    "mobileHints": {
                        "type": "MobileHints",
                        "hidden": true,
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false}
                    },
                    "style": {
                        "type": "TopLevelStyle",
                        "styleType": "custom",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "style": {
                            "groups": {},
                            "properties": {
                                "alpha-bg": "1",
                                "alpha-bgh": "1",
                                "alpha-brd": "1",
                                "alpha-brdh": "1",
                                "bg": "#566FB8",
                                "bgh": "#3E569E",
                                "boxShadowToggleOn-shd": "true",
                                "brd": "#2B689C",
                                "brdh": "#536EB7",
                                "brw": "0px",
                                "fnt": "normal normal normal 14px/1.4em clarendon-w01-medium-692107",
                                "rd": "20px",
                                "shd": "0.00px 3.00px 0px 0px rgba(86,111,184,0.6)",
                                "txt": "#FFFFFF",
                                "txth": "#FFFFFF"
                            },
                            "propertiesSource": {
                                "alpha-bg": "value",
                                "alpha-bgh": "value",
                                "alpha-brd": "value",
                                "alpha-brdh": "value",
                                "bg": "value",
                                "bgh": "value",
                                "boxShadowToggleOn-shd": "value",
                                "brd": "value",
                                "brdh": "value",
                                "brw": "value",
                                "fnt": "value",
                                "rd": "value",
                                "shd": "value",
                                "txt": "value",
                                "txth": "value"
                            }
                        },
                        "componentClassName": "wysiwyg.viewer.components.SiteButton",
                        "pageId": "",
                        "compId": "",
                        "skin": "wysiwyg.viewer.skins.button.BasicButton"
                    },
                    "connections": {
                        "type": "ConnectionList",
                        "items": [{
                            "type": "WixCodeConnectionItem", "role": "button2"
                        }, {
                            "controllerId": "dataItem-je2v4rm4",
                            "isPrimary": true,
                            "role": "ButtonA",
                            "type": "ConnectionItem"
                        }],
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false}
                    },
                    "activeModes": {}
                }
            ],
            "data": {
                "type": "BoxSlideShowSlide",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "title": "Slide  1"
            },
            "style": {
                "type": "TopLevelStyle",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "groups": {},
                    "properties": {
                        "alpha-brd": "1",
                        "bg": "#001F2C",
                        "brd": "color_11",
                        "brw": "0",
                        "rd": "0px"
                    },
                    "propertiesSource": {
                        "bg": "value"
                    }
                },
                "componentClassName": "wysiwyg.viewer.components.BoxSlideShowSlide",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin"
            },
            "design": {
                "type": "MediaContainerDesignData",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "background": {
                    "type": "BackgroundMedia",
                    "metaData": {
                        "isPreset": false,
                        "schemaVersion": "1.0",
                        "isHidden": false
                    },
                    "color": "#ffffff",
                    "colorOpacity": 1,
                    "alignType": "center",
                    "fittingType": "fill",
                    "scrollType": "none",
                    "colorOverlay": "",
                    "colorOverlayOpacity": 0
                }
            }
        },
        {
            "type": "Container",
            "skin": "wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin",
            "layout": {
                "width": 980,
                "height": 440,
                "x": 0,
                "y": 0,
                "scale": 1,
                "rotationInDegrees": 0,
                "anchors": [
                    {
                        "distance": 0,
                        "originalValue": 440,
                        "type": "BOTTOM_PARENT",
                        "locked": true,
                        "targetComponent": "comp-im0kb76b"
                    },
                    {
                        "distance": 0,
                        "originalValue": 0,
                        "type": "TOP_TOP",
                        "locked": true,
                        "targetComponent": "comp-im0kb76v"
                    }
                ],
                "fixedPosition": false
            },
            "componentType": "wysiwyg.viewer.components.BoxSlideShowSlide",
            "components": [
                {
                    "layout": {
                        "x": 335,
                        "y": 79,
                        "fixedPosition": false,
                        "width": 310,
                        "height": 130,
                        "scale": 1,
                        "rotationInDegrees": 0
                    },
                    "componentType": "wysiwyg.viewer.components.WRichText",
                    "type": "Component",
                    "skin": "wysiwyg.viewer.skins.WRichTextNewSkin",
                    "data": {
                        "type": "StyledText",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "text": "<h3 class=\"font_3\">This is B</h3>\n\n<h3 class=\"font_3\"><span class=\"wixGuard\">​</span></h3>",
                        "stylesMapId": "CK_EDITOR_PARAGRAPH_STYLES",
                        "linkList": []
                    },
                    "props": {
                        "type": "WRichTextProperties",
                        "packed": true,
                        "brightness": 1,
                        "metaData": {
                            "isPreset": false,
                            "schemaVersion": "1.0",
                            "isHidden": false,
                            "autoGenerated": false
                        }
                    },
                    "style": "txtNew",
                    "connections": {
                        "type": "ConnectionList",
                        "items": [{"type": "WixCodeConnectionItem", "role": "text1"}],
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false}
                    },
                    "mobileStructure": {
                        "layout": {
                            "x": 10,
                            "y": 10,
                            "fixedPosition": false,
                            "width": 260,
                            "height": 10,
                            "scale": 0.7567567567567568,
                            "rotationInDegrees": 0
                        }, "metaData": {"originalCompId": "comp-je2yt6ge", "author": "duplicate"}
                    },
                    "activeModes": {}
                },
                {
                    "layout": {
                        "x": 329,
                        "y": 233,
                        "fixedPosition": false,
                        "width": 270,
                        "height": 72,
                        "scale": 1,
                        "rotationInDegrees": 0
                    },
                    "componentType": "wysiwyg.viewer.components.SiteButton",
                    "type": "Component",
                    "skin": "wysiwyg.viewer.skins.button.BasicButton",
                    "data": {
                        "type": "LinkableButton",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "label": "View More",
                        "link": null
                    },
                    "props": {
                        "type": "ButtonProperties",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "align": "center",
                        "margin": 0
                    },
                    "style": {
                        "type": "TopLevelStyle",
                        "styleType": "custom",
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false},
                        "style": {
                            "groups": {},
                            "properties": {
                                "alpha-bg": "1",
                                "alpha-bgh": "1",
                                "alpha-brd": "1",
                                "alpha-brdh": "0",
                                "alpha-txt": "1",
                                "alpha-txth": "1",
                                "bg": "#FDF733",
                                "bgh": "#000000",
                                "boxShadowToggleOn-shd": "false",
                                "brd": "#FDF733",
                                "brdh": "#FFFFFF",
                                "brw": "0",
                                "fnt": "normal normal 700 15px/1.4em raleway",
                                "rd": "0px",
                                "shd": "0px 1px 4px 0px rgba(0,0,0,0.6)",
                                "txt": "#000000",
                                "txth": "#FDF733"
                            },
                            "propertiesSource": {
                                "alpha-brdh": "value",
                                "bg": "value",
                                "bgh": "value",
                                "brd": "value",
                                "brdh": "value",
                                "brw": "value",
                                "fnt": "value",
                                "rd": "value",
                                "shd": "value",
                                "txt": "value",
                                "txth": "value"
                            }
                        },
                        "componentClassName": "wysiwyg.viewer.components.SiteButton",
                        "pageId": "",
                        "compId": "",
                        "skin": "wysiwyg.viewer.skins.button.BasicButton"
                    },
                    "connections": {
                        "type": "ConnectionList",
                        "items": [{"type": "WixCodeConnectionItem", "role": "button1"}, {
                            "controllerId": "dataItem-je2v4rm4",
                            "isPrimary": true,
                            "role": "ButtonB",
                            "type": "ConnectionItem"
                        }],
                        "metaData": {"isPreset": false, "schemaVersion": "1.0", "isHidden": false}
                    },
                    "mobileStructure": {
                        "layout": {
                            "x": 10,
                            "y": 40,
                            "fixedPosition": false,
                            "width": 160,
                            "height": 42,
                            "scale": 1,
                            "rotationInDegrees": 0
                        }, "metaData": {"originalCompId": "comp-je2yt20d", "author": "duplicate"}
                    },
                    "activeModes": {}
                }
            ],
            "data": {
                "type": "BoxSlideShowSlide",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "title": "Slide  2"
            },
            "style": {
                "type": "TopLevelStyle",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "style": {
                    "groups": {},
                    "properties": {
                        "alpha-brd": "1",
                        "bg": "#001F2C",
                        "brd": "color_11",
                        "brw": "0",
                        "rd": "0px"
                    },
                    "propertiesSource": {
                        "bg": "value"
                    }
                },
                "componentClassName": "wysiwyg.viewer.components.BoxSlideShowSlide",
                "pageId": "",
                "compId": "",
                "styleType": "custom",
                "skin": "wysiwyg.common.components.boxSlideShowSlide.viewer.skins.boxSlideShowSlideSkin"
            },
            "design": {
                "type": "MediaContainerDesignData",
                "metaData": {
                    "isPreset": false,
                    "schemaVersion": "1.0",
                    "isHidden": false
                },
                "background": {
                    "type": "BackgroundMedia",
                    "metaData": {
                        "isPreset": false,
                        "schemaVersion": "1.0",
                        "isHidden": false
                    },
                    "color": "#ffffff",
                    "colorOpacity": 1,
                    "alignType": "center",
                    "fittingType": "fill",
                    "scrollType": "none",
                    "colorOverlay": "",
                    "colorOverlayOpacity": 0
                }
            }
        }
    ],
    "props": {
        "type": "BoxSlideShowProperties",
        "metaData": {
            "schemaVersion": "1.0"
        },
        "transition": "SlideHorizontal",
        "autoPlayInterval": 0,
        "autoPlay": false,
        "transDuration": 0,
        "pauseAutoPlayOnMouseOver": true,
        "direction": "RTL",
        "shouldHideOverflowContent": true,
        "flexibleBoxHeight": false,
        "showNavigationButton": false,
        "showNavigationDots": false,
    }
};

module.exports = function () {
    let app;

    async function editorReady(_editorSDK, _appDefinitionId, options) {
        console.log(_editorSDK);
        const pageRef = await _editorSDK.pages.getCurrent();
        app = new App(_editorSDK, _appDefinitionId, pageRef);
        if (options.firstInstall) {
            await app.install();
        }
        // const container = await app.addAndConnect(BOX_SLIDE_SHOW, pageRef, 'mainContainer');
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
                controller1: {
                    default: {
                        visibility: 'DEV',
                        connections: {
                            "mainContainer": {
                                gfpp: {
                                    mainActions: [{
                                        id: 'SETTINGS', label: 'A/B Settings'
                                    }, {
                                        id: 'SETTINGS',
                                        label: 'A/B Settings'
                                    }],
                                    enabledActions: {
                                        settings: "hide",
                                        design: "hide",
                                        crop: "hide",
                                        filters: "hide",
                                        animation: "hide",
                                        link: "hide",
                                        stretch: "hide",
                                        layout: "hide",
                                        upgrade: "hide",
                                        connect: "hide",
                                        pinMode: "hide",
                                        hide: "hide",
                                    }
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
                "controllerSettingsButtonClicked": this.onControllerSettingsButtonClicked,
                "componentGfppClicked": this.componentGfppClicked

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

        async add(params) {
            return this.editorSDK.components.add('token', params);
        }

        async addConnectedComponent(componentType, role, data = {}) {
            const compRef = await this.addComponent(componentType, data);
            const controllerRef = await this.getController();
            await this.connect(controllerRef, compRef, role);
            return compRef;
        }

        async addAndConnect(componentDefinition, container, role) {
            const compRef = await this.add({componentDefinition, pageRef: container});
            const controllerRef = await this.getController();
            await this.connect(controllerRef, compRef, role);
            return compRef;
        }

        async install() {
            await this.addController();
            const container = await app.addAndConnect(BOX_SLIDE_SHOW, this.pageRef, 'mainContainer');
        }

        async addController() {
            return this.editorSDK.components.add('token', {
                componentDefinition: {
                    componentType: 'platform.components.AppController',
                    data: {
                        applicationId: this.appDefinitionId,
                        controllerType: 'controller1',
                        name: 'controller1'
                    }
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
            // await this.removeAllConnectedComponents();
            // await this.removeController();
            // await this.removeTPAWidget();
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
                width: "20%",
                height: "70%",
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

        async componentGfppClicked({componentRef}) {
            this.editorSDK.editor.openModalPanel(null, {
                title: "MY MODAL",
                componentRef,
                initialData: {a: 1},
                width: "20%",
                height: "70%",
                url: "modal.html"
            })
        }

    }

    return {
        editorReady,
        onEvent,
        getAppManifest
    }
}();


