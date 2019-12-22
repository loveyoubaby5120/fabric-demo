import { Radium } from 'common/radium';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { fabric } from 'fabric';
import { IRectOptions, Point, IPathOptions, TextOptions, ITriangleOptions, ILineOptions } from 'fabric/fabric-impl';
import { Button } from 'common/antd/button';

@Radium
class ServerView extends React.Component<RouteComponentProps<any>, {}> {
    // 渲染缩放比例
    private PROPORTION = { width: 1, height: 1 };

    private canvas: fabric.Canvas;

    // 拖拽位置
    private lastPos: { x: number, y: number } = { x: 0, y: 0 };
    // 是否可拖拽
    private drag: boolean = false;

    // 数据
    private sourceData: any[][] = [
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

    private clusterGroups: Array<Array<fabric.Group>> = [];
    private openCluster: any[] = [{ id: 1 }];

    // 画布缩放比例
    private zoom: number = 1;
    private max_zoom: number = 10;
    private min_zoom: number = 0.1;

    // 全屏
    private fullscreen: boolean = false;

    // 集群大小偏移量
    private groupBox: { left: number, top: number, width: number, height: number, offset: { left: number, top: number } } = {
        left: 100,
        top: 50,
        width: 200,
        height: 200,
        offset: {
            // left: 30,
            // top: 50,
            left: 100,
            top: 150,
        },

    };

    // 服务器大小
    private subBox: { width: number, height: number, offset: { left: number, top: number } } = {
        width: 50,
        height: 50,
        offset: {
            left: 20,
            top: 70,
        },
    };

    // 图片url
    private imgUrls: string[] = [
        'https://cdn.pixabay.com/photo/2019/12/08/01/08/winter-4680354__340.jpg',
    ];

    // 图片fabric对象
    private imgs: fabric.Image[] = [];

    // pathfabric对象
    private paths: fabric.Path[] = [];

    /**
     * 获取文档的大小
     */
    get clientRect() {
        const width = document.documentElement.clientWidth
        const height = document.documentElement.clientHeight
        return {
            width,
            height
        }
    }

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas('an', {
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
    }

    createImgObj() {
        this.imgUrls.forEach((url: string) => {
            this.drawImg(url, {});
        });
    }

    // 创建图片定时器
    createImg() {
        setTimeout(() => {
            if (this.imgs.length > 0) {
                this.initRender();
            } else {
                this.createImg();
            }
        }, 1000);
    }

    /**
     * `mousewheel`事件处理
     */
    private handleMousewheel = (e: any) => {
        const { canvas } = this;
        const factor = 40
        let delta = e.deltaY;
        let zoom = canvas.getZoom();
        delta = delta < -factor ? -factor : delta > factor ? factor : delta
        zoom = zoom - delta / 200;

        zoom = Math.max(this.min_zoom, zoom);
        zoom = Math.min(this.max_zoom, zoom);
        const zoomPoint = new fabric.Point(e.offsetX, e.offsetY);

        canvas.zoomToPoint(zoomPoint, zoom);

        this.zoom = zoom
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * 滚轮缩放
     * @param {Number} dir
     */
    zoomInOut(dir: number) {
        const { width, height } = this.getCanvasSize();
        let zoom = this.canvas.getZoom() + dir;
        zoom = Math.max(this.min_zoom, zoom);
        zoom = Math.min(this.max_zoom, zoom);
        const zoomPoint = new fabric.Point(width / 2, height / 2);
        this.canvas.zoomToPoint(zoomPoint, zoom);
        this.zoom = zoom;
    }

    private initRender = () => {
        const { groups } = this.drawGroup(
            this.sourceData,
            { ...this.groupBox },
            { type: 'sourceNode' }
        );
        this.clusterGroups = groups;

        this.linkObj(this.clusterGroups[0][0], this.clusterGroups[1][0], false, true);
        this.linkObj(this.clusterGroups[0][0], this.clusterGroups[1][0], true, false);
    }

    /** 创建链接关系 */
    private linkObj = (fromObj: any, toObj: any, fromArrows: boolean, toArrows: boolean) => {
        const pathConfig: {
            fromX: any;
            fromY: any;
            toX: any;
            toY: any;
            fromArrows: boolean;
            toArrows: boolean;
        } = {
            fromX: fromObj.left + fromObj.width,
            fromY: fromObj.top + this.clusterGroups[0][0].height / 2,
            toX: toObj.left + toObj.width,
            toY: toObj.top + toObj.height / 2,
            fromArrows,
            toArrows,
        };
        const drapPath = this.linkPath(pathConfig);

        const path: any = this.drawPath(
            drapPath.join(' '),
            {
                fill: '',
                stroke: '#000',
                objectCaching: false,
            }
        );

        path.isMouseInLine = this.verifyLink(pathConfig);

        path.index = this.paths.length;

        path.pathConfig = pathConfig;

        path.objs = {
            fromObj,
            toObj,
        };

        if (!fromObj.paths) {
            fromObj.paths = [path];
        } else {
            fromObj.paths.push(path);
        }

        if (!toObj.paths) {
            toObj.paths = [path];
        } else {
            toObj.paths.push(path);
        }

        this.paths.push(path);

        this.canvas.add(path);
    }

    twoBezier(t: number, p1: { x: number, y: number }, cp: { x: number, y: number }, p2: { x: number, y: number }): { x: number, y: number } {
        const { x: x1, y: y1 } = p1;
        const { x: cx, y: cy } = cp;
        const { x: x2, y: y2 } = p2;
        const x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2;
        const y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
        return { x, y };
    }

    // 生成校验点线函数
    private verifyLink = (pathConfig: {
        fromX: any;
        fromY: any;
        toX: any;
        toY: any;
        fromArrows: boolean;
        toArrows: boolean;
    }) => {

        const drapPath = this.linkPath(pathConfig);

        let Bezier = [];
        drapPath.forEach(path => {
            if (path.indexOf('Q') !== -1) {
                Bezier = path.split(' ');
            }
        });
        const maxNumberX = Math.abs(pathConfig.fromX - pathConfig.toX);
        const maxNumberY = Math.abs(pathConfig.fromY - pathConfig.toY);

        const bezierPointe = [];
        const maxNumber = maxNumberX > maxNumberX ? maxNumberX : maxNumberY;

        for (let i = 0; i < maxNumber; i++) {
            bezierPointe.push(this.twoBezier(
                i / maxNumber,
                {
                    x: pathConfig.fromX,
                    y: pathConfig.fromY,
                },
                {
                    x: Bezier[1],
                    y: Bezier[2],
                },
                {
                    x: pathConfig.toX,
                    y: pathConfig.toY,
                },
            ));
        }

        return (mouse: { x: number, y: number }) => {
            let exist = false;
            bezierPointe.forEach((bp: { x: number, y: number }) => {
                const x = mouse.x - bp.x * this.zoom;
                const y = mouse.y - bp.y * this.zoom;
                const distance = Math.sqrt(x * x + y * y);
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
    }

    /**
     * canvas 事件监听
     */
    private subscriptionEvent() {
        this.canvas.on({
            'mouse:dblclick': (e: fabric.IEvent | any) => {
                if (e.target && e.target['drawObj']) {
                    this.showHide(e.target);
                }
            },
            'mouse:down': (e: fabric.IEvent | any) => {
                this.lastPos = {
                    x: e.e.clientX,
                    y: e.e.clientY
                };
                if (!e.target) {
                    this.drag = true;
                }

                this.deActiveObject();

                let activePath = [];

                const vpt = this.canvas.viewportTransform;

                var mouse = {
                    x: e.pointer.x - vpt[4],
                    y: e.pointer.y - vpt[5],
                };

                this.paths.forEach((path: any) => {
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
                        this.canvas.renderAll();
                    }
                });

                if (activePath.length > 0) {
                    console.log(activePath);
                    return;
                }

                if (e.target && e.target['drawObj']) {
                    (e.target.paths || []).forEach((path: any) => {
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
                    this.canvas.renderAll();
                }
            },
            'mouse:up': (e: fabric.IEvent | any) => {
                this.drag = false;
                if (!(e.target && e.target['drawObj'])) {
                    return
                }

                // console.log(e.e.clientX, e.e.clientY, e.target.initBox);

                // console.log(e.e.clientX >= e.target.initBox.minLeft);
                // console.log(e.e.clientX <= e.target.initBox.maxLeft);
                // console.log(e.e.clientY >= e.target.initBox.minTop);
                // console.log(e.e.clientY <= e.target.initBox.maxTop);

                if (
                    e.e.clientX >= e.target.initBox.minLeft &&
                    e.e.clientX <= e.target.initBox.maxLeft &&
                    e.e.clientY >= e.target.initBox.minTop &&
                    e.e.clientY <= e.target.initBox.maxTop
                ) {
                    return;
                }

                const clusterA = {
                    x: e.target.left + e.target.width / 2,
                    y: e.target.top + e.target.height / 2,
                };

                // 距离对象最近的对象
                let minDistanceObj: any;
                let minDistance: number = 9999999999999999999999999;

                // 位置：默认在对象前面
                let position = 'left';

                this.clusterGroups.forEach((groups: any) => {
                    groups.forEach((cluster: any) => {
                        if (e.target.sourceData.id !== cluster.sourceData.id) {
                            const clusterB = {
                                x: cluster.left + cluster.width / 2,
                                y: cluster.top + cluster.height / 2,
                            };
                            const x = clusterA.x - clusterB.x;
                            const y = clusterA.y - clusterB.y;

                            // 计算两个坐标点记录
                            const distance = Math.sqrt(x * x + y * y);

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
                    position,
                    minDistanceObjId: minDistanceObj.sourceData.id,
                    minDistanceObjIndex: minDistanceObj.sourceDataIndex,
                });
            },
            'mouse:move': (e: fabric.IEvent | any) => {
                const vpt = this.canvas.viewportTransform;
                if (this.drag) {
                    this.canvas.setViewportTransform([
                        ...vpt.slice(0, 4),
                        vpt[4] + e.e.clientX - this.lastPos.x,
                        vpt[5] + e.e.clientY - this.lastPos.y,
                    ]);
                    this.lastPos.x = e.e.clientX;
                    this.lastPos.y = e.e.clientY;
                }

                var mouse = {
                    x: e.pointer.x - vpt[4],
                    y: e.pointer.y - vpt[5],
                };

                this.deActiveObject();
                this.paths.forEach((path: any) => {
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
                        this.canvas.renderAll();
                    }
                });
            },
            'object:moving': (e: fabric.IEvent | any) => {
                (e.target.paths || []).forEach((path: any) => {
                    const { fromObj, toObj } = path.objs;
                    const pathConfig = {
                        fromX: fromObj.left + fromObj.width,
                        fromY: fromObj.top + this.clusterGroups[0][0].height / 2,
                        toX: toObj.left + toObj.width,
                        toY: toObj.top + toObj.height / 2,
                        fromArrows: path.pathConfig.fromArrows,
                        toArrows: path.pathConfig.toArrows,
                    };
                    var pathObject = new fabric.Path(this.linkPath(pathConfig).join(' '));

                    path.pathConfig = pathConfig;
                    path.isMouseInLine = this.verifyLink(pathConfig);

                    path.set({
                        path: pathObject.path,
                        fill: '',
                        stroke: 'rgba(0, 0, 255, 0.4)',
                        objectCaching: false,
                    });
                });

                this.canvas.renderAll();
            },
        });
    }

    /** 渲染组 */
    private drawGroup(
        sourceData: any[],
        offset: IRectOptions,
        keys: { [key: string]: any },
    ): {
        groups: fabric.Group[][];
        groupBox: { top?: number, left?: number, height: number, width: number };
    } {
        let initTop = offset.top;

        const groupBox = {
            width: 0,
            height: 0,
        };

        let subOffset = {
            left: 0,
            top: 0,
        };

        if (keys.type !== 'sourceNode') {
            subOffset = this.subBox.offset;
            initTop = offset.top - (30 + this.subBox.offset.top);
        }

        const groups = sourceData.map((r, i) => {
            const { objGroup, objGroupBox } = this.drawObj(
                r,
                {
                    width: offset.width,
                    height: offset.height,
                    top: offset.top + subOffset.top,
                    left: offset.left + subOffset.left,
                },
                keys);

            offset.top = offset.top + objGroupBox.height + this.groupBox.offset.top;
            groupBox.width = objGroupBox.sumWidth > groupBox.width ? objGroupBox.sumWidth : groupBox.width;
            groupBox.height = objGroupBox.sumHeight > groupBox.height ? objGroupBox.sumHeight : groupBox.height;

            return objGroup;
        });

        return {
            groups,
            groupBox: {
                width: groupBox.width - offset.left + subOffset.left,
                height: groupBox.height - initTop,
            }
        };
    }

    /** 渲染子 */
    private drawObj(sourceGroup: any[], offset: IRectOptions, keys: { [key: string]: any }) {
        const options: IRectOptions = {
            ...offset
        };

        // 计算group box的max box
        const objGroupBox = {
            ...offset,
            sumWidth: 0,
            sumHeight: 0,
        };

        const objGroup = sourceGroup.map((r, i) => {
            // 是否展开
            const open = _.findIndex(this.openCluster, oc => oc.id === r.id) !== -1 && keys.type === 'sourceNode';
            const drawObj: any = {};
            let cluster: any;
            if (keys.type === 'sourceNode') {
                // 初始化画框
                cluster = this.drawRect({
                    ...options,
                    rx: 10,
                    ry: 10,
                });

                drawObj.cluster = cluster;
            } else {
                cluster = _.clone(this.imgs[0]);
                cluster.set({
                    top: options.top,
                    left: options.left,
                    scaleX: options.width / cluster.width,
                    scaleY: options.height / cluster.height
                });
                drawObj.cluster = cluster;
            }

            const box = {
                openWidth: offset.width,
                openHeight: offset.height,
            };

            if (open && r.hostList && r.hostList.length > 0) {
                // 是否渲染服务器
                const { groups: subsGroup, groupBox: subsGroupBox } = this.drawGroup(
                    r.hostList,
                    {
                        left: options.left,
                        top: options.top,
                        width: this.subBox.width,
                        height: this.subBox.height,
                    },
                    { type: 'subNode' },
                );

                box.openWidth = subsGroupBox.width > box.openWidth ? subsGroupBox.width : box.openWidth;
                box.openHeight = subsGroupBox.height > box.openHeight ? subsGroupBox.height : box.openHeight;

                options.width = open ? box.openWidth : offset.width;
                options.height = open ? box.openHeight : offset.height;

                // 拿到最新值
                cluster.set(options);

                const intranetOptions = {
                    top: options.top - this.subBox.height / 2,
                    left: options.left + options.width / 3 - this.subBox.width / 2,
                    width: this.subBox.width,
                    height: this.subBox.height,
                };

                const { labelBox: intranetBox } = this.computeBox(intranetOptions);

                const intranet = _.clone(this.imgs[0]);
                intranet.set({
                    top: intranetOptions.top,
                    left: intranetOptions.left,
                    scaleX: intranetOptions.width / intranet.width,
                    scaleY: intranetOptions.height / intranet.height
                });

                const intranetLabel = this.drawText(
                    '内网',
                    {
                        ...intranetBox,
                        originX: 'center',
                        originY: 'top',
                    },
                );

                const internetOptions = {
                    top: options.top - this.subBox.height / 2,
                    left: options.left + options.width / 3 * 2 - this.subBox.width / 2,
                    width: this.subBox.width,
                    height: this.subBox.height,
                };

                const { labelBox: internetBox } = this.computeBox(internetOptions);

                const internet = _.clone(this.imgs[0]);
                internet.set({
                    top: internetOptions.top,
                    left: internetOptions.left,
                    scaleX: internetOptions.width / intranet.width,
                    scaleY: internetOptions.height / intranet.height
                });

                const internetLabel = this.drawText(
                    '外网',
                    {
                        ...internetBox,
                        originX: 'center',
                        originY: 'top',
                    },
                );

                drawObj.network = [intranet, intranetLabel, internet, internetLabel];

                drawObj.subsGroup = subsGroup;
            }

            objGroupBox.width = options.width > objGroupBox.width ? options.width : objGroupBox.width;
            objGroupBox.height = options.height > objGroupBox.height ? options.height : objGroupBox.height;
            objGroupBox.sumWidth = options.left + options.width > objGroupBox.sumWidth ? options.left + options.width : objGroupBox.sumWidth;
            objGroupBox.sumHeight = options.top + options.height > objGroupBox.sumHeight ? options.top + options.height : objGroupBox.sumHeight;

            const { titleBox, lineBox, totalBox, labelBox } = this.computeBox(options);
            if (keys.type === 'sourceNode') {
                const title = this.drawText(
                    r.groupName,
                    {
                        ...titleBox,
                        originX: 'center',
                        originY: 'center',
                        visible: !open,
                    },
                );
                drawObj.title = title;

                const line = this.drawPath(
                    lineBox,
                    {
                        fill: 'transparent',
                        stroke: '#999',
                        visible: !open,
                    },
                );
                drawObj.line = line;

                let count = 0;
                if (r.hostList) {
                    r.hostList.forEach((hosts: any) => {
                        hosts.forEach((obj: any) => {
                            count++;
                        });
                    });
                }

                const total = this.drawText(
                    `${count}`,
                    {
                        ...totalBox,
                        originX: 'center',
                        originY: 'center',
                        visible: !open,
                    },
                );
                drawObj.total = total;
            }

            const label = this.drawText(
                keys.type === 'sourceNode' ? `${r.labelName}` : `${r.hostName}`,
                {
                    ...labelBox,
                    originX: 'center',
                    originY: 'top',
                },
            );

            drawObj.label = label;

            const clusterGroup: any = new fabric.Group(_.flattenDeep(_.toArray(drawObj)), {
                // 禁止四点定位
                hasControls: false,
            });

            clusterGroup.borderColor = 'transparent';

            clusterGroup['open'] = open;
            clusterGroup['drawObj'] = drawObj;
            clusterGroup['sourceData'] = r;
            clusterGroup['sourceDataIndex'] = i;
            clusterGroup['sourceGroup'] = sourceGroup;

            clusterGroup['keys'] = keys;
            clusterGroup['initBox'] = {
                minLeft: clusterGroup.left - this.groupBox.offset.left,
                minTop: clusterGroup.top - this.groupBox.offset.top,
                maxLeft: clusterGroup.left + clusterGroup.width + this.groupBox.offset.left * 2,
                maxTop: clusterGroup.top + clusterGroup.height + this.groupBox.offset.top * 2,
            };

            if (keys.type === 'sourceNode') {
                this.canvas.add(clusterGroup);
            }

            options.left = options.left + options.width + this.groupBox.offset.left;
            options.width = offset.width;
            options.height = offset.height;

            return clusterGroup;
        });

        return { objGroup, objGroupBox };
    }

    /** 计算集群 Box */
    private computeBox = (options: IRectOptions) => {
        return {
            titleBox: {
                left: options.left + options.width / 2,
                top: options.top + options.height / 2 - 15,
            },
            lineBox: `M ${options.left + 10} ${options.top + options.height / 2} L ${options.left + options.width - 10} ${options.top + options.height / 2}`,
            totalBox: {
                left: options.left + options.width / 2,
                top: options.top + 15 + options.height / 2,
            },
            labelBox: {
                left: options.left + options.width / 2,
                top: options.top + options.height + 5,
            },
        };
    }

    render() {
        return (
            <div id='canvasBox'>
                <Button.Group>
                    <Button icon='plus' onClick={() => this.zoomInOut(0.1)} />
                    <Button icon='minus' onClick={() => this.zoomInOut(-0.1)} />
                </Button.Group>
                <Button icon={this.fullscreen ? 'arrows-alt' : 'shrink'} onClick={() => this.launchFullscreen(document.getElementById('canvasBox'))} />
                <canvas id='an'></canvas>
            </div>
        );
    }

    // 全屏模式
    private launchFullscreen(element: any, ) {
        if (this.fullscreen) {
            const doc: any = document;

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
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullScreen();
        }

        this.fullscreen = true;
    }

    /** 链接线 */
    private linkPath = (pathFromAndTo: {
        fromX: number;
        fromY: number;
        toX: number;
        toY: number;
        fromArrows: boolean;
        toArrows: boolean;
    }): string[] => {
        const offset = pathFromAndTo.fromArrows ? 100 : -100;

        const pathConfig = Object.assign({}, pathFromAndTo, {
            theta: 10,
            headlen: 10,
            offset,
        });


        const arrows = pathFromAndTo.toArrows ? this.drawArrows(pathConfig) : [];
        const arrows2 = pathFromAndTo.fromArrows ? this.drawArrows(Object.assign({}, pathConfig, {
            fromX: pathConfig.toX,
            fromY: pathConfig.toY,
            toX: pathConfig.fromX,
            toY: pathConfig.fromY,
        })) : [];

        const q = `Q ${(pathConfig.fromX + pathConfig.toX) / 2 + offset} ${(pathConfig.fromY + pathConfig.toY) / 2}`;

        return [
            ...arrows,
            `M ${pathConfig.fromX} ${pathConfig.fromY}`,
            q,
            ` ${pathConfig.toX} ${pathConfig.toY}`,
            ...arrows2,
        ];
    }

    /** 箭头 */
    private drawArrows = (obj: {
        fromX: number, fromY: number, toX: number, toY: number, theta: number, headlen: number, offset: number
    }): string[] => {
        const { fromX, fromY, toX, toY, theta, headlen, offset } = obj;

        let angle = Math.atan2(fromY - toY, fromX - toX + offset) * 180 / Math.PI;
        let angle1 = (angle + theta) * Math.PI / 180;
        let angle2 = (angle - theta) * Math.PI / 180;
        let topX = headlen * Math.cos(angle1);
        let topY = headlen * Math.sin(angle1);
        let botX = headlen * Math.cos(angle2);
        let botY = headlen * Math.sin(angle2);

        return [
            `M ${toX + topX} ${toY + topY}`,
            `L ${toX} ${toY}`,
            `L ${toX + botX} ${toY + botY}`,
        ];
    }

    /**
     * 取消高亮对象
     */
    private deActiveObject() {
        this.clusterGroups.forEach((cluster: any, i) => {
            cluster.forEach((obj: any) => {
                obj['drawObj']['cluster'].set({
                    stroke: '#999',
                });

                (obj.paths || []).forEach((path: any) => {
                    path.set({
                        fill: '',
                        stroke: '#000',
                    });
                });
            });
        });
        this.canvas.renderAll();
    }

    // 对象显示隐藏
    private showHide = (obj: any) => {
        if (!obj.open) {
            this.openCluster.push(obj.sourceData);
        } else {
            _.remove(this.openCluster, (c) => c.id === obj.sourceData.id);
        }

        this.canvas.remove(...this.canvas.getObjects());
        this.initRender();
    }

    /**
     * 处理window `resize`事件
     * @param factor draw 画布大小计算缩放比例
     */
    private handleWindowResize = (e?: Event, factor = this.PROPORTION) => {
        const { width, height } = this.getCanvasSize(factor);
        this.canvas.setDimensions({
            width,
            height
        });
    }

    /**
     * 获取画布大小
     * @param factor draw 画布大小计算缩放比例
     */
    private getCanvasSize = (factor = this.PROPORTION) => {
        const { width, height } = this.clientRect;

        return {
            width: (width - 188) * factor.width,
            height: (height - 60 * 2) * factor.height
        }
    }

    // 画四方形
    private drawRect(option: IRectOptions = {}): fabric.Rect {
        var rect: fabric.Rect = new fabric.Rect(Object.assign(
            {},
            {
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
            },
            option,
        ));

        return rect;
    }

    // 画路径线
    private drawPath(path: string | Point[] = '', option: IPathOptions = {}): fabric.Path {
        var pathLine: fabric.Path = new fabric.Path(
            path,
            Object.assign(
                {},
                {
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
                },
                option
            )
        );

        return pathLine;
    }

    // 画文案
    private drawText(str: string, option: TextOptions = {}): fabric.Text {
        var text: fabric.Text = new fabric.Text(str, Object.assign(
            {},
            {
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
            },
            option
        ));

        return text;
    }

    // 画图片
    private drawImg(url: string, option: TextOptions = {}) {
        fabric.Image.fromURL(url, (img) => {
            img.set(Object.assign(
                {},
                {
                    // 禁止四点定位
                    hasControls: false,
                    // 禁止选中
                    selectable: false,
                },
                option
            ));
            this.imgs.push(img);
        });
    }
}

export const Server = withRouter(ServerView);
