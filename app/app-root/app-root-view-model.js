const ObservableModule = require("tns-core-modules/data/observable").Observable;
const SelectedPageService = require("../shared/selected-page-service");

function AppRootViewModel() {
    const viewModel = new ObservableModule();

    SelectedPageService.getInstance().selectedPage$
    .subscribe((selectedPage) => { viewModel.selectedPage = selectedPage; });

    return viewModel;
}

module.exports = AppRootViewModel;
