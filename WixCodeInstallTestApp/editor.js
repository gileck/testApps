module.exports = {
    editorReady: function (editorSDK) {
        const WIX_CODE_APP_DEF_ID = '675bbcef-18d8-41f5-800e-131ec9e08762'
        editorSDK.document.application.install(WIX_CODE_APP_DEF_ID);
    },
    onEvent: () => {},
    getAppManifest: () => {}
};