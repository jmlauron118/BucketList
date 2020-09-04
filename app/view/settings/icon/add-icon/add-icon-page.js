const app = require("tns-core-modules/application");
const FrameModule = require("tns-core-modules/ui/frame").Frame;

exports.onDrawerButtonTap = (args) => {
    const sideDrawer = app.getRootView();
    
    sideDrawer.showDrawer();
}