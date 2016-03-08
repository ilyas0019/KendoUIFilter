app.controller("customerController", ["$scope", "customerService", function ($scope, customerService) {
    $scope.status;
    $scope.currentGrid;
    $scope.customers =
         [{ "ID": 1, "FirstName": "Filiberto", "LastName": "Medina", "Address": "ABC", "City": "XX", "State": "SS", "Country": "Mexico" },
            { "ID": 2, "FirstName": "John", "LastName": "Krupa", "Address": "XYZ", "City": "Chicago", "State": "NY", "Country": "USA" },
        { "ID": 3, "FirstName": "Sanjay", "LastName": "Sharma", "Address": "ABC", "City": "Delhi", "State": "Delhi", "Country": "India" },
    { "ID": 4, "FirstName": "Debbi", "LastName": "Robbison", "Address": "110, Northern Road", "City": "Irvine", "State": "CA", "Country": "USA" },
    { "ID": 5, "FirstName": "Kumar", "LastName": "Vasan", "Address": "XYZ", "City": "Colombo", "State": "Colombo", "Country": "Srilanka" },
     { "ID": 3, "FirstName": "Sanjay", "LastName": "Sharma", "Address": "ABC", "City": "Delhi", "State": "Delhi", "Country": "India" },
    { "ID": 4, "FirstName": "Debbi", "LastName": "Robbison", "Address": "110, Northern Road", "City": "Irvine", "State": "CA", "Country": "USA" },
    { "ID": 5, "FirstName": "Kumar", "LastName": "Vasan", "Address": "XYZ", "City": "Colombo", "State": "Colombo", "Country": "Srilanka" },
     { "ID": 3, "FirstName": "Sanjay", "LastName": "Sharma", "Address": "ABC", "City": "Delhi", "State": "Delhi", "Country": "India" },
    { "ID": 4, "FirstName": "Debbi", "LastName": "Robbison", "Address": "110, Northern Road", "City": "Irvine", "State": "CA", "Country": "USA" },
    { "ID": 5, "FirstName": "Kumar", "LastName": "Vasan", "Address": "XYZ", "City": "Colombo", "State": "Colombo", "Country": "Srilanka" }

         ]


    $scope.getCustomers = function () {
        var promise = customerService.getCustomers();
        promise.success(function (data, status, header, config) { $scope.customers = data; });
        promise.error(function (data, status, header, config) { $scope.status = status; });
        return promise;
    }

    $scope.bindGridTemplate = function () {

        $("#" + $scope.currentGrid).kendoGrid({
            columns: [{ field: "ID", title: "Id", filterable: false },
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

            filterMenuInit: bindFilter,
            pageable: {
                refresh: true,
                pageSizes: 2,
                buttonCount: 2


            }
        });
    }


    $scope.bindGrid = function (e) {
        $scope.currentGrid = "grid";
        // $scope.getCustomers().then(function () { $scope.bindGridTemplate(); });
        $scope.bindGridTemplate();
    }
    var bindFilter = function (e) {
        var helpTextElement = e.container.children(":first").children(":first");
        var checkboxesDataSource = new kendo.data.DataSource({
            data: getUniqueRecords($scope.customers, e.field)
        });

        var listView = $("<ul id='column_" + e.field + "' class='k-reset k-multicheck-wrap'></ul>").insertBefore(helpTextElement).kendoListView({
            dataSource: checkboxesDataSource,
            template: "<li class=\"k-item\"><label class=\"k-label\"><input type='checkbox'   value='#:" + e.field + "#'/>#:" + e.field + "#</li>",
            dataBound: function (evt) {
                filterSelectAll(e);
            }
        });

        //e.container.find("[type='submit']").click(function () {
        //    var chk = e.container.children(":first").find(":checkbox:not(:first)");
        //    var checked = $(chk).filter(":checkbox:checked");

        //    applyFilter(field, checked);


        //})
    }

    function getUniqueRecords(data, field) {
        var map = {};
        var result = [];
        var item;
        for (var i = 0; i < data.length; i++) {
            item = data[i];
            if (!map[item[field]]) {
                result.push(item);
                map[item[field]] = true;
            }
        }
        return result;
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



    $(document).ready(function () {
        $scope.bindGrid();
    });



}])