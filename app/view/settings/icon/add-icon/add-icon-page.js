const app = require("tns-core-modules/application");
const General = require("~/module/general");
const AddIconViewModel = require("./add-icon-view-model");

exports.onLoaded = (args) => {
    const page = args.object;

    page.bindingContext = new AddIconViewModel();
    page.bindingContext.GetTotalIcon();
};

exports.onDrawerButtonTap = (args) => {
    const sideDrawer = app.getRootView();

    sideDrawer.showDrawer();
};

exports.onTapAddButton = (args) => {
    var page = args.object.page;
    var code = page.getViewById("txtCode");

    if (code.text != "") {
        page.bindingContext.AddIcon(code.text.toLowerCase());
        code.text = "";
    } else {
        General.ShowMessage("Please enter icon code!", "warning");
    }
};
