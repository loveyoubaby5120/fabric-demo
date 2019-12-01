import { Radium } from 'common/radium';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { fabric } from 'fabric';
import { IRectOptions, Point, IPathOptions, TextOptions } from 'fabric/fabric-impl';
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
                id: 1,
                name: 'p1111',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
            {
                id: 2,
                name: 'p2222',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
            {
                id: 3,
                name: 'p3333',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
        ],
        [
            {
                id: 4,
                name: 'p4444',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
            {
                id: 5,
                name: 'p5555',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
            {
                id: 6,
                name: 'p6666',
                subData: [
                    {
                        name: 'a1',
                    },
                    {
                        name: 'a2',
                    },
                    {
                        name: 'a3',
                    },
                    {
                        name: 'a4',
                    },
                    {
                        name: 'a5',
                    },
                    {
                        name: 'a6',
                    },
                    {
                        name: 'a7',
                    },
                    {
                        name: 'a8',
                    },
                    {
                        name: 'a9',
                    },
                    {
                        name: 'a10',
                    },
                    {
                        name: 'a11',
                    },
                    {
                        name: 'a12',
                    },
                    {
                        name: 'a13',
                    },
                    {
                        name: 'a14',
                    },
                    {
                        name: 'a15',
                    },
                    {
                        name: 'a16',
                    },

                ]
            },
        ],
    ];

    private clusterGroups: Array<Array<fabric.Group>> = [];
    private openCluster: any[] = [{ id: 1 }];

    // 画布缩放比例
    private zoom: number = 1;
    private max_zoom: number = 10;
    private min_zoom: number = 0.1;

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
        this.initRender();
        document.getElementById('an').parentNode.addEventListener('mousewheel', this.handleMousewheel)
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
            {
                left: 100,
                top: 50,
                width: 100,
                height: 100,
            },
            { type: 'sourceNode' }
        );
        this.clusterGroups = groups;
        this.linkRect();
    }

    /** 链接关系 */
    private linkRect = () => {
        const pathString: {
            fromX: number;
            fromY: number;
            toX: number;
            toY: number;
            theta: number;
            headlen: number;
        } = {
            fromX: this.clusterGroups[0][0].left + this.clusterGroups[0][0].width,
            fromY: this.clusterGroups[0][0].top + this.clusterGroups[0][0].height / 2,
            toX: this.clusterGroups[1][0].left,
            toY: this.clusterGroups[1][0].top + this.clusterGroups[1][0].height / 2,
            theta: 10,
            headlen: 10,
        };

        const arrows = this.drawArrows(pathString);
        const arrows2 = this.drawArrows(Object.assign({}, pathString, {
            fromX: pathString.toX,
            fromY: pathString.toY,
            toX: pathString.fromX,
            toY: pathString.fromY,
        }));

        const path = this.drawPath(
            `${arrows} 
            M ${pathString.fromX} ${pathString.fromY} 
            L ${pathString.toX} ${pathString.toY} 
             ${arrows2}`,
            {
                stroke: '#000',
                strokeWidth: 1,
            }
        );

        this.canvas.add(path);
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
            },
            'mouse:up': (e: fabric.IEvent | any) => {
                this.drag = false;
                this.deActiveObject();
                if (e.target && e.target['drawObj']) {
                    e.target['drawObj']['cluster'].set({
                        stroke: 'rgba(255, 255, 0, .4)',
                    });
                    this.canvas.renderAll();
                }
            },
            'mouse:move': (e: fabric.IEvent | any) => {
                if (this.drag) {
                    const vpt = this.canvas.viewportTransform;

                    this.canvas.setViewportTransform([
                        ...vpt.slice(0, 4),
                        vpt[4] + e.e.clientX - this.lastPos.x,
                        vpt[5] + e.e.clientY - this.lastPos.y,
                    ]);
                    this.lastPos.x = e.e.clientX;
                    this.lastPos.y = e.e.clientY;
                }
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
        const groupBox = {
            width: 0,
            height: 0,
        };

        const groups = sourceData.map((r, i) => {
            const { objGroup, objGroupBox } = this.drawObj(r, offset, keys);
            offset.top = offset.top + objGroupBox.height + 50;

            groupBox.width = (objGroupBox.sumWidth > groupBox.width ? objGroupBox.sumWidth : groupBox.width) - offset.left / 2;
            groupBox.height = (objGroupBox.sumHeight > groupBox.height ? objGroupBox.sumHeight : groupBox.height) - offset.top / 2;

            return objGroup;
        });
        return { groups, groupBox };
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

            // 初始化画框
            const cluster: fabric.Rect = this.drawRect({
                ...options,
                rx: 10,
                ry: 10,
            });

            drawObj.cluster = cluster;

            const box = {
                openWidth: offset.width,
                openHeight: offset.height,
            };

            if (open && r.subData && r.subData.length > 0) {
                // 是否渲染服务器
                const { groups: subsGroup, groupBox: subsGroupBox } = this.drawGroup(
                    [r.subData],
                    {
                        width: 20,
                        height: 20,
                        left: options.left + 10,
                        top: options.top + 10,
                    },
                    { type: 'subNode' },
                );
                box.openWidth = subsGroupBox.width > box.openWidth ? subsGroupBox.width : box.openWidth;
                box.openHeight = subsGroupBox.height > box.openHeight ? subsGroupBox.height : box.openHeight;

                options.width = open ? box.openWidth : offset.width;
                options.height = open ? box.openHeight : offset.height;

                // 拿到最新值
                cluster.set(options);

                // const subsGroup = this.drawSubsRect(r.subData, Object.assign({}, options, { width: 20, height: 20 }), open);
                drawObj.subsGroup = subsGroup;
            }

            objGroupBox.width = options.width > objGroupBox.width ? options.width : objGroupBox.width;
            objGroupBox.height = options.height > objGroupBox.height ? options.height : objGroupBox.height;
            objGroupBox.sumWidth = options.left + options.width > objGroupBox.sumWidth ? options.left + options.width : objGroupBox.sumWidth;
            objGroupBox.sumHeight = options.top + options.height > objGroupBox.sumHeight ? options.top + options.height : objGroupBox.sumHeight;

            const { titleBox, lineBox, totalBox, labelBox } = this.computeBox(options);
            if (keys.type === 'sourceNode') {
                const title = this.drawText(
                    '集群',
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

                const total = this.drawText(
                    `${r.id}`,
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
                `${r.name}`,
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
            clusterGroup['keys'] = keys;

            if (keys.type === 'sourceNode') {
                this.canvas.add(clusterGroup);
            }

            options.left = options.left + options.width + 30;
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

    /** 渲染子集 */
    private drawSubsRect(data: any[], options: IRectOptions, open: boolean) {
        const subs = data.map((r: any, i: number) => {
            const config = {
                top: options.top + 8 + Math.floor(i / 9) * 50,
                left: options.left + 8 + i % 9 * 30,
                width: options.width,
                height: options.height,
            };

            const rect: fabric.Rect = this.drawRect(config);

            const text = this.drawText(
                `${r.name}`,
                {
                    left: config.left + config.width / 2,
                    top: config.top + config.height + 5,
                    originX: 'center',
                    originY: 'top',
                },
            );

            const group: any = new fabric.Group([rect, text]);
            group['text'] = text;
            group['sourceData'] = r;

            return group;
        });
        const subsGroup: any = new fabric.Group([...subs], {
            visible: open,
        });
        subsGroup['subs'] = subs;

        return subsGroup;
    }

    render() {
        return (
            <div>
                <Button.Group>
                    <Button icon='plus' onClick={() => this.zoomInOut(0.1)} />
                    <Button icon='minus' onClick={() => this.zoomInOut(-0.1)} />
                </Button.Group>
                <canvas id='an'></canvas>
            </div>
        );
    }

    /** 箭头 */
    private drawArrows = (obj: {
        fromX: number, fromY: number, toX: number, toY: number, theta: number, headlen: number
    }): string => {
        const { fromX, fromY, toX, toY, theta, headlen } = obj;

        let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
        let angle1 = (angle + theta) * Math.PI / 180;
        let angle2 = (angle - theta) * Math.PI / 180;
        let topX = headlen * Math.cos(angle1);
        let topY = headlen * Math.sin(angle1);
        let botX = headlen * Math.cos(angle2);
        let botY = headlen * Math.sin(angle2);

        let path = `
            M ${toX + topX} ${toY + topY} 
            L ${toX} ${toY} 
            L ${toX + botX} ${toY + botY}
        `;

        return path;
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

    // 画连接线
    private drawPath(path: string | Point[] = '', option: IPathOptions = {}): fabric.Path {
        var line: fabric.Path = new fabric.Path(
            path || 'M 65 0 Q 100, 100, 200, 0',
            Object.assign(
                {},
                {
                    // 边框
                    stroke: 'black',
                    // 禁止四点定位
                    hasControls: false,
                    // 禁止选中
                    selectable: false,
                    // 鼠标样式
                },
                option
            )
        );

        return line;
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
}

export const Server = withRouter(ServerView);
