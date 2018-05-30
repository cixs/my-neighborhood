let FLICKR_KEY = "52b5795d19e8e4f2111903fdc90802bb";
let FOURSQUARE_ID = "KRVCDBSQOP42EGUBR02Q0BCLGKLL54ISEC2X51FV2CY1QMCP";
let FOURSQUARE_SECRET = "1ABVWLFI0FR0OOF1MHA4KMZAVPTUU2DQJXMXCF0ZQBOZ4Y5Y";




/*
 * from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
 * @desc import all images from a specific directory
 * @param r - object (context)
 * @return - array (images)
 */
export const importAllImagesFromFolder = function (r) {
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
export const _buildFlickrQueryURL = function (keyword, coord) {""
    let root = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + FLICKR_KEY + "&text=" + keyword;
    let location = "&lat=" + coord.lat + "&lon=" + coord.lng + "&radius=5";
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
export const _buildFoursquareQueryURL = function (keyword, coord) {
    let root = "https://api.foursquare.com/v2/venues/search?";
    let location = "ll=" + coord.lat + "," + coord.lng + "&radius=500&llAcc=1000";
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
export const _makeRequest = (url) => {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    url: url
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                url: url
            });
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
export const _makeFlickrInfoHTML = (flickrResp) => {
    let flickrHTML = `<div className="flickr-info">`;

    let photos = flickrResp && flickrResp.photos ? flickrResp.photos.photo : [];
    let totalPhotos = photos.length;
    if (totalPhotos > 0) {
        flickrHTML += `<p><strong>Flickr:</strong> ${totalPhotos} photos</p>
                       <div className="flickr-thumbnails-wrapper">`;
        photos.forEach( photo => {
            let url = _makeURLToFlickrPhoto(photo);
            flickrHTML += `<a target="_blank" className="flickr-thumbnail" href=${url}><img src=${photo.url_s} alt=${photo.title} height="50" width="50"></a>`
        });
        flickrHTML += `</div>`
    }
    flickrHTML += `</div>`
    return flickrHTML;
}

/*
 * @desc function to make an url to a photo on Foursquare
 * @param obj - a venue in venues array in the response object stored in App.state
 * return string
 */
export const _makeURLToFoursquarePage = (venue) => {
    let url = `https://foursquare.com/v/${venue.id}`;
    return url;
}
/*
 * @desc function to construct a HTML string, as a part of the infoWindow content
 * @param obj - the response object stored in App.state
 * return string (string to be added as inner HTML to infoWindow content)
 */
export const _makeFoursquareInfoHTML = (foursquareResp) => {
    let foursquareHTML = `<div className="foursquare-info">`;
    if(foursquareResp.response && foursquareResp.response.venues && foursquareResp.response.venues.length > 0){
        let venue = foursquareResp.response.venues[0];
        let location = venue.location;
        if(location){
            foursquareHTML+= ` <p>${location.address || "---"}</p>`;
            foursquareHTML+= ` <p>${location.postalCode || "---"} - ${venue.location.city || "---"}</p>`;
            foursquareHTML+= ` <p>${location.country || "---"}</p>`;
        }
		let url = _makeURLToFoursquarePage(venue);
		foursquareHTML+= `<p>See more on <a target="_blank" href=${url}><strong>Foursquare</strong></a></p><hr />`;
    }
    foursquareHTML+= `</div>`;
    return foursquareHTML ;
}