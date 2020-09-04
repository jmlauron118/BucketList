const application = require("tns-core-modules/application");
const FrameModule = require("tns-core-modules/ui/frame").Frame;
const AppRootViewModel = require("./app-root-view-model");
const Animation = require("tns-core-modules/ui/animation");
const { loadAppCss } = require("tns-core-modules/application");
var isShown = false;

exports.onLoaded = (args) => {
    const drawerComponent = args.object;

    drawerComponent.bindingContext = new AppRootViewModel();

    !isShown ? drawerComponent.bindingContext.set("settingsArrow", String.fromCharCode(0xf0da)) : drawerComponent.bindingContext.set("settingsArrow", String.fromCharCode(0xf0d7));
}

exports.onNavigationItemTap = (args) => {
    const component = args.object;
    const componentRoute = component.route;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;

    bindingContext.set("selectedPage", componentTitle);

    FrameModule.topmost().navigate({
        moduleName: componentRoute,
        transition: {
            name: "fade"
        }
    });

    const drawerComponent = application.getRootView();
    drawerComponent.closeDrawer();
}

exports.onTapSettings = (args) => {
    const component = args.object;
    const componentTitle = component.title;
    const bindingContext = component.bindingContext;

    bindingContext.set("selectedPage", componentTitle);
    var stack = component.parent;
    var subBtn = [];

    for (let i = 1; i < stack.getChildrenCount(); i++) {
        subBtn.push(stack.getChildAt(i));
    }

    this.AnimateSubMenu(bindingContext, subBtn);
};

exports.AnimateSubMenu = (bindingContext, subBtn) => {
    try {
        let animations = [];
        let laps = 0;
        let yAxis = 0;

        if (isShown) {
            yAxis = 0;
            for (let i = 0; i < subBtn.length; i++) {
                animations[i] = {
                    target: subBtn[i],
                    opacity: 0,
                    duration: 400 + laps,
                    delay: 0
                }

                laps = 120;
            }

            isShown = false;
            bindingContext.set("settingsArrow", String.fromCharCode(0xf0da));

            var anim = new Animation.Animation(animations);

            anim.play().then(function () {
                isShown = false;
            }).catch(function (err) {
                console.log("Animation Error: " + err);
            });
        }
        else {
            yAxis = 0;
            for (let i = 0; i < subBtn.length; i++) {
                animations[i] = {
                    target: subBtn[i],
                    opacity: 1,
                    duration: 400 + laps,
                    delay: 0
                }

                laps = 120;
            }

            isShown = true;
            bindingContext.set("settingsArrow", String.fromCharCode(0xf0d7));

            var anim = new Animation.Animation(animations);

            anim.play().then(function () {
                isShown = true;
            }).catch(function (err) {
                console.log("Animation Error: " + err);
            });
        }
    }
    catch (err) {
        console.log(`Sub Button Animation Error: ${err}`);
    }
}
