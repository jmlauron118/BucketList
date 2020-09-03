const Observable = require("tns-core-modules/data/observable").Observable;
const ObservableArray = require("tns-core-modules/data/observable-array").ObservableArray;
const SelectedPageService = require("~/shared/selected-page-service");

function CategoryViewModel() {
    SelectedPageService.getInstance().updateSelectedPage("Category");

    const viewModel = new Observable();

    viewModel.categoryData = new ObservableArray();

    viewModel.GetCategoryList = ((args) => {
        viewModel.categoryData.length = 0;

        viewModel.categoryData.push([{
            CategoryName: "Gadget"
        },
        {
            CategoryName: "Work"
        }
        ]);
    });

    return viewModel;
}

module.exports = CategoryViewModel;
