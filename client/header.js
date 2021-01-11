let head = '<div class="col-md-12" style="border-bottom: 2px solid black;padding: 20px;text-align: center;"><h2>Inventory Management System</h2></div>';
let menu = '<ul class="nav flex-column">' +
    '<li class="nav-item" style="border-bottom: 2px solid black;"><a class="nav-link active" href="index.html">Dashboard</a></li>' +
    '<li class="nav-item" style="border-bottom: 2px solid black;"><a class="nav-link" href="outwardRegister.html">Outward</a></li>' +
    '<li class="nav-item" style="border-bottom: 2px solid black;"><a class="nav-link" href="./inwardRegister.html">Inward</a></li>' +
    '<li class="nav-item" style="border-bottom: 2px solid black;"><a class="nav-link" href="./productMaster.html">Product Master</a></li>' +
    '</ul>';

let addProductModal = '<div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="productMasterModalLabel">Add New Product</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div> <div class="modal-body"> <div class="row" style="border-bottom: 1px solid black;padding: 3px;"> <div class="col-md-4"> Product Category </div> <div class="col-md-8"> <input autocomplete="off" list="productCategories" style="width: 100%;" name="productCategory" id="productCategory" class="productCategory"> <datalist id="productCategories" class="productCategories"> </datalist> </div> </div> <div class="row" style="border-bottom: 1px solid black;padding: 3px;"> <div class="col-md-4"> Sub Category </div> <div class="col-md-8"> <input autocomplete="off" list="subCategories" style="width: 100%;" name="subCategory" id="subCategory" class="subCategory"> <datalist id="subCategories" class="subCategories"> </datalist> </div> </div> <div class="row" style="border-bottom: 1px solid black;padding: 3px;"> <div class="col-md-4"> Company Name </div> <div class="col-md-8"> <input autocomplete="off" list="companyNames" style="width: 100%;" name="companyName" id="companyName"> <datalist id="companyNames"> </datalist> </div> </div> <div class="row" style="border-bottom: 1px solid black;padding: 3px;"> <div class="col-md-4"> Product Name </div> <div class="col-md-8"> <input autocomplete="off" list="productNames" style="width: 100%;" name="productName" id="productName"> <datalist id="productNames"> </datalist> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> <button id="addProduct" type="button" class="btn btn-primary">Save changes</button> </div> </div> </div>';
//==================================
//==Product modal javascript==>
//==================================
let companyList = [];
let productList;

