import { ILineOptions, ITriangleOptions } from "fabric/fabric-impl";
import { fabric } from 'fabric';

const linkRect = () => {
    const points: number[] = [
        this.clusterGroups[0][1].left + this.clusterGroups[0][1].width,
        this.clusterGroups[0][1].top + this.clusterGroups[0][1].height / 2,
        this.clusterGroups[1][0].left,
        this.clusterGroups[1][0].top + this.clusterGroups[1][0].height / 2,
    ];

    const points2: number[] = [
        this.clusterGroups[1][0].left,
        this.clusterGroups[1][0].top + this.clusterGroups[1][0].height / 2,
        this.clusterGroups[0][1].left + this.clusterGroups[0][1].width,
        this.clusterGroups[0][1].top + this.clusterGroups[0][1].height / 2,
    ];

    var line = drawLine(points, {
        strokeWidth: 5,
        stroke: '#7db9e8',
        originX: 'center',
        originY: 'center',
        hasControls: false,
        hasBorders: false,
        hasRotatingPoint: false,
        hoverCursor: 'default',
        selectable: false,
    });

    this.canvas.add(line);
    const triangle = createArrowHead(points);
    const triangle2 = createArrowHead(points2);
    this.canvas.add(triangle);
    this.canvas.add(triangle2);
    this.canvas.renderAll();
}


/** 箭头 */
const createArrowHead = (points: any[]) => {
    var headLength = 15,

        x1 = points[0],
        y1 = points[1],
        x2 = points[2],
        y2 = points[3],

        dx = x2 - x1,
        dy = y2 - y1,

        angle = Math.atan2(dy, dx);

    angle *= 180 / Math.PI;
    angle += 90;

    const triangle = drawTriangle({
        angle: angle,
        fill: '#207cca',
        top: y2,
        left: x2,
        height: headLength,
        width: headLength,
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    return triangle;
}


// 画线
const drawLine = (path: number[] = [], option: ILineOptions = {}): fabric.Line => {
    var line: fabric.Line = new fabric.Line(
        path,
        Object.assign(
            {},
            {
                strokeWidth: 5,
                originX: 'center',
                originY: 'center',
                hasBorders: false,
                hasRotatingPoint: false,
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


// 画三角形
const drawTriangle = (option: ITriangleOptions = {}): fabric.Triangle => {
    var line: fabric.Triangle = new fabric.Triangle(
        Object.assign(
            {},
            {
                originX: 'center',
                originY: 'center',
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
