
const app = require("tns-core-modules/application");
const IconViewModel = require("./icon-view-model");
const FrameModule = require("tns-core-modules/ui/frame").Frame;

exports.onNavigatingTo = (args) => {
    const page = args.object;

    page.bindingContext = new IconViewModel();
    page.bindingContext.GetIconList(page);
}

exports.onDrawerButtonTap = (args) => {
    const sideDrawer = app.getRootView();
    
    sideDrawer.showDrawer();
}

exports.onTapAddIcon = (args)=>{
    FrameModule.topmost().navigate({
        moduleName: "view/settings/icon/add-icon/add-icon-page",
        transition: {
            name: "fade"
        }
    });
};
