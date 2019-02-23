const namespace = 'http://www.w3.org/2000/svg';

class SvgRenderer {

    static getElement(width, height, scale = 1) {
        const element = document.createElementNS(namespace, 'svg');

        element.setAttributeNS(null, 'width', width * scale);
        element.setAttributeNS(null, 'height', height * scale);
        element.setAttributeNS(null, 'viewBox', `0 0 ${width} ${height}`);

        return element;
    }

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.element = this.constructor.getElement(width, height);

        this.renderPatch = this.renderPatch.bind(this);
        this.renderCircle = this.renderCircle.bind(this);

        document.body.appendChild(this.element);
    }

    render(patches, background) {
        this.renderRectangle(0, 0, this.width, this.height, background);
        patches.forEach(this.renderPatch);
    }

    renderPatch(patch) {
        this.renderPolygon(patch.origin, patch.points, patch.color);
    }

    renderDebugBox(patch) {
        const [minX, maxX, minY, maxY] = patch.box;
        this.renderRectangle(minX, minY, maxX - minX, maxY - minY, 'cyan');
    }

    renderDebugCircle(patch) {
        this.renderCircle(patch.origin[0], patch.origin[1], patch.radius, 'cyan');
    }

    renderDebugBox(patch) {
        const [minX, maxX, minY, maxY] = patch.box;
        this.renderRectangle(minX, minY, maxX - minX, maxY - minY, 'cyan');
    }

    renderPolygon(origin, points, fill) {
        const [ oX, oY ] = origin;
        const polygon = document.createElementNS(namespace, 'polygon');

        polygon.setAttributeNS(null, 'points', points.map(([x, y]) => `${x + oX},${y + oY}`).join(' '));
        polygon.setAttributeNS(null, 'fill', fill);

        this.element.appendChild(polygon);
    }

    renderRectangle(x, y, width, height, fill) {
        const rectangle = document.createElementNS(namespace, 'rect');

        rectangle.setAttributeNS(null, 'x', x);
        rectangle.setAttributeNS(null, 'y', y);
        rectangle.setAttributeNS(null, 'width', width);
        rectangle.setAttributeNS(null, 'height', height);
        rectangle.setAttributeNS(null, 'fill', fill);

        this.element.appendChild(rectangle);
    }

    renderCircle(x, y, radius, fill) {
        const circle = document.createElementNS(namespace, 'circle');

        circle.setAttributeNS(null, 'cx', x );
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', radius);
        circle.setAttributeNS(null, 'fill', fill);

        this.element.appendChild(circle);
    }
}
