var categoryModel = require("../models/category.model")

exports.category = async (req, res, next) => {

    // let categoryData = await categoryModel.find();

    const pipeline = [
        {
            $lookup: {
                from: "Products",
                localField: "_id",
                foreignField: "cartId",
                as: "products",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                count: { $size: "$products" },
            },
        },
    ];

    const productCountByCategory = await categoryModel.aggregate(pipeline)

    res.render('category/category', { title: 'Danh mục', categoryData: productCountByCategory })
}

exports.add = async (req, res, next) => {
    let msg = ''

    if (req.method == "POST") {
        let categoryObj = new categoryModel()

        categoryObj.name = req.body.name;

        try {
            await categoryObj.save()
            msg = 'Thêm danh mục thành công'
        } catch (err) {
            msg = "Thêm danh mục thất bại vui lòng thử lại"
            console.log(err)
        }
    }

    res.render('category/categoryNotification', { title: 'Thêm thành công', msg })
}

exports.edit = async (req, res, next) => {
    let msg = ''

    if (req.method == "POST") {

        let categoryObj = new categoryModel()
        let id = req.body.inputId

        categoryObj.name = req.body.name;
        categoryObj._id = id

        try {
            await categoryModel.findByIdAndUpdate(id, categoryObj)
            msg = 'Đã cập nhật danh mục có id : ' + id
        } catch (err) {
            msg = "Cập nhật danh mục thất bại vui lòng thử lại"
            console.log(err)
        }
    }

    res.render('category/categoryNotification', { title: 'Cập nhật danh mục', msg })
}

exports.delete = async (req, res, next) => {
    let msg = ''

    if (req.method == "POST") {

        let id = req.body.id

        try {
            await categoryModel.findByIdAndDelete(id)
            msg = 'Đã xóa danh mục có id : ' + id
        } catch (err) {
            msg = "Xóa danh mục thất bại vui lòng thử lại"
            console.log(err)
        }
    }

    res.render('category/categoryNotification', { title: 'Xóa danh mục', msg })
}