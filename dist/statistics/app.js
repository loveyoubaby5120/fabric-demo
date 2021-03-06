(function(FuseBox){FuseBox.$fuse$=FuseBox;
FuseBox.target = "browser";
// allowSyntheticDefaultImports
FuseBox.sdep = true;
var __process_env__ = {"NODE_ENV":"development"};
FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("statistics/index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var localeProvider_1 = require("~/common/antd/localeProvider");
var moment = require("moment");
var React = require("react");
var react_dom_1 = require("react-dom");
var appStateStore_1 = require("./common/appStateStore");
var routes_1 = require("./routes");
moment.locale('zh-cn');
react_dom_1.render(React.createElement(localeProvider_1.LocaleProvider, { locale: localeProvider_1.zhCNC },
    React.createElement(appStateStore_1.AppStateProvider, null, routes_1.routes)), document.getElementById('reactApp'));
//# sourceMappingURL=index.js.map
});
___scope___.file("common/antd/localeProvider.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("antd/lib/locale-provider/style/css");
var zh_CN_1 = require("antd/lib/locale-provider/zh_CN");
require("~/common/antd/default-style.css");
require("moment/locale/zh-cn");
exports.LocaleProvider = require('antd/lib/locale-provider');
exports.zhCNC = zh_CN_1.default;
//# sourceMappingURL=localeProvider.js.map
});
___scope___.file("common/antd/default-style.css", function(exports, require, module, __filename, __dirname){


require("fuse-box-css")("default/common/antd/default-style.css", "/**\n * 对antd的一些样式做覆盖\n */\n\nhtml body {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #333;\n}\n\n.ant-confirm-content {\n  overflow: auto;\n}\n")
});
___scope___.file("statistics/common/appStateStore.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var mobx_react_1 = require("mobx-react");
var React = require("react");
var AppStateStore = /** @class */ (function () {
    function AppStateStore() {
        this.appState = {
            currentUser: {
                permissions: ['guest'],
            },
        };
    }
    __decorate([
        mobx_1.observable
    ], AppStateStore.prototype, "appState", void 0);
    return AppStateStore;
}());
exports.AppStateStore = AppStateStore;
var AppStateProvider = /** @class */ (function (_super) {
    __extends(AppStateProvider, _super);
    function AppStateProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.store = new AppStateStore();
        return _this;
    }
    AppStateProvider.prototype.render = function () {
        return (React.createElement(mobx_react_1.Provider, { data: this.store }, this.props.children));
    };
    return AppStateProvider;
}(React.Component));
exports.AppStateProvider = AppStateProvider;
function withAppState(UnderlyingComponent) {
    return mobx_react_1.inject('data')(UnderlyingComponent);
}
exports.withAppState = withAppState;
//# sourceMappingURL=appStateStore.js.map
});
___scope___.file("statistics/routes.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var layoutBase_1 = require("./page/layoutBase");
exports.routes = (React.createElement(react_router_dom_1.BrowserRouter, null,
    React.createElement(react_router_dom_1.Switch, null,
        React.createElement(react_router_dom_1.Route, { path: '/', component: layoutBase_1.LayoutBase }))));
//# sourceMappingURL=routes.js.map
});
___scope___.file("statistics/page/layoutBase.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var layout_1 = require("~/common/antd/layout");
var menu_1 = require("~/common/antd/menu");
var radium_style_1 = require("~/common/component/radium_style");
var radium_1 = require("~/common/radium");
var mobx_react_1 = require("mobx-react");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var appStateStore_1 = require("~/statistics/common/appStateStore");
var publicData_1 = require("../common/publicData");
var routes_1 = require("./routes");
var Header = layout_1.Layout.Header, Content = layout_1.Layout.Content, Footer = layout_1.Layout.Footer;
var LayoutBaseView = /** @class */ (function (_super) {
    __extends(LayoutBaseView, _super);
    function LayoutBaseView(props) {
        var _this = _super.call(this, props) || this;
        _this.makeMenuItem = function (menuList, parentUrl) {
            return menuList.map(function (r, i) {
                var url = (parentUrl || '') + "/" + r.url;
                var title = r.title;
                if (r.children && r.children.length > 0) {
                    return (React.createElement(menu_1.Menu.SubMenu, { key: url, title: React.createElement("span", null, title) }, _this.makeMenuItem(r.children, url)));
                }
                return (React.createElement(menu_1.Menu.Item, { key: url },
                    React.createElement("span", null, title)));
            });
        };
        return _this;
    }
    LayoutBaseView.prototype.render = function () {
        var _this = this;
        var pathArr = this.props.location.pathname.split('/');
        var selectedKeys = pathArr.length > 2 ? [pathArr.slice(0, 3).join('/')] : ["" + this.props.location.pathname];
        return (React.createElement(layout_1.Layout, null,
            React.createElement(radium_style_1.RadiumStyle, { scopeSelector: ['.statistics'], rules: {
                    '#reactApp': {
                        backgroundColor: '#f0f2f5 !important',
                    },
                } }),
            React.createElement(Header, { style: { position: 'fixed', zIndex: 1, width: '100%', height: 'auto' } },
                React.createElement(menu_1.Menu, { theme: 'dark', mode: 'horizontal', selectedKeys: selectedKeys, style: { lineHeight: '64px' }, onClick: function (item) {
                        _this.props.history.push(item.key.replace('.$', ''));
                    } }, this.makeMenuItem(publicData_1.Nav[0].children, '/statistics'))),
            React.createElement(Content, { id: 'fixSelect', style: { padding: '0 50px', marginTop: 64 } },
                React.createElement("div", { style: {
                        minHeight: 380,
                        marginTop: '16px',
                        background: '#fff',
                        overflow: 'auto',
                    } }, routes_1.routes)),
            React.createElement(Footer, { style: { textAlign: 'center' } })));
    };
    LayoutBaseView = __decorate([
        radium_1.Radium,
        mobx_react_1.observer
    ], LayoutBaseView);
    return LayoutBaseView;
}(React.Component));
exports.LayoutBaseView = LayoutBaseView;
exports.LayoutBase = react_router_dom_1.withRouter(appStateStore_1.withAppState(LayoutBaseView));
//# sourceMappingURL=layoutBase.js.map
});
___scope___.file("common/antd/layout.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("antd/lib/layout/style/css");
require("~/common/antd/default-style.css");
exports.Layout = require('antd/lib/layout');
//# sourceMappingURL=layout.js.map
});
___scope___.file("common/antd/menu.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("antd/lib/menu/style/css");
require("~/common/antd/default-style.css");
exports.Menu = require('antd/lib/menu').default;
//# sourceMappingURL=menu.js.map
});
___scope___.file("common/component/radium_style.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var radium_1 = require("~/common/radium");
var React = require("react");
var Style = radium_1.Radium.Style;
var RadiumStyle = /** @class */ (function (_super) {
    __extends(RadiumStyle, _super);
    function RadiumStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadiumStyle.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            this.props.scopeSelector ?
                this.props.scopeSelector.length === 0 ?
                    React.createElement(Style, { rules: this.props.rules })
                    :
                        (this.props.scopeSelector || []).map(function (r, i) {
                            return React.createElement(Style, { key: i, scopeSelector: r, rules: _this.props.rules });
                        }) : null,
            this.props.children));
    };
    RadiumStyle = __decorate([
        radium_1.Radium
    ], RadiumStyle);
    return RadiumStyle;
}(React.Component));
exports.RadiumStyle = RadiumStyle;
//# sourceMappingURL=radium_style.js.map
});
___scope___.file("common/radium.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var radium = require("radium");
exports.Radium = radium.default;
//# sourceMappingURL=radium.js.map
});
___scope___.file("statistics/common/publicData.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nav = [
    {
        title: '基础数据',
        url: 'statistics',
        children: [
            {
                title: '服务器集群',
                url: 'server',
            },
        ],
    },
];
//# sourceMappingURL=publicData.js.map
});
___scope___.file("statistics/page/routes.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var index_1 = require("./statistics/server/index");
exports.routes = (React.createElement("div", null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', render: function () { return React.createElement(react_router_dom_1.Redirect, { to: '/statistics/server' }); } }),
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/statistics/server', component: index_1.Server })));
//# sourceMappingURL=routes.js.map
});
___scope___.file("statistics/page/statistics/server/index.jsx", function(exports, require, module, __filename, __dirname){

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var radium_1 = require("~/common/radium");
var _ = require("lodash");
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var fabric_1 = require("fabric");
var button_1 = require("~/common/antd/button");
var ServerView = /** @class */ (function (_super) {
    __extends(ServerView, _super);
    function ServerView(props) {
        var _this = _super.call(this, props) || this;
        // 渲染缩放比例
        _this.PROPORTION = { width: 1, height: 1 };
        // 拖拽位置
        _this.lastPos = { x: 0, y: 0 };
        // 是否可拖拽
        _this.drag = false;
        // 数据
        _this.sourceData = [
            [
                {
                    "id": "06a90dbf238865abd2077d3a735749e9",
                    "groupName": "亿城国际中心",
                    "labelName": "北京|研七|linux",
                    "hostList": [
                        [
                            {
                                "id": "001902872b464fe2a95cbcb1786c041d",
                                "hostName": "debian1",
                                "hostStatus": "0",
                            }
                        ],
                        [
                            {
                                "hostName": "debian2",
                            }
                        ]
                    ]
                },
                {
                    "id": "1f1be6e3bddce039a630eb33d6acf009",
                    "groupName": "测试部",
                    "labelName": "北京|天津|windows",
                    "hostList": [
                        [
                            {
                                "hostName": "debian3",
                            }
                        ]
                    ]
                },
                {
                    "id": "8517a77f8df6a494eff30683fbea482d",
                    "groupName": "大数据中心",
                    "labelName": "云环境|天津|windows",
                    "hostList": [
                        [
                            {
                                "hostName": "debian4",
                            },
                            {
                                "hostName": "debian5",
                            }
                        ]
                    ]
                }
            ],
            [
                {
                    id: 1,
                    groupName: '集群1',
                    labelName: 'p1111',
                    hostList: [
                        [
                            {
                                hostName: 'a1',
                            },
                            {
                                hostName: 'a2',
                            },
                            {
                                hostName: 'a3',
                            },
                            {
                                hostName: 'a4',
                            },
                            {
                                hostName: 'a5',
                            },
                            {
                                hostName: 'a6',
                            },
                            {
                                hostName: 'a7',
                            },
                            {
                                hostName: 'a8',
                            },
                        ],
                        [
                            {
                                hostName: 'a9',
                            },
                            {
                                hostName: 'a10',
                            },
                            {
                                hostName: 'a11',
                            },
                        ],
                        [
                            {
                                hostName: 'a12',
                            },
                            {
                                hostName: 'a13',
                            },
                            {
                                hostName: 'a14',
                            },
                            {
                                hostName: 'a15',
                            },
                            {
                                hostName: 'a16',
                            },
                        ],
                    ]
                },
                {
                    id: 2,
                    groupName: '集群2',
                    labelName: 'p2222',
                },
                {
                    id: 3,
                    groupName: '集群3',
                    labelName: 'p3333',
                },
            ],
            [
                {
                    id: 4,
                    groupName: '集群4',
                    labelName: 'p4444',
                },
                {
                    id: 5,
                    groupName: '集群5',
                    labelName: 'p5555',
                },
                {
                    id: 6,
                    groupName: '集群6',
                    labelName: 'p6666',
                },
            ],
        ];
        _this.clusterGroups = [];
        _this.openCluster = [{ id: '06a90dbf238865abd2077d3a735749e9' }];
        // private openCluster: any[] = [];
        // 画布缩放比例
        _this.zoom = 1;
        _this.max_zoom = 10;
        _this.min_zoom = 0.1;
        // 全屏
        _this.fullscreen = false;
        // 集群大小偏移量
        _this.groupBox = {
            left: 100,
            top: 50,
            width: 200,
            height: 200,
            offset: {
                left: 30,
                top: 50,
            },
        };
        // 服务器大小
        _this.subBox = {
            width: 50,
            height: 50,
            offset: {
                left: 10,
                top: 30,
            },
        };
        // 图片url
        _this.imgUrls = [
            'https://cdn.pixabay.com/photo/2019/12/08/01/08/winter-4680354__340.jpg',
        ];
        // 图片fabric对象
        _this.imgs = [];
        // pathfabric对象
        _this.paths = [];
        /**
         * `mousewheel`事件处理
         */
        _this.handleMousewheel = function (e) {
            var canvas = _this.canvas;
            var factor = 40;
            var delta = e.deltaY;
            var zoom = canvas.getZoom();
            delta = delta < -factor ? -factor : delta > factor ? factor : delta;
            zoom = zoom - delta / 200;
            zoom = Math.max(_this.min_zoom, zoom);
            zoom = Math.min(_this.max_zoom, zoom);
            var zoomPoint = new fabric_1.fabric.Point(e.offsetX, e.offsetY);
            canvas.zoomToPoint(zoomPoint, zoom);
            _this.zoom = zoom;
            e.preventDefault();
            e.stopPropagation();
        };
        _this.initRender = function () {
            var groups = _this.drawGroup(_this.sourceData, __assign({}, _this.groupBox), { type: 'sourceNode' }, [{ left: 100 }, { left: 200 }, { left: 300 }, { left: 400 }, { left: 500 }]).groups;
            _this.clusterGroups = groups;
            _this.linkObj(_this.clusterGroups[0][1], _this.clusterGroups[1][2], false, true);
            _this.linkObj(_this.clusterGroups[0][1], _this.clusterGroups[1][2], true, false);
            _this.linkObj(_this.clusterGroups[1][0], _this.clusterGroups[1][2], false, true);
            _this.linkObj(_this.clusterGroups[1][0], _this.clusterGroups[1][2], true, false);
        };
        // 计算 path config
        _this.computePathConfig = function (fromObj, toObj, fromArrows, toArrows) {
            var computeXY = function (obj, comparisonObj) {
                var offsetLeft = obj.left - comparisonObj.left;
                var offsetTop = obj.top - comparisonObj.top;
                return {
                    x: offsetLeft < -(comparisonObj.width) ? obj.left + obj.width :
                        offsetLeft > comparisonObj.width ? obj.left : obj.left + obj.width / 2,
                    y: offsetTop < -(comparisonObj.height) ? obj.top + obj.height - 20 :
                        offsetTop > comparisonObj.height ? obj.top : obj.top + (obj.height - 20) / 2,
                };
            };
            var fromXY = computeXY(fromObj, toObj);
            var toXY = computeXY(toObj, fromObj);
            var pathConfig = {
                fromX: fromXY.x,
                fromY: fromXY.y,
                toX: toXY.x,
                toY: toXY.y,
                fromArrows: fromArrows,
                toArrows: toArrows,
            };
            var offset = fromArrows ? 100 : -100;
            pathConfig.Bezier = [
                {
                    x: (pathConfig.fromX + pathConfig.toX) / 2 + offset / 2,
                    y: (pathConfig.fromY + pathConfig.toY) / 2 - offset / 2,
                },
                {
                    x: (pathConfig.fromX + pathConfig.toX) / 2 + offset / 0.5,
                    y: (pathConfig.fromY + pathConfig.toY) / 2 - offset / 0.5,
                },
            ];
            return pathConfig;
        };
        /** 创建链接关系 */
        _this.linkObj = function (fromObj, toObj, fromArrows, toArrows) {
            var pathConfig = _this.computePathConfig(fromObj, toObj, fromArrows, toArrows);
            var drapPath = _this.linkPath(pathConfig);
            var path = _this.drawPath(drapPath.join(' '), {
                fill: '',
                stroke: '#000',
                objectCaching: false,
            });
            path.isMouseInLine = _this.verifyLink(pathConfig);
            path.index = _this.paths.length;
            path.pathConfig = pathConfig;
            path.objs = {
                fromObj: fromObj,
                toObj: toObj,
            };
            if (!fromObj.paths) {
                fromObj.paths = [path];
            }
            else {
                fromObj.paths.push(path);
            }
            if (!toObj.paths) {
                toObj.paths = [path];
            }
            else {
                toObj.paths.push(path);
            }
            _this.paths.push(path);
            _this.canvas.add(path);
        };
        // 生成校验点线函数
        _this.verifyLink = function (pathConfig) {
            var drapPath = _this.linkPath(pathConfig);
            var Bezier = [];
            drapPath.forEach(function (path) {
                if (path.indexOf('Q') !== -1) {
                    Bezier = path.split(' ');
                }
            });
            var maxNumberX = Math.abs(pathConfig.fromX - pathConfig.toX);
            var maxNumberY = Math.abs(pathConfig.fromY - pathConfig.toY);
            var bezierPointe = [];
            var maxNumber = maxNumberX > maxNumberX ? maxNumberX : maxNumberY;
            for (var i = 0; i < maxNumber; i++) {
                bezierPointe.push(_this.twoBezier(i / maxNumber, {
                    x: pathConfig.fromX,
                    y: pathConfig.fromY,
                }, {
                    x: Bezier[1],
                    y: Bezier[2],
                }, {
                    x: pathConfig.toX,
                    y: pathConfig.toY,
                }));
            }
            return function (mouse) {
                var exist = false;
                bezierPointe.forEach(function (bp) {
                    var x = mouse.x - bp.x * _this.zoom;
                    var y = mouse.y - bp.y * _this.zoom;
                    var distance = Math.sqrt(x * x + y * y);
                    if (distance >= 0 && distance < 5) {
                        exist = true;
                    }
                });
                return exist;
            };
            // const canvas: any = document.getElementById('an');
            // const ctx = canvas.getContext('2d');
            // return (mouse: { x: number, y: number }) => {
            //     ctx.beginPath();
            //     ctx.moveTo(pathConfig.fromX, pathConfig.fromY);
            //     ctx.quadraticCurveTo(Bezier[1], Bezier[2], pathConfig.toX, pathConfig.toY);
            //     ctx.lineWidth = 10;
            //     ctx.lineCap = 'round';
            //     return ctx.isPointInStroke(mouse.x, mouse.y);
            // }
        };
        /** 计算集群 Box */
        _this.computeBox = function (options) {
            return {
                titleBox: {
                    left: options.left + options.width / 2,
                    top: options.top + options.height / 2 - 15,
                },
                lineBox: "M " + (options.left + 10) + " " + (options.top + options.height / 2) + " L " + (options.left + options.width - 10) + " " + (options.top + options.height / 2),
                totalBox: {
                    left: options.left + options.width / 2,
                    top: options.top + 15 + options.height / 2,
                },
                labelBox: {
                    left: options.left + options.width / 2,
                    top: options.top + options.height + 5,
                },
            };
        };
        /** 链接线 */
        _this.linkPath = function (pathFromAndTo) {
            var offset = pathFromAndTo.fromArrows ? 100 : -100;
            var pathConfig = Object.assign({}, pathFromAndTo, {
                theta: 10,
                headlen: 10,
                offset: offset,
            });
            var arrows = pathFromAndTo.toArrows ? _this.drawArrows(pathConfig) : [];
            var arrows2 = pathFromAndTo.fromArrows ? _this.drawArrows(Object.assign({}, pathConfig, {
                fromX: pathConfig.toX,
                fromY: pathConfig.toY,
                toX: pathConfig.fromX,
                toY: pathConfig.fromY,
            })) : [];
            var q = '';
            if (pathFromAndTo.Bezier && pathFromAndTo.Bezier.length > 0) {
                q = pathFromAndTo.Bezier.map(function (bezier) {
                    return bezier.x + " " + bezier.y;
                }).join(',');
                if (pathFromAndTo.Bezier.length > 1) {
                    q = "C " + q;
                }
                else {
                    q = "Q " + q;
                }
            }
            else {
                q = "Q " + ((pathConfig.fromX + pathConfig.toX) / 2 + offset / 2) + " " + ((pathConfig.fromY + pathConfig.toY) / 2 - offset / 2);
            }
            return arrows.concat([
                "M " + pathConfig.fromX + " " + pathConfig.fromY,
                q,
                " " + pathConfig.toX + " " + pathConfig.toY
            ], arrows2);
        };
        /** 箭头 */
        _this.drawArrows = function (obj) {
            var fromX = obj.fromX, fromY = obj.fromY, toX = obj.toX, toY = obj.toY, theta = obj.theta, headlen = obj.headlen, offset = obj.offset;
            var angle = Math.atan2(fromY - toY, fromX - toX + offset) * 180 / Math.PI;
            var angle1 = (angle + theta) * Math.PI / 180;
            var angle2 = (angle - theta) * Math.PI / 180;
            var topX = headlen * Math.cos(angle1);
            var topY = headlen * Math.sin(angle1);
            var botX = headlen * Math.cos(angle2);
            var botY = headlen * Math.sin(angle2);
            return [
                "M " + (toX + topX) + " " + (toY + topY),
                "L " + toX + " " + toY,
                "L " + (toX + botX) + " " + (toY + botY),
            ];
        };
        // 对象显示隐藏
        _this.showHide = function (obj) {
            var _a;
            if (!obj.open) {
                _this.openCluster.push(obj.sourceData);
            }
            else {
                _.remove(_this.openCluster, function (c) { return c.id === obj.sourceData.id; });
            }
            (_a = _this.canvas).remove.apply(_a, _this.canvas.getObjects());
            _this.initRender();
        };
        /**
         * 处理window `resize`事件
         * @param factor draw 画布大小计算缩放比例
         */
        _this.handleWindowResize = function (e, factor) {
            if (factor === void 0) { factor = _this.PROPORTION; }
            var _a = _this.getCanvasSize(factor), width = _a.width, height = _a.height;
            _this.canvas.setDimensions({
                width: width,
                height: height
            });
        };
        /**
         * 获取画布大小
         * @param factor draw 画布大小计算缩放比例
         */
        _this.getCanvasSize = function (factor) {
            if (factor === void 0) { factor = _this.PROPORTION; }
            var _a = _this.clientRect, width = _a.width, height = _a.height;
            return {
                width: (width - 188) * factor.width,
                height: (height - 60 * 2) * factor.height
            };
        };
        return _this;
    }
    Object.defineProperty(ServerView.prototype, "clientRect", {
        /**
         * 获取文档的大小
         */
        get: function () {
            var width = document.documentElement.clientWidth;
            var height = document.documentElement.clientHeight;
            return {
                width: width,
                height: height
            };
        },
        enumerable: true,
        configurable: true
    });
    ServerView.prototype.componentDidMount = function () {
        this.canvas = new fabric_1.fabric.Canvas('an', {
            backgroundColor: '#eee',
            // 禁用组选择
            selection: false,
        });
        window.addEventListener('resize', this.handleWindowResize);
        this.handleWindowResize();
        this.subscriptionEvent();
        this.createImgObj();
        this.createImg();
        document.getElementById('an').parentNode.addEventListener('mousewheel', this.handleMousewheel);
    };
    ServerView.prototype.createImgObj = function () {
        var _this = this;
        this.imgUrls.forEach(function (url) {
            _this.drawImg(url, {});
        });
    };
    // 创建图片定时器
    ServerView.prototype.createImg = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.imgs.length > 0) {
                _this.initRender();
            }
            else {
                _this.createImg();
            }
        }, 1000);
    };
    /**
     * 滚轮缩放
     * @param {Number} dir
     */
    ServerView.prototype.zoomInOut = function (dir) {
        var _a = this.getCanvasSize(), width = _a.width, height = _a.height;
        var zoom = this.canvas.getZoom() + dir;
        zoom = Math.max(this.min_zoom, zoom);
        zoom = Math.min(this.max_zoom, zoom);
        var zoomPoint = new fabric_1.fabric.Point(width / 2, height / 2);
        this.canvas.zoomToPoint(zoomPoint, zoom);
        this.zoom = zoom;
    };
    ServerView.prototype.twoBezier = function (t, p1, cp, p2) {
        var x1 = p1.x, y1 = p1.y;
        var cx = cp.x, cy = cp.y;
        var x2 = p2.x, y2 = p2.y;
        var x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
        var y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
        return { x: x, y: y };
    };
    /**
     * canvas 事件监听
     */
    ServerView.prototype.subscriptionEvent = function () {
        var _this = this;
        this.canvas.on({
            'mouse:dblclick': function (e) {
                if (e.target && e.target['drawObj']) {
                    _this.showHide(e.target);
                }
            },
            'mouse:down': function (e) {
                _this.lastPos = {
                    x: e.e.clientX,
                    y: e.e.clientY
                };
                if (!e.target) {
                    _this.drag = true;
                }
                _this.deActiveObject();
                var activePath = [];
                var vpt = _this.canvas.viewportTransform;
                var mouse = {
                    x: e.pointer.x - vpt[4],
                    y: e.pointer.y - vpt[5],
                };
                _this.paths.forEach(function (path) {
                    if (path.isMouseInLine(mouse)) {
                        activePath.push(path.index);
                        path.objs.fromObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.objs.toObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.set({
                            fill: '',
                            stroke: 'rgba(0, 0, 255, 0.4)',
                        });
                        _this.canvas.renderAll();
                    }
                });
                if (activePath.length > 0) {
                    console.log(activePath);
                    return;
                }
                if (e.target && e.target['drawObj']) {
                    (e.target.paths || []).forEach(function (path) {
                        path.objs.fromObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.objs.toObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.set({
                            fill: '',
                            stroke: 'rgba(0, 0, 255, 0.4)',
                        });
                    });
                    _this.canvas.renderAll();
                }
            },
            'mouse:up': function (e) {
                _this.canvas.discardActiveObject().renderAll();
                _this.drag = false;
                if (!(e.target && e.target['drawObj'])) {
                    return;
                }
                if (e.e.clientX >= e.target.initBox.minLeft &&
                    e.e.clientX <= e.target.initBox.maxLeft &&
                    e.e.clientY >= e.target.initBox.minTop &&
                    e.e.clientY <= e.target.initBox.maxTop) {
                    return;
                }
                var clusterA = {
                    x: e.target.left + e.target.width / 2,
                    y: e.target.top + e.target.height / 2,
                };
                // 距离对象最近的对象
                var minDistanceObj;
                var minDistance = 9999999999999999999999999;
                // 位置：默认在对象前面
                var position = 'left';
                if (e.target.keys.type === 'subNode') {
                    _this.clusterGroups.forEach(function (groups) {
                        groups.forEach(function (cluster) {
                            if (e.target.keys.parentData.id === cluster.sourceData.id) {
                                (cluster.drawObj.subsGroup || []).forEach(function (hostList) {
                                    (hostList || []).forEach(function (sub) {
                                        if (e.target.sourceData.id !== sub.sourceData.id) {
                                            var subB = {
                                                x: sub.left + sub.width / 2,
                                                y: sub.top + sub.height / 2,
                                            };
                                            var x = clusterA.x - subB.x;
                                            var y = clusterA.y - subB.y;
                                            // 计算两个坐标点记录
                                            var distance = Math.sqrt(x * x + y * y);
                                            if (distance < minDistance) {
                                                minDistance = distance;
                                                minDistanceObj = sub;
                                            }
                                            // 判断前后
                                            position = x > 0 ? 'right' : 'left';
                                        }
                                    });
                                });
                            }
                        });
                    });
                    console.log({
                        currentId: e.target.sourceData.id,
                        currentIndex: e.target.sourceDataIndex,
                        position: position,
                        minDistanceObjId: minDistanceObj.sourceData.id,
                        minDistanceObjIndex: minDistanceObj.sourceDataIndex,
                    });
                    return;
                }
                _this.clusterGroups.forEach(function (groups) {
                    groups.forEach(function (cluster) {
                        if (e.target.sourceData.id !== cluster.sourceData.id) {
                            var clusterB = {
                                x: cluster.left + cluster.width / 2,
                                y: cluster.top + cluster.height / 2,
                            };
                            var x = clusterA.x - clusterB.x;
                            var y = clusterA.y - clusterB.y;
                            // 计算两个坐标点记录
                            var distance = Math.sqrt(x * x + y * y);
                            if (distance < minDistance) {
                                minDistance = distance;
                                minDistanceObj = cluster;
                            }
                            // 判断前后
                            position = x > 0 ? 'right' : 'left';
                        }
                    });
                });
                console.log({
                    currentId: e.target.sourceData.id,
                    currentIndex: e.target.sourceDataIndex,
                    position: position,
                    minDistanceObjId: minDistanceObj.sourceData.id,
                    minDistanceObjIndex: minDistanceObj.sourceDataIndex,
                });
            },
            'mouse:move': function (e) {
                var vpt = _this.canvas.viewportTransform;
                if (_this.drag) {
                    _this.canvas.setViewportTransform(vpt.slice(0, 4).concat([
                        vpt[4] + e.e.clientX - _this.lastPos.x,
                        vpt[5] + e.e.clientY - _this.lastPos.y,
                    ]));
                    _this.lastPos.x = e.e.clientX;
                    _this.lastPos.y = e.e.clientY;
                }
                var mouse = {
                    x: e.pointer.x - vpt[4],
                    y: e.pointer.y - vpt[5],
                };
                _this.deActiveObject();
                _this.paths.forEach(function (path) {
                    if (path.isMouseInLine(mouse)) {
                        path.objs.fromObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.objs.toObj.drawObj.cluster.set({
                            stroke: 'rgba(255, 255, 0, .4)',
                        });
                        path.set({
                            fill: '',
                            stroke: 'rgba(0, 0, 255, 0.4)',
                            objectCaching: false,
                        });
                        _this.canvas.renderAll();
                    }
                });
            },
            'object:moving': function (e) {
                if (e.target.keys.type === 'subNode') {
                    var group_1;
                    var left = e.target.left;
                    var top = e.target.top;
                    _this.clusterGroups.forEach(function (groups) {
                        groups.forEach(function (cluster) {
                            if (e.target.keys.parentData.id === cluster.sourceData.id) {
                                group_1 = cluster;
                            }
                        });
                    });
                    var minLeft = 0 - group_1.width / 2;
                    var minTop = 0 - group_1.height / 2 + _this.subBox.height / 2;
                    var maxLeft = group_1.width / 2 - _this.subBox.width;
                    var maxTop = group_1.height / 2 - 20 - _this.subBox.height;
                    if (e.target.left < minLeft) {
                        left = minLeft;
                    }
                    else if (e.target.left > maxLeft) {
                        left = maxLeft;
                    }
                    if (e.target.top < minTop) {
                        top = minTop;
                    }
                    else if (e.target.top > maxTop) {
                        top = maxTop;
                    }
                    e.target.set({
                        left: left,
                        top: top,
                    });
                }
                (e.target.paths || []).forEach(function (path) {
                    var _a = path.objs, fromObj = _a.fromObj, toObj = _a.toObj;
                    var pathConfig = _this.computePathConfig(fromObj, toObj, path.pathConfig.fromArrows, path.pathConfig.toArrows);
                    var pathObject = new fabric_1.fabric.Path(_this.linkPath(pathConfig).join(' '));
                    path.pathConfig = pathConfig;
                    path.isMouseInLine = _this.verifyLink(pathConfig);
                    path.set({
                        path: pathObject.path,
                        fill: '',
                        stroke: 'rgba(0, 0, 255, 0.4)',
                        objectCaching: false,
                    });
                });
                _this.canvas.renderAll();
            },
        });
    };
    /** 渲染组 */
    ServerView.prototype.drawGroup = function (sourceData, offset, keys, center) {
        var _this = this;
        var initTop = offset.top;
        var left = center && center[0] && center[0].left || offset.left;
        var groupBox = {
            width: 0,
            height: 0,
        };
        var subOffset = {
            left: 0,
            top: 0,
        };
        if (keys.type !== 'sourceNode') {
            subOffset = this.subBox.offset;
            initTop = offset.top - (30 + this.subBox.offset.top);
        }
        var groups = sourceData.map(function (r, i) {
            var _a = _this.drawObj(r, {
                width: offset.width,
                height: offset.height,
                top: offset.top + subOffset.top,
                left: left + subOffset.left
            }, keys), objGroup = _a.objGroup, objGroupBox = _a.objGroupBox;
            left = center && center[i + 1] && center[i + 1].left || offset.left;
            offset.top = offset.top + objGroupBox.height + _this.groupBox.offset.top;
            groupBox.width = objGroupBox.sumWidth > groupBox.width ? objGroupBox.sumWidth : groupBox.width;
            groupBox.height = objGroupBox.sumHeight > groupBox.height ? objGroupBox.sumHeight : groupBox.height;
            return objGroup;
        });
        return {
            groups: groups,
            groupBox: {
                width: groupBox.width - left + subOffset.left,
                height: groupBox.height - initTop,
            }
        };
    };
    /** 渲染子 */
    ServerView.prototype.drawObj = function (sourceGroup, offset, keys) {
        var _this = this;
        var options = __assign({}, offset);
        // 计算group box的max box
        var objGroupBox = __assign({}, offset, { sumWidth: 0, sumHeight: 0 });
        var objGroup = sourceGroup.map(function (r, i) {
            // 是否展开
            var open = _.findIndex(_this.openCluster, function (oc) { return oc.id === r.id; }) !== -1 && keys.type === 'sourceNode';
            var drawObj = {};
            var groupSubsGroup = [[]];
            var cluster;
            if (keys.type === 'sourceNode') {
                // 初始化画框
                cluster = _this.drawRect(__assign({}, options, { rx: 10, ry: 10 }));
                drawObj.cluster = cluster;
            }
            else {
                cluster = _.clone(_this.imgs[0]);
                cluster.set({
                    top: options.top,
                    left: options.left,
                    scaleX: options.width / cluster.width,
                    scaleY: options.height / cluster.height
                });
                drawObj.cluster = cluster;
            }
            var box = {
                openWidth: offset.width,
                openHeight: offset.height,
            };
            if (open && r.hostList && r.hostList.length > 0) {
                // 是否渲染服务器
                var _a = _this.drawGroup(r.hostList, {
                    left: options.left,
                    top: options.top,
                    width: _this.subBox.width,
                    height: _this.subBox.height,
                }, {
                    type: 'subNode',
                    parentData: r,
                }), subsGroup = _a.groups, subsGroupBox = _a.groupBox;
                box.openWidth = subsGroupBox.width > box.openWidth ? subsGroupBox.width : box.openWidth;
                box.openHeight = subsGroupBox.height > box.openHeight ? subsGroupBox.height : box.openHeight;
                options.width = open ? box.openWidth : offset.width;
                options.height = open ? box.openHeight : offset.height;
                // 拿到最新值
                cluster.set(options);
                var intranetOptions = {
                    top: options.top - _this.subBox.height / 2,
                    left: options.left + options.width / 3 - _this.subBox.width / 2,
                    width: _this.subBox.width,
                    height: _this.subBox.height,
                };
                var intranetBox = _this.computeBox(intranetOptions).labelBox;
                var intranet = _.clone(_this.imgs[0]);
                intranet.set({
                    top: intranetOptions.top,
                    left: intranetOptions.left,
                    scaleX: intranetOptions.width / intranet.width,
                    scaleY: intranetOptions.height / intranet.height
                });
                var intranetLabel = _this.drawText('内网', __assign({}, intranetBox, { originX: 'center', originY: 'top' }));
                var internetOptions = {
                    top: options.top - _this.subBox.height / 2,
                    left: options.left + options.width / 3 * 2 - _this.subBox.width / 2,
                    width: _this.subBox.width,
                    height: _this.subBox.height,
                };
                var internetBox = _this.computeBox(internetOptions).labelBox;
                var internet = _.clone(_this.imgs[0]);
                internet.set({
                    top: internetOptions.top,
                    left: internetOptions.left,
                    scaleX: internetOptions.width / intranet.width,
                    scaleY: internetOptions.height / intranet.height
                });
                var internetLabel = _this.drawText('外网', __assign({}, internetBox, { originX: 'center', originY: 'top' }));
                drawObj.network = [intranet, intranetLabel, internet, internetLabel];
                drawObj.subsGroup = subsGroup;
                groupSubsGroup = subsGroup;
            }
            objGroupBox.width = options.width > objGroupBox.width ? options.width : objGroupBox.width;
            objGroupBox.height = options.height > objGroupBox.height ? options.height : objGroupBox.height;
            objGroupBox.sumWidth = options.left + options.width > objGroupBox.sumWidth ? options.left + options.width : objGroupBox.sumWidth;
            objGroupBox.sumHeight = options.top + options.height > objGroupBox.sumHeight ? options.top + options.height : objGroupBox.sumHeight;
            var _b = _this.computeBox(options), titleBox = _b.titleBox, lineBox = _b.lineBox, totalBox = _b.totalBox, labelBox = _b.labelBox;
            if (keys.type === 'sourceNode') {
                var title = _this.drawText(r.groupName, __assign({}, titleBox, { originX: 'center', originY: 'center', visible: !open }));
                drawObj.title = title;
                var line = _this.drawPath(lineBox, {
                    fill: 'transparent',
                    stroke: '#999',
                    visible: !open,
                });
                drawObj.line = line;
                var count_1 = 0;
                if (r.hostList) {
                    r.hostList.forEach(function (hosts) {
                        hosts.forEach(function (obj) {
                            count_1++;
                        });
                    });
                }
                var total = _this.drawText("" + count_1, __assign({}, totalBox, { originX: 'center', originY: 'center', visible: !open }));
                drawObj.total = total;
            }
            var label = _this.drawText(keys.type === 'sourceNode' ? "" + r.labelName : "" + r.hostName, __assign({}, labelBox, { originX: 'center', originY: 'top' }));
            drawObj.label = label;
            var clusterGroup = new fabric_1.fabric.Group(_.flattenDeep(_.toArray(drawObj)), {
                // 禁止四点定位
                hasControls: false,
                objectCaching: false,
            });
            // if (groupSubsGroup.length > 0) {
            //     drawObj.subsGroup = groupSubsGroup;
            // }
            clusterGroup.borderColor = 'transparent';
            clusterGroup['open'] = open;
            clusterGroup['drawObj'] = drawObj;
            clusterGroup['sourceData'] = r;
            clusterGroup['sourceDataIndex'] = i;
            clusterGroup['sourceGroup'] = sourceGroup;
            clusterGroup['keys'] = keys;
            clusterGroup['initBox'] = {
                minLeft: clusterGroup.left - _this.groupBox.offset.left,
                minTop: clusterGroup.top - _this.groupBox.offset.top,
                maxLeft: clusterGroup.left + clusterGroup.width + _this.groupBox.offset.left * 2,
                maxTop: clusterGroup.top + clusterGroup.height + _this.groupBox.offset.top * 2,
            };
            if (keys.type === 'sourceNode') {
                _this.canvas.add(clusterGroup);
                _.flattenDeep(groupSubsGroup).forEach(function (sub) {
                    _this.canvas.add(sub);
                });
            }
            options.left = options.left + options.width + _this.groupBox.offset.left;
            options.width = offset.width;
            options.height = offset.height;
            return clusterGroup;
        });
        return { objGroup: objGroup, objGroupBox: objGroupBox };
    };
    ServerView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: 'canvasBox' },
            React.createElement(button_1.Button.Group, null,
                React.createElement(button_1.Button, { icon: 'plus', onClick: function () { return _this.zoomInOut(0.1); } }),
                React.createElement(button_1.Button, { icon: 'minus', onClick: function () { return _this.zoomInOut(-0.1); } })),
            React.createElement(button_1.Button, { icon: this.fullscreen ? 'arrows-alt' : 'shrink', onClick: function () { return _this.launchFullscreen(document.getElementById('canvasBox')); } }),
            React.createElement("canvas", { id: 'an' })));
    };
    // 全屏模式
    ServerView.prototype.launchFullscreen = function (element) {
        if (this.fullscreen) {
            var doc = document;
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            this.fullscreen = false;
            return;
        }
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }
        this.fullscreen = true;
    };
    /**
     * 取消高亮对象
     */
    ServerView.prototype.deActiveObject = function () {
        this.clusterGroups.forEach(function (cluster, i) {
            cluster.forEach(function (obj) {
                obj['drawObj']['cluster'].set({
                    stroke: '#999',
                });
                (obj.paths || []).forEach(function (path) {
                    path.set({
                        fill: '',
                        stroke: '#000',
                    });
                });
            });
        });
        this.canvas.renderAll();
    };
    // 画四方形
    ServerView.prototype.drawRect = function (option) {
        if (option === void 0) { option = {}; }
        var rect = new fabric_1.fabric.Rect(Object.assign({}, {
            // 填充色
            fill: '#fff',
            // 边框
            strokeWidth: 1,
            stroke: "#999",
            // 圆角
            // rx: 10,
            // ry: 10,
            // 旋转
            // angle: 45,
            // 禁止四点定位
            hasControls: false,
            // 禁止选中
            selectable: false,
            // 禁用缓存
            objectCaching: false,
        }, option));
        return rect;
    };
    // 画路径线
    ServerView.prototype.drawPath = function (path, option) {
        if (path === void 0) { path = ''; }
        if (option === void 0) { option = {}; }
        var pathLine = new fabric_1.fabric.Path(path, Object.assign({}, {
            // 边框
            // stroke: 'black',
            // 禁止四点定位
            hasControls: false,
            // 禁止选中
            selectable: false,
            // 禁用缓存
            objectCaching: false,
            // 禁用事件
            evented: false,
        }, option));
        return pathLine;
    };
    // 画文案
    ServerView.prototype.drawText = function (str, option) {
        if (option === void 0) { option = {}; }
        var text = new fabric_1.fabric.Text(str, Object.assign({}, {
            // 字体对其方式
            // originX: 'left',
            // originY: 'top',
            // 字体描边
            stroke: '#000',
            // 字体大小
            fontSize: 12,
            // 填充色
            fill: 'transparent',
            // 禁止四点定位
            hasControls: false,
            // 禁止选中
            selectable: false,
        }, option));
        return text;
    };
    // 画图片
    ServerView.prototype.drawImg = function (url, option) {
        var _this = this;
        if (option === void 0) { option = {}; }
        fabric_1.fabric.Image.fromURL(url, function (img) {
            img.set(Object.assign({}, {
                // 禁止四点定位
                hasControls: false,
                // 禁止选中
                selectable: false,
            }, option));
            _this.imgs.push(img);
        });
    };
    ServerView = __decorate([
        radium_1.Radium
    ], ServerView);
    return ServerView;
}(React.Component));
exports.Server = react_router_dom_1.withRouter(ServerView);
//# sourceMappingURL=index.js.map
});
___scope___.file("common/antd/button.js", function(exports, require, module, __filename, __dirname){

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("antd/lib/button/style/css");
require("~/common/antd/default-style.css");
exports.Button = require('antd/lib/button');
//# sourceMappingURL=button.js.map
});
return ___scope___.entry = "statistics/index.jsx";
});
var $fsmp$ = (function() {

    function loadRemoteScript(url) {
        return Promise.resolve().then(function() {
            if (FuseBox.isBrowser) {
                let d = document;
                var head = d.getElementsByTagName("head")[0];
                var target;
                if (/\.css$/.test(url)) {
                    target = d.createElement("link");
                    target.rel = "stylesheet";
                    target.type = "text/css";
                    target.href = url;
                } else {
                    target = d.createElement("script");
                    target.type = "text/javascript";
                    target.src = url;
                    target.async = true;
                }
                head.insertBefore(target, head.firstChild);
            }
        });
    }

    function request(url, cb) {
        if (FuseBox.isServer) {
            try {
                if ( /^http(s)?\:/.test(url)){
                    return require("request")(url, function (error, response, body) {
                        if(error){ return cb(error); }
                        return cb(null, body, response.headers['content-type']);
                      });
                }
                if (/\.(js|json)$/.test(url)) {
                    cb(null, require(url))
                } else {
                    cb(null, require("fs")
                        .readFileSync(require("path")
                            .join(__dirname, url)).toString());
                }

            } catch (e) { cb(e) }
        } else {
            var request = new XMLHttpRequest();
            request.onreadystatechange = function() {
                var err;
                if (this.readyState == 4) {
                    if (this.status !== 200) {
                        err = { code: this.status, msg: this.statusText }
                    }
                    cb(err, this.responseText, request.getResponseHeader("Content-Type"));
                }
            };
            request.open("GET", url, true);
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.send();
        }
    }

    function evaluateModule(id, code) {
        var fn = new Function('module', 'exports', code);
        var moduleExports = {};
        var moduleObject = { exports: moduleExports };
        fn(moduleObject, moduleExports);
        return moduleObject.exports;
    }

    return function(id) {

        return new Promise(function(resolve, reject) {
            if (FuseBox.exists(id)) {
                return resolve(FuseBox.import(id));
            }

            var isCSS = /\.css$/.test(id);
            if (FuseBox.isServer) {
                if (isCSS) {
                    return reject("Can't load CSS on server!");
                }
            }
            // id.charCodeAt(4) = : which means http
            if (FuseBox.isBrowser) {
                if ((name.charCodeAt(4) === 58 || name.charCodeAt(5) === 58) || isCSS) {
                    return loadRemoteScript(id);
                }
            }
            var splitConfig = FuseBox.global("__fsbx__bundles__");

            if (splitConfig && splitConfig.bundles) {
                if (splitConfig.bundles[id]) {
                    return resolve(FuseBox.import("~/" + splitConfig.bundles[id].main))
                }
            }

            request(id, function(error, contents, type) {
                if (error) {
                    return reject(error);
                }
                var data;

                if (type) {
                    if (/javascript/.test(type)) {
                        data = evaluateModule(id, contents);
                    } else if (/json/.test(type)) {
                        data = JSON.parse(contents);
                    } else if (!/javascript/.test(type)) {
                        data = contents;
                    } else {
                        data = contents;
                    }
                } else {
                    data = contents;
                }

                return resolve(data);
            });
        });
    };
})();
if (FuseBox.isBrowser) {
    window.$fsmp$ = $fsmp$;
}


FuseBox.import("default/statistics/index.jsx");
FuseBox.main("default/statistics/index.jsx");
})
(FuseBox)
//# sourceMappingURL=app.js.map