const cloudinary = require("cloudinary").v2;

const uploadFileToCloudinary = async (file) => {
    cloudinary.config({
        cloud_name:"dzgq8z8dk",
        api_key:"526291857723612",
        api_secret:"heFubtd4JdyDdKIAeKKV5JI4OOw"
    })

    const cloudinaryResponse = await cloudinary.uploader.upload(file.path)
    return cloudinaryResponse;
};

module.exports = {
  uploadFileToCloudinary,
};
