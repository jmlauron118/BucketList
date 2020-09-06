const Observable = require("tns-core-modules/data/observable").Observable;
const StoredProcedure = require("~/core/storedprocedure");
const General = require("~/module/general");

function AddIconViewModel() {
    const viewModel = new Observable();

    viewModel.AddIcon = (param) => {
        StoredProcedure.execute("iconModel/addIcon.sql", param)
            .then((res) => {
                General.ShowMessage("Icon has successfully added!", "success");
                viewModel.GetTotalIcon();
            })
            .catch((err) => {
                General.ShowMessage("Add icon error: " + err, "error");
            });
    };

    viewModel.GetTotalIcon = () => {
        StoredProcedure.getData("iconModel/getTotalIcon.sql")
            .then((res) => {
                viewModel.set("IconTotal", res);
            })
            .catch((err) => {
                General.ShowMessage( "Get total icon error: " + err, "error");
                viewModel.set("IconTotal", 0);
            });
    };

    return viewModel;
}

module.exports = AddIconViewModel;
