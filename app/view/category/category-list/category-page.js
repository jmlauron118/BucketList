const app = require("tns-core-modules/application");
const CategoryViewModel = require("./category-view-model");
const RandColor = require("~/module/general");

exports.onNavigatingTo = (args) => {
    const page = args.object;
    page.bindingContext = new CategoryViewModel();

    page.bindingContext.GetCategoryList(args);
}

exports.onDrawerButtonTap = (args) => {
    const sideDrawer = app.getRootView();
    sideDrawer.showDrawer();
}

exports.test = (args) =>{
    
    console.log(`Loaded! Color: ${RandColor.GetRandomColor()}`);
};
