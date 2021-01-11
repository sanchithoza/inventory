$('#addProduct').click(() => {
    let companyName = $('#companyName').val()
    let productName = $('#productName').val()
    let productCategory = $('#productCategory').val()
    let productSubCategory = $('#subCategory').val()
    let newProduct = {
            companyName,
            productName,
            productCategory,
            productSubCategory
        }
        //  console.log(newProduct);
        /* $.post("http://localhost:3000/addProduct", newProduct).done((data) => {
             console.log(data);
         })*/
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/addProduct",
        data: JSON.stringify(newProduct),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            $.get("http://localhost:3000/products", function(data) {
                // console.log(typeof data); // string
                populateDataTable(data);
                // console.log(data); // HTML content of the jQuery.ajax page
            });
            $('#productMasterModal').modal('hide');
            //           $('#productRegister').DataTable();
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
});
//add product modal events

$("#productMasterModal").on('show.bs.modal', function() {
    let productCategoryArray = [];
    let productCategoryUi = "";
    $('#productCategories').html("");
    // product list is a global variable 
    productList.forEach(element => {
        productCategoryArray.push(element.productCategory)
    })
    productCategoryArray = _.uniqBy(productCategoryArray)
    productCategoryArray.forEach(element => {
        productCategoryUi += `<option>${element}</option>`;
    });
    $('#productCategories').append(productCategoryUi);
});
$("#productCategory").on('change', function() {
    // console.log($("#companyName").val());
    let filterData = {
        "productCategory": $("#productCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            let productSubCategoryArray = []
            let productSubCategoryUi = []
            $('#subCategories').empty();
            data.forEach(element => {
                productSubCategoryArray.push(element.productSubCategory)
            });
            productSubCategoryArray = _.uniqBy(productSubCategoryArray)
            productSubCategoryArray.forEach(element => {
                productSubCategoryUi += `<option>${element}</option>`;
            });
            $('#subCategories').append(productSubCategoryUi);
        },
        error: function(e) {
            alert("Error!")
            console.log("ERROR: ", e);
        }
    });
})
$("#subCategory").on('change', function() {
    //console.log($("#productName").val());
    let filterData = {
        "productCategory": $("#productCategory").val(),
        "productSubCategory": $("#subCategory").val()
    }
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "http://localhost:3000/getProductWhere",
        data: JSON.stringify(filterData),
        dataType: 'json',
        success: function(data) {
            console.log(data);
            //productCategory
            let companyNameArray = []
            let companyNameUi = []

            data.forEach(element => {
                companyNameArray.push(element.companyName)
            });
            companyNameArray = _.uniqBy(companyNameArray)
            $('#productCategories').empty();
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
})