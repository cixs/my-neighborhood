let FLICKR_KEY = "52b5795d19e8e4f2111903fdc90802bb";
let FOURSQUARE_ID = "KRVCDBSQOP42EGUBR02Q0BCLGKLL54ISEC2X51FV2CY1QMCP";
let FOURSQUARE_SECRET = "1ABVWLFI0FR0OOF1MHA4KMZAVPTUU2DQJXMXCF0ZQBOZ4Y5Y";




/*
 * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 * @desc import all images from a specific directory
 * @param r - object (context)
 * @return - array (images)
 */
export const importAllImagesFromFolder = function(r) {
    // markers icon pack from https://templatic.com/directory-resources/
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
      return images[item];
    });
    return images;
  }

/*
* @desc function to make the query string passed as url parameter to a http request
* @param keyword - string, the name of a specified location on the map
* @param coord - object, geographic coordinates of a specified object on the map
* return string
*/
export const flickr_buildQueryURL = function (keyword, coord) {
    let root = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_KEY + "&text=" + keyword;
    let location = "&lat=" + coord.lat + "&lon=" + coord.lng + "&radius=5";
    let accuracy = "&accuracy=16";
    let contentType = "&content_type=1";
    let format = "&format=json&nojsoncallback=1";

    return root + location + accuracy + contentType + format;
}

/*
* @desc function to make the query string passed as url parameter to a http request
* @param keyword - string, the name of a specified location on the map
* @param coord - object, geographic coordinates of a specified object on the map
* return string
*/
export const foursquare_buildQueryURL = function (keyword, coord) {
    let root = "https://api.foursquare.com/v2/venues/search?";
    let location = "ll=" + coord.lat + "," + coord.lng + "&radius=500&llAcc=1000";
    let oauth_token = "&client_id=" + FOURSQUARE_ID + "&client_secret=" + FOURSQUARE_SECRET;
    let query = "&query="+ keyword;
    let versioning = "&v=20180529"

    return root + location + oauth_token + query + versioning;
}

/*
* @desc function to make an http request from Flickr
* @param url - string, a query string formatted to meet Flickr API specifications
* return object 
*/
export const makeRequest = (url) => {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}


/*
* @desc function to make an http request from Foursquare
* @param url - string, a query string formatted to meet Flickr API specifications
* return object 
*/
export const foursquare_makeXHR = (url) => {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}