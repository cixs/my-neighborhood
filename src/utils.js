
let utils = {


/*
 * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 * @desc import all images from a specific directory
 * @param r - object (context)
 * @return - array (images)
 */
importAll: function(r) {
    // markers icon pack from https://templatic.com/directory-resources/
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
      return images[item];
    });
    return images;
  }
}

export default utils;