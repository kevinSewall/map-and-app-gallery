# map-and-app-gallery

The Local Government Maps and Apps Gallery is a configurable web application that provides citizens access to maps and apps you have developed for your local government and cataloged in ArcGIS.com. The maps and apps are organized into a gallery around information and services citizens need to do business with cities, counties, and other local governments. This application is typically deployed on-premises and is accessible from your local government's web site.

[Try the Maps and Apps Gallery application](http://localgovtemplates2.esri.com/MapsAndApps/)

[![Image of Maps and Apps Gallery application](https://raw.github.com/Esri/map-and-app-gallery/master/map-and-app-gallery.png "Maps and Apps Gallery application")](http://localgovtemplates2.esri.com/MapsAndApps/)

## Features

* A single gallery of maps and apps for citizens
* Review information about each map or app and provide comments
* Share information using social media

## Instructions

### Your Maps and Apps

[Detailed help](http://resources.arcgis.com/en/help/localgovernment/10.1/index.html#/What_is_Maps_and_Apps_Gallery/028s000000wq000000/)
on the ArcGIS Resource Center can guide you in the setup and configuration of the app with your maps and apps.

### General Help
[New to Github? Get started here.](http://htmlpreview.github.com/?https://github.com/Esri/esri.github.com/blob/master/help/esri-getting-to-know-github.html)

Before running the Gallery, we recommend that you run checklist.html. This page duplicates many of the steps that the Gallery
does during its startup, but it provides diagnostic messages as it runs. It should complete and put a message at the top of the
page saying "Checklist testing is complete".

If you switch to a new gallery owner after having been running the Gallery, you may find that the Gallery does not change or
does not have any items. Clear your browser cache and run checklist.html. If the checklist.html fails at step 3.5 with the
message "No groups were found for...", then the proxy program has a cached authentication that needs to be cleared. Rename
proxy.config to anything else and re-run checklist.html; it will fail at step 3.3 with the message "Proxy configuration not
available; token cache cleared". Restore proxy.config's name and run the checklist again.

## Requirements

### Esri Sample Services

* Microsoft ASP.NET Framework 4.0 available from the [Microsoft website](http://www.microsoft.com/en-us/download/details.aspx?id=17851)

### Your Services

* ArcGIS Online - [About](http://www.esri.com/software/arcgis/arcgisonline)
* Microsoft ASP.NET Framework 4.0 available from the [Microsoft website](http://www.microsoft.com/en-us/download/details.aspx?id=17851)

## Resources

Learn more about Esri's [ArcGIS for Local Government maps and apps](http://resources.arcgis.com/en/communities/local-government/).

Show me a list of other [Local Government GitHub repositories](http://esri.github.io/#Local-Government).

Additional [information](http://www.arcgis.com/home/item.html?id=74f7dedcb89c4bc3b714226849509501)
is available for the application.

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone.
Please see our [guidelines for contributing](https://github.com/esri/contributing).

## Licensing

Copyright 2012 Esri

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

A copy of the license is available in the repository's
[LICENSE.txt](https://raw.github.com/Esri/map-and-app-gallery/master/LICENSE.txt) file.

[](Esri Tags: Local-Government Local Government Map App Gallery)
[](Esri Language: JavaScript)
