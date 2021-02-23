//==================================
//==Ui Elements like modal and menu==>
//==================================
let sidebar = ' <div class="sidebar">' +
    '<a href="index.html">Home</a>' +
    '<a href="./register.html?type=Outward">Outward Register</a>' +
    '<a href="./register.html?type=Inward">Inward Register</a>' +
    '<a href="./productMaster.html">Product Master</a>' +
    '</div>'
let addProductModal = '<div class="modal-dialog">' +
    '<div class="modal-content"><form action = ""> ' +
    '<div class="modal-header">' +
    ' <h5 class="modal-title" id="productMasterModalLabel">Add New Product</h5>' +
    ' <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>' +
    '<div class="modal-body">' +
    '<div class="row" style="border-bottom: 1px solid black;padding: 3px;">' +
    '<div class="col-md-4"> Product Category </div>' +
    '<div class="col-md-8">' +
    '<input autocomplete="off" list="productCategories" style="width: 100%;" name="productCategory" id="productCategory" class="productCategory" required>' +
    '<datalist id="productCategories" class="productCategories"> </datalist>' +
    '</div> </div> <div class="row" style="border-bottom: 1px solid black;padding: 3px;">' +
    '<div class="col-md-4"> Sub Category </div>' +
    '<div class="col-md-8"> <input autocomplete="off" list="subCategories" style="width: 100%;" name="subCategory" id="subCategory" class="subCategory" required>' +
    '<datalist id="subCategories" class="subCategories"> </datalist>' +
    '</div> </div> <div class="row" style="border-bottom: 1px solid black;padding: 3px;">' +
    '<div class="col-md-4"> Product Discription </div>' +
    '<div class="col-md-8"> <input type="text" required autocomplete="off" list="productDiscriptions" style="width: 100%;" name="productDiscription" id="productDiscription"/>' +
    '<datalist id="productDiscriptions"> </datalist></div> </div> </div>' +
    '<div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
    '<button id="addProduct" type="button" class="btn btn-primary">Save changes</button> </div></form> </div> </div>';
let addTransactionModal = '<div class="modal-dialog modal-lg">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="transactionLabel">Transaction Entry</h5> <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> </div>' +
    '<div class="modal-body">' +
    '<div class="row">' +
    '<div class="col-md-6">' +
    '<div class="row">' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Product Category </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" list="transactionProductCategories" style="width: 100%;" name="transactionProductCategory" id="transactionProductCategory" class="productCategory"> <datalist id="transactionProductCategories" class="productCategory"> </datalist>                            </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Sub Category </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" list="transactionSubCategories" style="width: 100%;" name="transactionSubCategory" id="transactionSubCategory"> <datalist id="transactionSubCategories"> </datalist> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;">Product Discription </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" list="transactionProductDiscriptions" style="width: 100%;" name="transactionProductDiscription" id="transactionProductDiscription"> <datalist id="transactionProductDiscriptions"> </datalist> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Company Name </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" list="transactionCompanyNames" style="width: 100%;" name="transationCompanyName" id="transactionCompanyName"> <datalist id="transactionCompanyNames"> </datalist> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Available Stock </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" style="width: 100%;" disabled name="availableStock" id="availableStock"></div>' +
    '</div>' +
    '</div>' +
    '<div class="col-md-6">' +
    '<div class="row">' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Product Id </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input autocomplete="off" style="width: 100%;" name="productId" id="transactionProductId"> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Date </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input type="date" autocomplete="off" style="width: 100%;" name="transactionDate" id="transactionDate"> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Transaction Type </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;padding: 2px;"> <select name="transactionType" id="transactionType" style="width: 100%;"> <option value="Inward">Inward</option> <option value="Outward">Outward</option> </select> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Quantity </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <input type="number" autocomplete="off" name="transactionQuantity" id="transactionQuantity"> </div>' +
    '<div class="col-md-4" style="border-bottom: 1px solid black;"> Remark </div>' +
    '<div class="col-md-8" style="border-bottom: 1px solid black;"> <textarea rows="2" name="transactionRemark" id="transactionRemark"> </textarea> </div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> <button id="addTransaction" type="button" class="btn btn-primary">Add Transaction</button> </div>' +
    '</div>' +
    '</div>';
//==================================
//==Ui Elements like modal and menu==>
//==================================

let companyList = [];
let productList;
$.get("http://localhost:3000/products", async function(data) {
    productList = await data
});


function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
//==================================
//==Product modal javascript==>
//==================================
function addNewProduct() {

    // let companyName = $('#companyName').val()
    let productCategory = $('.productCategory').val()
    let productSubCategory = $('.subCategory').val()
    let productDiscription = $('#productDiscription').val()
    if (!productDiscription || !productSubCategory || !productCategory) {
        alert("Input Required");
        return false;
    }
    let newProduct = {
        productCategory,
        productDiscription,
        productSubCategory
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/addProduct",
        data: JSON.stringify(newProduct),
        dataType: 'json',
        success: async function(data) {
            $('#productMasterModal').modal('hide');
            location.reload();
        },
        error: function(e) {
            alert(`Error : ${e.responseText}`)
            console.log("ERROR: ", e);
        }
    });
}

function edit(id) {
    console.log(id);
    //ajax to edit
    $('#productMasterModal').modal('show');

}

