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

    private topRectGroups: Array<fabric.Group> = [];

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
        this.drawTopRect();
        this.subscriptionEvent();
        this.linkRect();
    }

    /** 链接关系 */
    linkRect() {
        const pathString: {
            fromX: number;
            fromY: number;
            toX: number;
            toY: number;
            theta: number;
            headlen: number;
        } = {
            fromX: this.topRectGroups[0].left + this.topRectGroups[0].width,
            fromY: this.topRectGroups[0].top + this.topRectGroups[0].height / 2,
            toX: this.topRectGroups[1].left,
            toY: this.topRectGroups[1].top + this.topRectGroups[1].height / 2,
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
    subscriptionEvent() {
        this.canvas.on({
            'mouse:dblclick': (e: fabric.IEvent | any) => {
                if (e.target && e.target['topRect']) {
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
                if (e.target && e.target['topRect']) {
                    e.target['topRect'].set({
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
    drawTopRect() {
        const offset = {
            left: 100,
            top: 50,
        };

        let options = {
            top: offset.top,
            left: offset.left,
            width: 100,
            height: 100,
        };

        this.topRectGroups = [1, 2, 3].map((r, i) => {
            options = {
                // top: offset.top + Math.floor(i / 10) * 50,
                top: offset.top,
                left: offset.left + i * 130,
                width: 100,
                height: 100,
            };

            const topRect: fabric.Rect = this.drawRect({
                ...options,
                rx: 10,
                ry: 10,
            });

            const titleText = this.drawText(
                '集群',
                {
                    left: options.left + options.width / 2,
                    top: options.top + options.height / 2 - 15,
                    originX: 'center',
                    originY: 'center',
                    visible: true,
                },
            );

            const line = this.drawPath(
                `M ${options.left + 10} ${options.top + options.height / 2} 
                L ${options.left + options.width - 10} ${options.top + options.height / 2}`,
                {
                    fill: 'transparent',
                    stroke: '#999',
                    visible: true,
                },
            );

            const numberText = this.drawText(
                '20',
                {
                    left: options.left + options.width / 2,
                    top: options.top + 15 + options.height / 2,
                    originX: 'center',
                    originY: 'center',
                    visible: true,
                },
            );

            const subsGroup = this.drawSubsRect(options);
            const topRectGroup = new fabric.Group([topRect, titleText, line, numberText, subsGroup], {
                // 禁止四点定位
                hasControls: false,
            });

            topRectGroup.borderColor = 'transparent';

            topRectGroup['topRect'] = topRect;
            topRectGroup['description'] = [titleText, line, numberText];
            topRectGroup['subsGroup'] = subsGroup;

            this.canvas.add(topRectGroup);
            return topRectGroup;
        });
    }

    /** 渲染子集框 */
    drawSubsRect(options: { left: number; top: number; width: number; height: number }) {
        const subs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((r: any, i: number) => {
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

            return group;
        });
        const subsgroup = new fabric.Group([...subs], {
            scaleX: 1 / 3,
            scaleY: 1 / 3,
            visible: false
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
        this.topRectGroups.forEach((obj, i) => {
            if (obj['topRect'].set) {
                obj['topRect'].set({
                    stroke: '#999',
                })
            }
        });
        this.canvas.renderAll();
    }

    // 对象显示隐藏
    private showHide = (obj: any) => {
        obj.set({
            scaleX: obj.scaleX === 1 ? 3 : 1,
            scaleY: obj.scaleY === 1 ? 3 : 1,
        });

        // 隐藏显示集群信息
        obj['description'].forEach((o: any) => {
            o.visible = !o.visible;
            if (o.text && typeof o.text === 'object') {
                o.text.visible = !o.text.visible;
            }
        });

        // 隐藏显示服务器
        obj['subsGroup'].visible = !obj['subsGroup'].visible;

        // 修正四点定位
        obj.setCoords();

        this.canvas.renderAll();
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
                // 缩放
                // scaleX: 3,
                // scaleY: 3,
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
