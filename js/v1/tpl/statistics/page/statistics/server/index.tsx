import { Radium } from 'common/radium';
import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { fabric } from 'fabric';
import { IRectOptions, Point, IPathOptions, TextOptions } from 'fabric/fabric-impl';

@Radium
class ServerView extends React.Component<RouteComponentProps<any>, {}> {
    private PROPORTION = { width: 1, height: 1 };
    private canvas: fabric.Canvas;
    private lastPos: { x: number, y: number } = { x: 0, y: 0 };
    private drag: boolean = false;

    private sourceData: any[][] = [
        [
            {
                id: 1,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
            {
                id: 2,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
            {
                id: 3,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
        ],
        [
            {
                id: 4,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
            {
                id: 5,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
            {
                id: 6,
                subData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
            },
        ],
    ];

    private clusterGroups: Array<Array<fabric.Group>> = [];
    private openCluster: any[] = [];

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
        this.drawClusterGroup();
        this.subscriptionEvent();
        // this.linkRect();
    }

    /** 链接关系 */
    private linkRect() {
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

    /** 渲染顶级框 */
    private drawClusterGroup() {
        const offset = {
            left: 100,
            top: 50,
        };

        this.clusterGroups = this.sourceData.map((r, i) => {
            offset.top = offset.top + i * 150;
            return this.drawCluster(r, offset);

        });
    }

    /** 渲染集群 */
    private drawCluster(sourceGroup: any[], offset: { left: number; top: number }) {
        const options: IRectOptions = {
            top: offset.top,
            left: offset.left,
        };

        return sourceGroup.map((r, i) => {
            const box = {
                initWidth: 100,
                initHeight: 100,
                openWidth: 300,
                openHeight: 300,
            };

            const open = _.findIndex(this.openCluster, oc => oc.id === r.id) !== -1;
            options.width = open ? box.openWidth : box.initWidth;
            options.height = open ? box.openHeight : box.initHeight;

            const cluster: fabric.Rect = this.drawRect({
                ...options,
                rx: 10,
                ry: 10,
            });
            const { titleBox, lineBox, totalBox } = this.computeBox(options);

            const title = this.drawText(
                '集群',
                {
                    ...titleBox,
                    originX: 'center',
                    originY: 'center',
                    visible: !open,
                },
            );

            const line = this.drawPath(
                lineBox,
                {
                    fill: 'transparent',
                    stroke: '#999',
                    visible: !open,
                },
            );

            const total = this.drawText(
                `${r.id}`,
                {
                    ...totalBox,
                    originX: 'center',
                    originY: 'center',
                    visible: !open,
                },
            );

            const subsGroup = this.drawSubsRect(r.subData, options, open);
            const clusterGroup = new fabric.Group([cluster, title, line, total, subsGroup], {
                // 禁止四点定位
                hasControls: false,
            });

            clusterGroup.borderColor = 'transparent';

            clusterGroup['open'] = open;
            clusterGroup['box'] = box;
            clusterGroup['drawObj'] = { cluster, title, line, total, subsGroup };
            clusterGroup['sourceData'] = r;

            this.canvas.add(clusterGroup);

            options.left = options.left + options.width + 30;

            return clusterGroup;
        });
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
        };
    }

    /** 渲染子集 */
    private drawSubsRect(data: any[], options: IRectOptions, open: boolean) {
        const subs = data.map((r: any, i: number) => {
            let top = options.top + 8 + Math.floor(i / 9) * 50;
            let left = options.left + 8 + i % 9 * 30;
            const rect: fabric.Rect = this.drawRect({
                left,
                top,
                width: 20,
                height: 20,
            });

            const text = this.drawText(
                `${r}`,
                {
                    left,
                    top,
                },
            );

            const group: any = new fabric.Group([rect, text]);
            group['text'] = text;
            group['sourceData'] = r;

            return group;
        });
        const subsgroup = new fabric.Group([...subs], {
            visible: open,
        });
        subsgroup['subs'] = subs;

        return subsgroup;
    }

    render() {
        return (
            <div>
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
        this.clusterGroups.forEach((cluster, i) => {
            cluster.forEach((obj) => {
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
        this.drawClusterGroup();

        // const { cluster, title, line, total, subsGroup } = obj.drawObj;

        // const box = {
        //     width: obj.open ? obj.box.initWidth : obj.box.openWidth,
        //     height: obj.open ? obj.box.initHeight : obj.box.openHeight,
        // };

        // 集群
        // cluster.set(box);

        // const { titleBox, lineBox, totalBox } = this.computeBox({
        //     ...box,
        //     left: cluster.left,
        //     top: cluster.top,
        // });

        // // 集群标题
        // title.set({
        //     ...titleBox,
        //     visible: !title.visible
        // });
        // // 中界线
        // line.set({
        //     // ...lineBox,
        //     path: lineBox,
        //     visible: !line.visible
        // });
        // // 服务器数量
        // total.set({
        //     ...totalBox,
        //     visible: !total.visible
        // });

        // // 服务器
        // subsGroup.visible = !subsGroup.visible;

        // // 修正四点定位
        // obj.setCoords();
        // this.canvas.renderAll();
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
