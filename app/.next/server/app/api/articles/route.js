"use strict";
(() => {
var exports = {};
exports.id = "app/api/articles/route";
exports.ids = ["app/api/articles/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2Froute&page=%2Fapi%2Farticles%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2Froute&page=%2Fapi%2Farticles%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   originalPathname: () => (/* binding */ originalPathname),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js");
/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/future/route-kind.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/server/lib/patch-fetch.js");
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _home_ubuntu_lexanova_nextjs_app_app_api_articles_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/articles/route.ts */ "(rsc)/./app/api/articles/route.ts");




// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/articles/route",
        pathname: "/api/articles",
        filename: "route",
        bundlePath: "app/api/articles/route"
    },
    resolvedPagePath: "/home/ubuntu/lexanova-nextjs/app/app/api/articles/route.ts",
    nextConfigOutput,
    userland: _home_ubuntu_lexanova_nextjs_app_app_api_articles_route_ts__WEBPACK_IMPORTED_MODULE_3__
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;
const originalPathname = "/api/articles/route";
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        serverHooks,
        staticGenerationAsyncStorage
    });
}


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ "(rsc)/./app/api/articles/route.ts":
/*!***********************************!*\
  !*** ./app/api/articles/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   dynamic: () => (/* binding */ dynamic)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ "(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/api/server.js");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/client */ "@prisma/client");
/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_1__);
const dynamic = "force-dynamic";


const prisma = new _prisma_client__WEBPACK_IMPORTED_MODULE_1__.PrismaClient();
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const limit = parseInt(searchParams.get("limit") || "6");
        const where = {
            isPublished: true
        };
        if (category && category !== "all") {
            where.category = {
                slug: category
            };
        }
        const articles = await prisma.article.findMany({
            where,
            include: {
                category: true
            },
            orderBy: {
                publishedAt: "desc"
            },
            take: limit
        });
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            articles
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: "Failed to fetch articles"
        }, {
            status: 500
        });
    } finally{
        await prisma.$disconnect();
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/../../../../opt/hostedapp/node/root/app/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Farticles%2Froute&page=%2Fapi%2Farticles%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Farticles%2Froute.ts&appDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Fubuntu%2Flexanova-nextjs%2Fapp&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();