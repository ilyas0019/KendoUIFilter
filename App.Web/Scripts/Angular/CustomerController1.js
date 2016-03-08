app.controller("customerController1", ["$scope", "customerService", function ($scope, customerService) {
    $scope.status;
    $scope.customers = [];
    $scope.currentGrid;
    $scope.customerSource;



    $scope.getCustomers = function () {
        var promise = customerService.getCustomers();
        promise.success(function (data, status, header, config) { $scope.customers = data; });
        promise.error(function (data, status, header, config) { $scope.status = status; });
        return promise;
    }

    $scope.bindGridTemplate = function () {

        $("#" + $scope.currentGrid).kendoGrid({
            columns: [{ field: "ID", title: "Id" },
                     {
                         field: "FirstName", title: "First Name",
                     },
                      { field: "LastName", title: "Last Name" },
                     {
                         field: "Address", title: "Address"

                     },
                      { field: "City", title: "City" },
                     { field: "State", title: "State" },
                     { field: "Country", title: "Country" },
            ],
            scrollable: true,
            sortable: true,
            filterable: true,

            dataSource: {
                data: $scope.customers
            },

            filterMenuInit: function (e) { e.container.data("kendoPopup").bind("open", function () { bindFilter(e) }) },
            pageable: {
                refresh: true,
                pageSizes: 2,
                buttonCount: 2


            }
        });
    }




    $scope.bindGrid = function (e) {
        $scope.currentGrid = "grid";
        $scope.getCustomers().then(function () { $scope.bindGridTemplate(); $scope.customerSource = $scope.customers; });
    }
    var bindFilter = function (e) {
        var gridData = $("#" + $scope.currentGrid).data("kendoGrid");
        var currentViewLength = gridData.dataSource.view().length;

        $scope.customerSource = gridData.dataSource.view();
        $("#column_" + e.field).remove();
        var helpTextElement = e.container.children(":first").children(":first");
        var listView = $("<ul id='column_" + e.field + "' class='k-reset k-multicheck-wrap'></ul>").insertBefore(helpTextElement).kendoListView({
            dataSource: $scope.customerSource,
            template: "<li class=\"k-item\"><label class=\"k-label\"><input type='checkbox'   value='#:" + e.field + "#'/>#:" + e.field + "#</li>",
            dataBound: function (evt) {
                filterSelectAll(e);
            }
        });

    }
    var checkGridCurrentView = function (obj) {
        $(".k-grid-filter,.k-header").click(function (e) {

            rebindGridFilter(obj);

        });
    }
    var rebindGridFilter = function (e) {
        alert(e.field);
        var gridData = $("#" + $scope.currentGrid).data("kendoGrid");
        var currentViewLength = gridData.dataSource.view().length;
        if (currentViewLength != $scope.customerSource.length) {
            $scope.customerSource = gridData.dataSource.view();
            $("#column_" + e.field).remove();
            var helpTextElement = e.container.children(":first").children(":first");
            var listView = $("<ul id='column_" + e.field + "' class='k-reset k-multicheck-wrap'></ul>").insertBefore(helpTextElement).kendoListView({
                dataSource: $scope.customerSource,
                template: "<li class=\"k-item\"><label class=\"k-label\"><input type='checkbox'   value='#:" + e.field + "#'/>#:" + e.field + "#</li>",
                dataBound: function (evt) { filterSelectAll(e); }

            });
        }
    }

    var filterSelectAll = function (e) {
        var view = $("#column_" + e.field);
        $(view).children("li:eq(0)").before('<li class="k-item"><label class="k-label"><input type="checkbox" class="k-check-all"   value="Select All">Select All</label></li> ');
        $(view).children("li:eq(0)").find("input:checkbox").click(function () { checkAll(this, e.field); });
        $(view).children("li:not(:eq(0))").find("input:checkbox").click(function () { handleCheckboxes(this, e.field); });

    }
    var checkAll = function (obj, field) {

        var isChecked = $(obj).is(":checked");
        var chk = $(obj).parents("ul").find(":checkbox:not(:first)");
        $(chk).prop("checked", isChecked);
        var checked = $(chk).filter(":checkbox:checked");
        applyFilter(field, checked);
    }

    var handleCheckboxes = function (obj, field) {

        var chk = $(obj).parents("ul").find(":checkbox:not(:first)");
        var checked = $(chk).filter(":checkbox:checked");
        if (checked.length == chk.length) {
            $(obj).parents("ul").find(".k-check-all").prop("checked", true);
        }
        else
            $(obj).parents("ul").find(".k-check-all").prop("checked", false);

        applyFilter(field, checked);
    }


    var applyFilter = function (filterField, chkArray) {
        var gridData = $("#" + $scope.currentGrid).data("kendoGrid");
        gridData.dataSource.filter([]);
        $scope.dataSource = gridData.dataSource;
        var currFilterObj = gridData.dataSource.filter();

        var currentFilters = currFilterObj ? currFilterObj.filters : [];
        var item;
        var fieldFilters = $.map(chkArray, function (input) {

            item = { field: filterField, operator: "eq", value: input.value };
            currentFilters.push(item);

        });

        gridData.dataSource.filter({
            logic: "or",
            filters: currentFilters
        });


    }
    //function applyFilter(filterField, filterValue) {

    //    // get the kendoGrid element.
    //    var gridData = $("#grid").data("kendoGrid");

    //    // get currently applied filters from the Grid.
    //    var currFilterObj = gridData.dataSource.filter();

    //    // get current set of filters, which is supposed to be array.
    //    // if the oject we obtained above is null/undefined, set this to an empty array
    //    var currentFilters = currFilterObj ? currFilterObj.filters : [];

    //    // iterate over current filters array. if a filter for "filterField" is already
    //    // defined, remove it from the array
    //    //// once an entry is removed, we stop looking at the rest of the array.
    //    //if (currentFilters && currentFilters.length > 0) {
    //    //    for (var i = 0; i < currentFilters.length; i++) {
    //    //        if (currentFilters[i].field == filterField) {
    //    //            currentFilters.splice(i, 1);
    //    //            break;
    //    //        }
    //    //    }
    //    //}

    //    // if "filterValue" is "0", meaning "-- select --" option is selected, we don't 
    //    // do any further processing. That will be equivalent of removing the filter.
    //    // if a filterValue is selected, we add a new object to the currentFilters array.
    //    if (filterValue != "0") {
    //        currentFilters.push({
    //            field: filterField,
    //            operator: "eq",
    //            value: filterValue
    //        });
    //    }

    //    // finally, the currentFilters array is applied back to the Grid, using "and" logic.
    //    gridData.dataSource.filter({
    //        logic: "and",
    //        filters: currentFilters
    //    });

    //}





    $(document).ready(function () {
        $scope.bindGrid();
    });



}])