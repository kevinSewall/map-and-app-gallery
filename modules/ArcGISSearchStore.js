/** @license
 | Version 10.2
 | Copyright 2013 Esri
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */
define(["dojo/_base/declare", "dojo/store/util/SimpleQueryEngine"], function (declare, SimpleQueryEngine) {
    return declare(null, {
        _groupId: "",
        _webmapViewer: null,
        _amendedResults: null,

        /**
         * Constructs the ArcGISSearchStore object.
         * @param {string} args.groupId The id of the arcgis.com group
         *        whose data are to be used for the store
         * @param {string} args.webmapViewer The URL of the viewer that
         *        can be used to display webmaps, e.g.,
         *        "http://www.arcgis.com/home/webmap/viewer.html?webmap="
         *        "http://explorer.arcgis.com/?open="
         */
        constructor: function (args) {
            if (args) {
                if (args.groupId) {
                    this._groupId = args.groupId;
                }
                if (args.webmapViewer) {
                    this._webmapViewer = args.webmapViewer;
                } else {
                    this._webMapViewer = "http://www.arcgis.com/home/webmap/viewer.html?webmap=";
                }
            }
        },

        /**
         * Clears the store's cache so that the next call to fetch()
         * queries the server.
         */
        clearCache: function () {
            this._amendedResults = null;
        },

        /**
         * Performs the fetch from the arcgis.com REST endpoint.
         * @param {object} request Filtering options for the results of
         *        the fetch; see dojo/store/util/SimpleQueryEngine for
         *        details. Request also includes the onComplete function
         *        left over from the days when this fetch used dojo's
         *        simpleFetch. onComplete takes two arguments: the
         *        filtered results array and this request object.
         * @note result.onComplete(results, request) is called upon the
         *       completion of the fetch and subsequent filtering.
         * @note The data are fetched once--the first time that this
         *       method is called--and the fetch results are re-used
         *       from then on until
         */
        fetch: function (request) {
            var pThis = this;

            // Reuse the initial fetch if it exists
            if(null != this._amendedResults)
            {
                request.onComplete(this._filterResults(this._amendedResults, request), request);
            }
            // Otherwise query the server
            else
            {
                // Post the query so that we can use a proxy
                dojo.xhrPost({
                    url: "proxy.ashx?http://www.arcgis.com/sharing/search",
                    postData:
                        "q=group:" + escape(this._groupId) +
                        "&start=0&num=200&f=json",
                    handleAs: "json",
                    timeout: 40000,  // ms
                    load: function(data) {
        	            // Process the items
                        pThis._amendedResults = pThis._amendResults(data);
        	            request.onComplete(pThis._filterResults(pThis._amendedResults, request), request);
                    },
                    error: function(text) {
                        return text;
                    }
                });
            }
        },

        /**
         * Extracts the results part of the arcgis.com REST data return
         * and amends it with the URLs to the item's thumbnail and
         * fullsize images.
         * @param {object} data arcgis.com REST data result
         * @return {array} Amended results
         */
        _amendResults: function(data){
            // Default to empty store
            var pThis = this, items = [];

            if(data.results){
                items = data.results;

                dojo.forEach(items, function(item) {
                    // Get the URLs to the thumbnail and its original image
                    var imageFilename = item["thumbnail"];
                    if(imageFilename) {
                        item["thumbnail"] = "proxy.ashx?" + "http://www.arcgis.com/sharing/content/items/" + item["id"] + "/info/" + imageFilename;
                        var filenamePieces = imageFilename.split(".");
                        imageFilename = filenamePieces[0] + "_orig." + filenamePieces[1];
                        item["fullsize"] = "proxy.ashx?" + "http://www.arcgis.com/sharing/content/items/" + item["id"] + "/info/" + imageFilename;
                    } else {
                        item["thumbnail"] = "graphics/missingThumbnail.png";
                        item["fullsize"] = "graphics/missingThumbnail.png";
                    }

                    // If the item does not have a URL, see if it is a web map or use the /data part of the item for the URL
                    if(!item.url) {
                        if (item.type === "Web Map") {
                            item.url = pThis._webmapViewer + item.id;
                        } else {
                            item.url = "proxy.ashx?" + "http://www.arcgis.com/sharing/content/items/" + item["id"] + "/data";
                            if (item.itemType && item.itemType === "file") {
                                item.url += "?file=" + item.item;
                            }
                        }
                    }
                });
            }
            return items;
        },

        /**
         * Filters an array of results using dojo's SimpleQueryEngine.
         * @param {array} results Array to be filtered
         * @param {object} request SimpleQueryEngine options
         * @return {object} A filtered array
         */
        _filterResults: function (results, request) {
            return SimpleQueryEngine(null, request)(results);
        }
    });
});
