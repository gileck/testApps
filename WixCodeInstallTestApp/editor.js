module.exports = {
    editorReady: function (editorSDK) {
        const WIX_CODE_APP_DEF_ID = '675bbcef-18d8-41f5-800e-131ec9e08762'
        console.log("Before Installing WixCode...");
        editorSDK.document.application.install('token', {appDefinitionId: WIX_CODE_APP_DEF_ID})
            .then(() => console.log("WIXCODE INSTALLED"))
            .catch(e => console.log("ERROR: ", e));
    },
    onEvent: () => {},
    getAppManifest: () => {}
};

//App ID: 1539e3a4-6b37-4e5c-7c5d-5ec1254513aa

