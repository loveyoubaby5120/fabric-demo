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
    private drag = false;

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
    }

    // 对象显示隐藏
    showHide = (objs) => {
        objs.forEach((r) => {
            r.visible = !r.visible;
            r.text.visible = !r.text.visible;
        });

        this.canvas.renderAll();
    }

    /**
     * canvas 事件监听
     */
    subscriptionEvent() {
        this.canvas.on({
            'mouse:dblclick': (e) => {
                console.log('dblclick ', e);
                if (e.target && e.target['label'] === 'top') {
                    e.target.set({
                        scaleX: e.target.scaleX === 1 ? 3 : 1,
                        scaleY: e.target.scaleY === 1 ? 3 : 1,
                        hoverCursor: e.target.hoverCursor === 'zoom-out' ? 'zoom-in' : 'zoom-out',
                    });
                    e.target.setCoords();
                    this.showHide(e.target['sub']);
                }

            },
            'mouse:down': (e: any) => {
                this.lastPos = {
                    x: e.e.clientX,
                    y: e.e.clientY
                };
                this.drag = true;
            },
            'mouse:up': (e) => {
                console.log('up ', e);
                this.drag = false;
            },
            'mouse:move': (e: any) => {
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

    // 渲染顶级框
    drawTopRect() {
        let offset = {
            top: 50,
            left: 100,
        };
        [1, 2, 3].forEach((r, i) => {
            offset = {
                top: offset.top + Math.floor(i / 10) * 50,
                left: offset.left + i % 10 * 130,
            };

            const topRect = this.drawRect({
                ...offset,
                width: 100,
                height: 100,
                hoverCursor: 'zoom-in',
            });

            topRect['label'] = 'top';
            this.drawSubRect(topRect, offset);
        });
    }

    // 渲染子集框
    drawSubRect(topRect: fabric.Rect, offset: { left: number; top: number; }) {
        topRect['sub'] = [];
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].forEach((r, i) => {
            let top = offset.top + Math.floor(i / 10) * 50;
            let left = offset.left + i % 10 * 30;
            const rect: any = this.drawRect({
                left,
                top,
                width: 20,
                height: 20,
                visible: false,
            });
            const text = this.drawText(
                r,
                {
                    left,
                    top,
                    visible: false,
                },
            );
            rect.text = text;
            topRect['sub'].push(rect);
        });
        // this.drawPath('M 170 70 Q 160 90 110 100');
    }

    render() {
        return (
            <div>
                <canvas id='an'></canvas>
            </div>
        );
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
                fill: 'transparent',
                width: 50,
                height: 50,
                // 边框
                strokeWidth: 1,
                stroke: "#880E4F",
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
                // 鼠标样式
                hoverCursor: 'default',
            },
            option,
        ));

        this.canvas.add(rect);
        return rect;
    }

    // 画连接线
    private drawPath(path: string | Point[] = '', option: IPathOptions = {}): fabric.Path {
        var line: fabric.Path = new fabric.Path(
            path || 'M 65 0 Q 100, 100, 200, 0',
            Object.assign(
                {},
                {
                    // 填充色
                    fill: '',
                    // 边框
                    stroke: 'black',
                    // 禁止四点定位
                    hasControls: false,
                    // 禁止选中
                    selectable: false,
                    // 鼠标样式
                    hoverCursor: 'default',
                },
                option
            )
        );
        this.canvas.add(line);
        return line;
    }

    // 画文案
    private drawText(str, option: TextOptions = {}): fabric.Text {
        var text: fabric.Text = new fabric.Text(`${str}`, Object.assign(
            {},
            {
                // 字体对其方式
                originX: 'left',
                originY: 'top',
                // 定位
                left: 100,
                top: 50,
                // 字体描边
                stroke: '#000',
                // 字体大小
                fontSize: 12,
                // 填充色
                fill: '#000',
                // 禁止四点定位
                hasControls: false,
                // 禁止选中
                selectable: false,
                // 鼠标样式
                hoverCursor: 'default',
            },
            option
        ));
        this.canvas.add(text);
        return text;
    }
}

export const Server = withRouter(ServerView);
