const ObservableModule = require("tns-core-modules/data/observable").Observable;
const StoredProcedure = require("~/core/storedprocedure");
const SelectedPageService = require("~/shared/selected-page-service");
const StackLayout = require("tns-core-modules/ui/layouts").StackLayout;
const Label = require("tns-core-modules/ui/label").Label;
const { SideDrawerLocation } = require("nativescript-ui-sidedrawer");

function IconViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Icon");

    const viewModel = new ObservableModule();

    viewModel.GetIconList = (page) => {
        try {
            StoredProcedure.getData("iconModel/getIconList.sql")
                .then((response) => {
                    var wrapLayout = page.getViewById("wrapLayout");

                    if (response.length > 0) {
                        viewModel.PopulateIcon(response, wrapLayout);
                    } else {
                        viewModel.NoData(wrapLayout);
                    }
                })
                .catch((err) => {
                    console.log(`GetIconList Error: ${err}`);
                });
        } catch (err) {
            console.log(`GetIconList Error: ${err}`);
        }
    };

    viewModel.NoData = (wrapLayout) => {
        var sl = new StackLayout();
        var labelIcon = new Label();
        var labelText = new Label();

        sl.className = "empty-data";
        sl.orientation = "vertical";
        sl.verticalAlignment = "middle";

        labelIcon.className = "empty-data-label-icon fa";
        labelIcon.text = String.fromCharCode(0xf00d);
        labelText.className = "empty-data-label-text";
        labelText.text = "No Icon(s) found!";

        wrapLayout.addChild(sl);
        sl.addChild(labelIcon);
        sl.addChild(labelText);
    };

    viewModel.PopulateIcon = (response, wrapLayout) => {
        wrapLayout.removeChildren();

        for (let i = 0; i < response.length; i++) {
            var stackLayout = new StackLayout();
            var label = new Label();

            stackLayout.class = "icon-box";
            stackLayout.orientation = "vertical";
            stackLayout.verticalAlignment = "center";

            label.class = "icon-label fas";
            label.id = response[i][0];
            label.text = String.fromCharCode("0x" + response[i][1]);

            stackLayout.addChild(label);
            wrapLayout.addChild(stackLayout);
        }
    };

    return viewModel;
}

module.exports = IconViewModel;