function addNewProduct() {
    let companyName = $('#companyName').val()
    let productName = $('#productName').val()
    let productCategory = $('.productCategory').val()
    let productSubCategory = $('.subCategory').val()
    let newProduct = {
        companyName,
        productName,
        productCategory,
        productSubCategory
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/addProduct",
        data: JSON.stringify(newProduct),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $.get("http://localhost:3000/products", async function(data) {
                await populateProductTable(data);
            });
            $('#productMasterModal').modal('hide');
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function edit(id) {
    console.log(id);
    //ajax to edit
    $('#productMasterModal').modal('show');

}

function del(id) {
    console.log(id);
    let argu = {
        "_id": id
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/deleteProduct",
        data: JSON.stringify(argu),
        dataType: 'json',
        success: function(data) {
            $.get("http://localhost:3000/products", function(data) {
                populateProductTable(data);
            });
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function populateProductTable(data) {
    console.log("populating data table...");
    productList = data;
    var length = data.length;
    var table = $('#productRegister').DataTable();
    table.clear()
    for (var i = 0; i < length; i++) {
        $('#productRegister').dataTable().fnAddData([
            `<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='del("${data[i]._id}");'>delete</a>`,
            data[i].companyName,
            data[i].productName,
            data[i].productCategory,
            data[i].productSubCategory
        ]);
    }
}

function openProductMasterModal() {
    let productCategoryArray = [];
    let productCategoryUi = "";
    $('.productCategories').html("");
    productList.forEach(element => {
        productCategoryArray.push(element.productCategory)
    })
    productCategoryArray = _.uniqBy(productCategoryArray)
    productCategoryArray.forEach(element => {
        productCategoryUi += `<option>${element}</option>`;
    });
    $('.productCategories').append(productCategoryUi);
}

function onChangeProductCategory() {

    let filterData = {
        "productCategory": $(".productCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            let productSubCategoryArray = []
            let productSubCategoryUi = []
            $('.subCategories').empty();
            console.log(data);
            data.forEach(element => {
                productSubCategoryArray.push(element.productSubCategory)
            });
            productSubCategoryArray = _.uniqBy(productSubCategoryArray)
            productSubCategoryArray.forEach(element => {
                productSubCategoryUi += `<option>${element}</option>`;
            });
            $('.subCategories').append(productSubCategoryUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function onChangeSubCategory() {
    let filterData = {
        "productCategory": $(".productCategory").val(),
        "productSubCategory": $(".subCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            let companyNameArray = []
            let companyNameUi = []

            data.forEach(element => {
                companyNameArray.push(element.companyName)
            });
            companyNameArray = _.uniqBy(companyNameArray)
            companyNameArray.forEach(element => {
                companyNameUi += `<option>${element}</option>`;
            });
            $('#companyNames').append(companyNameUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
//==================================
//==Transaction modal javascript==>
//==================================
function addNewTransaction() {

    let transactionDate = $("#transactionDate").val();
    let transactionType = $("#transactionType").val();
    let product = $("#transactionProductId").val()
    let quantity = $("#transactionQuantity").val()
    let remark = $("#transactionRemark").val()
    let newTransaction = {
        transactionDate,
        transactionType,
        product,
        quantity,
        remark
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/addTransaction",
        data: JSON.stringify(newTransaction),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $.get("http://localhost:3000/products", async function(data) {
                await populateProductTable(data);
            });
            $('#transactionModal').modal('hide');
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
    console.log(newTransaction);
}


function openTransactionModal() {
    let productCategoryArray = [];
    let productCategoryUi = "";
    $('#transactionProductCategory').html("");
    productList.forEach(element => {
        productCategoryArray.push(element.productCategory)
    })
    productCategoryArray = _.uniqBy(productCategoryArray)
    productCategoryArray.forEach(element => {
        productCategoryUi += `<option>${element}</option>`;
    });
    $('#transactionProductCategories').append(productCategoryUi);
}

function onChangeProductCategoryTransaction() {

    let filterData = {
        "productCategory": $("#transactionProductCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            let productSubCategoryArray = []
            let productSubCategoryUi = []
            $('#transactionSubCategories').empty();
            data.forEach(element => {
                productSubCategoryArray.push(element.productSubCategory)
            });
            productSubCategoryArray = _.uniqBy(productSubCategoryArray)
            productSubCategoryArray.forEach(element => {
                productSubCategoryUi += `<option>${element}</option>`;
            });
            $('#transactionSubCategories').append(productSubCategoryUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function onChangeSubCategoryTransation() {

    let filterData = {
        "productCategory": $("#transactionProductCategory").val(),
        "productSubCategory": $("#transactionSubCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            let companyNameArray = []
            let companyNameUi = []

            data.forEach(element => {
                companyNameArray.push(element.companyName)
            });
            companyNameArray = _.uniqBy(companyNameArray)
            companyNameArray.forEach(element => {
                companyNameUi += `<option>${element}</option>`;
            });
            $('#transactionCompanyNames').append(companyNameUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function onChangeCompanyNameTransation() {
    let filterData = {
        "productCategory": $("#transactionProductCategory").val(),
        "productSubCategory": $("#transactionSubCategory").val(),
        "companyName": $("#transactionCompanyName").val()
    }
    console.log(filterData);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            let productNameArray = []
            let productNameUi = []

            data.forEach(element => {
                productNameArray.push(element.productName)
            });
            productNameArray = _.uniqBy(productNameArray)
            productNameArray.forEach(element => {
                productNameUi += `<option>${element}</option>`;
            });
            $('#transactionProductNames').append(productNameUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function onChangeProductNameTransation() {
    let filterData = {
        "productCategory": $("#transactionProductCategory").val(),
        "productSubCategory": $("#transactionSubCategory").val(),
        "companyName": $("#transactionCompanyName").val(),
        "productName": $("#transactionProductName").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: async function(data) {
            data.forEach(element => {
                $('#transactionProductId').val(element._id)
            });
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}

function populateTransactionTable(data) {
    console.log("populating Transactions data table...");
    //productList = data;
    var length = data.length;
    var table = $('#transctionSummery').DataTable();
    table.clear()
    data.forEach(element => {
        $('#transctionSummery').dataTable().fnAddData([
            //`<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='del("${data[i]._id}");'>delete</a>`,
            element.transactionDate,
            element.product,
            element.transactionType,
            element.quantity
        ]);
    });

}