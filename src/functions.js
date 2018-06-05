let FLICKR_KEY = "52b5795d19e8e4f2111903fdc90802bb";
let FOURSQUARE_ID = "KRVCDBSQOP42EGUBR02Q0BCLGKLL54ISEC2X51FV2CY1QMCP";
let FOURSQUARE_SECRET = "1ABVWLFI0FR0OOF1MHA4KMZAVPTUU2DQJXMXCF0ZQBOZ4Y5Y";




/*
 * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 * @desc import all images from a specific directory
 * @param r - object (context)
 * @return - array (images)
 */
export const _importAllImagesFromFolder = function (r) {
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
export const _buildFlickrQueryURL = function (keyword, position) {
    let root = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_KEY + "&text=" + keyword;
    let location = "&lat=" + position.lat() + "&lon=" + position.lng() + "&radius=5";
    let accuracy = "&accuracy=16";
    let contentType = "&content_type=1";
    let format = "&format=json&nojsoncallback=1";
    let extras = "&extras=url_s"

    return root + location + accuracy + contentType + format + extras;
}

/*
 * @desc function to make the query string passed as url parameter to a http request
 * @param keyword - string, the name of a specified location on the map
 * @param coord - object, geographic coordinates of a specified object on the map
 * return string
 */
export const _buildFoursquareQueryURL = function (keyword, position) {
    let root = "https://api.foursquare.com/v2/venues/search?";
    let location = "ll=" + position.lat()+ "," + position.lng() + "&radius=500&llAcc=1000";
    let oauth_token = "&client_id=" + FOURSQUARE_ID + "&client_secret=" + FOURSQUARE_SECRET;
    let query = "&query=" + keyword;
    let versioning = "&v=20180529"

    return root + location + oauth_token + query + versioning;
}

/*
 * @desc function to make an http request
 * @param url - string, a query string formatted to meet Flickr API specifications
 * return object 
 */
export const _makeRequest = (url, errorHandler) => {
    let query_root = url.substring(0, url.indexOf("?"));
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            let response = JSON.parse(xhr.response);
            if (this.status >= 200 && this.status < 300) {
                resolve(response );
            } else {
                errorHandler({
                    code: this.status,
                    info: "HTTP request to " + query_root + " returned an error",
                    extra: JSON.stringify(response)
                });
            }
        };
        xhr.send();
    });
}

/*
 * @desc function to make an url to a photo on Flicker
 * @param obj - an item in photos.photo array in the response object stored in App.state
 * return string
 */
export const _makeURLToFlickrPhoto = (photo) => {
    let url = `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    return url;
}

/*
 * @desc function to construct a HTML string, as a part of the infoWindow content
 * @param obj - the response object stored in App.state
 * return string (string to be added as inner HTML to infoWindow content)
 */
export const _makeFlickrInfoHTML = (flickrRespObj) => {
    let flickrHTML = "";

    let photos = flickrRespObj && flickrRespObj.photos ? flickrRespObj.photos.photo : [];
    let totalPhotos = photos.length;
    if (totalPhotos > 0) {
        flickrHTML += `<hr><div>`;
        flickrHTML += `<p><strong>Flickr:</strong> ${totalPhotos} photos</p>
                       <div>`;
        photos.forEach(photo => {
            let url = _makeURLToFlickrPhoto(photo);
            flickrHTML += `<a href=${url}><img src=${photo.url_s} alt=${photo.title} height="50" width="50"></a>`
        });
        flickrHTML += `</div></div>`
    }
    else{
        flickrHTML += `<hr><div><p>Nothing was found on <strong>Flickr</strong></p><div>`;
    }

    return flickrHTML;
}

/*
 * @desc function to make an url to a specific venue object on Foursquare
 * @param obj - a venue in venues array in the response object stored in App.state
 * return string
 */
const _makeURLToFoursquarePage = (venue) => {
    let url = `https://foursquare.com/v/${venue.id}`;
    return url;
}
/*
 * @desc function to construct a HTML string, as a part of the infoWindow content
 * @param obj - the response object stored in App.state
 * return string (string to be added as inner HTML to infoWindow content)
 */
export const _makeFoursquareInfoHTML = (foursquareRespObj) => {
    let foursquareHTML = "";
    if (foursquareRespObj.response && foursquareRespObj.response.venues && foursquareRespObj.response.venues.length > 0) {
        foursquareHTML += `<hr><div>`;
        let venue = foursquareRespObj.response.venues[0];
        let location = venue.location;
        if (location) {
            foursquareHTML += ` <p>${location.address || "---"}</p>`;
            foursquareHTML += ` <p>${location.postalCode || "---"} - ${venue.location.city || "---"}</p>`;
            foursquareHTML += ` <p>${location.country || "---"}</p>`;
        }
		let url = _makeURLToFoursquarePage(venue);
        foursquareHTML += `<p>See more on <a href=${url}><strong>Foursquare</strong></a></p></div>`;
    }
    else{
        foursquareHTML += `<hr><div><p>Nothing was found on <strong>Foursquare</strong></p><div>`;
    }
    return foursquareHTML;
}

 /*
   * @desc generate a unique key for every element in locations list
   * using index and last four digits of the latitude and longitude values
   * @param object loc - an item in locations array
   * @return string
   */
  export const _generateKey = (marker, index) => {
    let key = index.toString();
    let lat = marker.position.lat().toString(),
        lng = marker.position.lng().toString();
    key += lat.slice(lat.length - 5, lat.length - 1);
    key += lng.slice(lng.length - 5, lng.length - 1);
    return key;
  };