function deleteProduct(id) {
    let argu = {
        "_id": id
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/deleteProduct",
        data: JSON.stringify(argu),
        dataType: 'json',
        success: async function(data) {
            await loadTables()
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
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
            let productDiscriptionArray = []
            let productDiscriptionUi = []

            data.forEach(element => {
                productDiscriptionArray.push(element.productDiscription)
            });
            productDiscriptionArray = _.uniqBy(productDiscriptionArray)
            productDiscriptionArray.forEach(element => {
                productDiscriptionUi += `<option>${element}</option>`;
            });
            $('#productDiscriptions').append(productDiscriptionUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}
//==================================
//==Product modal javascript==>
//==================================

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
        success: async function(data) {
            $('#transactionModal').modal('hide');
            location.reload();
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });

}


async function openTransactionModal() {
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
    console.log(filterData);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            let productDiscriptionArray = []
            let productDiscriptionUi = []

            data.forEach(element => {
                productDiscriptionArray.push(element.productDiscription)
            });
            productDiscriptionArray = _.uniqBy(productDiscriptionArray)
            productDiscriptionArray.forEach(element => {
                productDiscriptionUi += `<option>${element}</option>`;
            });
            $('#transactionProductDiscriptions').append(productDiscriptionUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
}

function onChangeProductDiscriptionTransation() {
    console.log("here");
    let filterData = {
        "productCategory": $("#transactionProductCategory").val(),
        "productSubCategory": $("#transactionSubCategory").val(),
        "productDiscription": $("#transactionProductName").val()
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
                $('#availableStock').val(element.availableStock)
            });
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
                productNameArray.push(element.productDiscription)
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


//==================================
//==Transaction modal javascript==>
//==================================


function loadTables() {
    $.get("http://localhost:3000/products", async function(data) {
        await populateProductTable(data);
    });
    $.get("http://localhost:3000/transactions", async function(data) {
        await populateTransactionTable(data);
    });
    $.get("http://localhost:3000/stockStatement", async function(data) {
        await populateStockStatement(data);
    });
}

function populateProductTable(data) {
    console.log("populating data table...");
    productList = data;
    var length = data.length;
    var table = $('#productRegister').DataTable({

        dom: 'Bfrtip',
        buttons: [{
                extend: 'excelHtml5',
                title: 'Excel',
                text: 'Export to excel'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3,4,5,6]
                    // }
            },
            {
                extend: 'pdfHtml5',
                title: 'PDF',
                text: 'Export to PDF'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3, 4, 5, 6]
                    //  }
            }
        ]
    });

    table.clear()
    for (var i = 0; i < length; i++) {
        $('#productRegister').dataTable().fnAddData([
            `<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='deleteProduct("${data[i]._id}");'>delete</a>`,
            data[i].productCategory,
            data[i].productSubCategory,
            data[i].productDiscription
        ]);
    }
}

function populateTransactionTable(data) {
    console.log("populating Transactions data table...");
    var table = $('#transctionSummery').DataTable({

        dom: 'Bfrtip',
        buttons: [{
                extend: 'excelHtml5',
                title: 'Excel',
                text: 'Export to excel'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3,4,5,6]
                    // }
            },
            {
                extend: 'pdfHtml5',
                orientation: 'portrait',
                pageSize: 'A4',
                title: 'Transaction_Data',
                text: 'Export to PDF',
                alignment: 'center'

                //Columns to export
                //exportOptions: {
                //     columns: [0, 1, 2, 3, 4, 5, 6]
                //  }
            }
        ]
    });
    table.clear()
    data.forEach(element => {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/getProductById",
            data: JSON.stringify({ "id": element.product }),
            dataType: 'json',
            success: async function(result) {
                $('#transctionSummery').dataTable().fnAddData([
                    //`<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='del("${data[i]._id}");'>delete</a>`,
                    element.transactionDate,
                    result.productDiscription,
                    element.transactionType,
                    element.quantity
                ]);
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });

    });

}

function populateStockStatement(data) {
    console.log("populating Stock data table...");
    var table = $('#stockSummery').DataTable({

        dom: 'Bfrtip',
        order: [
            [3, "asc"]
        ],
        buttons: [{
                extend: 'excelHtml5',
                title: 'Excel',
                text: 'Export to excel'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3,4,5,6]
                    // }
            },
            {
                extend: 'pdfHtml5',
                title: 'PDF',
                text: 'Export to PDF'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3, 4, 5, 6]
                    //  }
            }
        ]
    });
    table.clear()
    data.forEach(element => {
        $('#stockSummery').dataTable().fnAddData([
            //`<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='del("${data[i]._id}");'>delete</a>`,
            element.productCategory,
            element.productSubCategory,
            element.productDiscription,
            element.availableStock
        ]);

    });
}

function populateIoRegister(data) {

    console.log("populating IO register data table...");
    var table = $('#transactionRegister').DataTable({
        dom: 'Bfrtip',
        buttons: [{
                extend: 'excelHtml5',
                title: 'Excel',
                text: 'Export to excel'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3,4,5,6]
                    // }
            },
            {
                extend: 'pdfHtml5',
                title: 'PDF',
                text: 'Export to PDF'
                    //Columns to export
                    //exportOptions: {
                    //     columns: [0, 1, 2, 3, 4, 5, 6]
                    //  }
            }
        ]
    });
    table.clear()
    data.forEach(element => {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/getProductById",
            data: JSON.stringify({ "id": element.product }),
            dataType: 'json',
            success: async function(result) {
                $('#transactionRegister').dataTable().fnAddData([
                    //`<a  href='#' onclick='edit("${data[i]._id}");'>edit</a>/<a  href='#' onclick='del("${data[i]._id}");'>delete</a>`,
                    element.transactionDate,
                    result.productCategory,
                    result.productDiscription,
                    element.quantity
                ]);
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });

    });

}

function clearModal(obj) {
    $(obj)
        .find("input,textarea,select")
        .val('')
        .end()
        .find("input[type=checkbox], input[type=radio]")
        .prop("checked", "")
        .end()
        .find("datalist")
        .html('')
        .end()
}