const namespace = 'http://www.w3.org/2000/svg';

class SvgRenderer {
    /**
     * Get element
     *
     * @param {Number} width
     * @param {Number} height
     * @param {Number} scale
     *
     * @return {Element}
     */
    static getElement(width, height, scale = 1) {
        const element = document.createElementNS(namespace, 'svg');

        element.setAttributeNS(null, 'width', width * scale);
        element.setAttributeNS(null, 'height', height * scale);
        element.setAttributeNS(null, 'viewBox', `0 0 ${width} ${height}`);

        return element;
    }

    /**
     * @param {Number} width
     * @param {Number} height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.element = this.constructor.getElement(width, height);

        this.renderPatch = this.renderPatch.bind(this);
        this.renderCircle = this.renderCircle.bind(this);

        document.body.appendChild(this.element);
    }

    /**
     * Render the given patches
     *
     * @param {Patch[]} patches
     * @param {String} background
     */
    render(patches, background) {
        this.renderRectangle(0, 0, this.width, this.height, background);

        patches.forEach(this.renderPatch);
    }

    /**
     * Render a patch
     *
     * @param {Patch} patch
     */
    renderPatch(patch) {
        this.renderPolygonPath(patch.origin, patch.points, patch.color, patch.round);
    }

    /**
     * Render a polygon
     *
     * @param {Number[]} origin
     * @param {Array} points
     * @param {String} fill
     * @param {Number} stroke
     * @param {Number} opacity
     */
    renderPolygon(origin, points, fill, stroke = 0, opacity = 1) {
        const [ oX, oY ] = origin;
        const shape = document.createElementNS(namespace, 'polygon');

        shape.setAttributeNS(null, 'points', points.map(([x, y]) => `${x + oX},${y + oY}`).join(' '));
        shape.setAttributeNS(null, 'fill', fill);

        if (stroke) {
            shape.setAttributeNS(null, 'stroke', fill);
            shape.setAttributeNS(null, 'stroke-width', stroke);
            shape.setAttributeNS(null, 'stroke-linejoin', 'round');
        }

        if (opacity < 1) {
            circle.setAttributeNS(null, 'opacity', opacity);
        }

        this.element.appendChild(shape, opacity = 1);
    }

    /**
     * Render a polygon as path
     *
     * @param {Number[]} origin
     * @param {Array} points
     * @param {String} fill
     * @param {Number} stroke
     * @param {Number} opacity
     */
    renderPolygonPath(origin, points, fill, stroke = 0, opacity = 1) {
        const [ oX, oY ] = origin;
        const shape = document.createElementNS(namespace, 'path');
        const list = points.slice(0);
        const [startX, startY] = list.shift();

        shape.setAttributeNS(null, 'd', `M${startX + oX} ${startY + oY}` + (list.map(([x, y]) => `L${x + oX},${y + oY}`).join(' ')) + 'Z');
        shape.setAttributeNS(null, 'fill', fill);

        if (stroke) {
            shape.setAttributeNS(null, 'stroke', fill);
            shape.setAttributeNS(null, 'stroke-width', stroke);
            shape.setAttributeNS(null, 'stroke-linejoin', 'round');
        }

        if (opacity < 1) {
            circle.setAttributeNS(null, 'opacity', opacity);
        }

        this.element.appendChild(shape);
    }

    /**
     * Render a rectangle
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} width
     * @param {Number} height
     * @param {String} fill
     * @param {Number} opacity
     */
    renderRectangle(x, y, width, height, fill, opacity = 1) {
        const shape = document.createElementNS(namespace, 'rect');

        shape.setAttributeNS(null, 'x', x);
        shape.setAttributeNS(null, 'y', y);
        shape.setAttributeNS(null, 'width', width);
        shape.setAttributeNS(null, 'height', height);
        shape.setAttributeNS(null, 'fill', fill);

        if (opacity < 1) {
            circle.setAttributeNS(null, 'opacity', opacity);
        }

        this.element.appendChild(shape);
    }

    /**
     * Render a circle
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Number} radius
     * @param {String} fill
     * @param {Number} opacity
     */
    renderCircle(x, y, radius, fill, opacity = 1) {
        const shape = document.createElementNS(namespace, 'circle');

        shape.setAttributeNS(null, 'cx', x);
        shape.setAttributeNS(null, 'cy', y);
        shape.setAttributeNS(null, 'r', radius);
        shape.setAttributeNS(null, 'fill', fill);

        if (opacity < 1) {
            shape.setAttributeNS(null, 'opacity', opacity);
        }

        this.element.appendChild(shape);
    }

    /**
     * Render debug patch box
     *
     * @param {Patch} patch
     */
    renderDebugBox(patch) {
        const [minX, maxX, minY, maxY] = patch.box;
        this.renderRectangle(minX, minY, maxX - minX, maxY - minY, 'cyan', 0.3);
    }

    /**
     * Render debug patch radius
     *
     * @param {Patch} patch
     */
    renderDebugCircle(patch) {
        this.renderCircle(patch.origin[0], patch.origin[1], patch.radius, 'cyan', 0.3);
    }

    /**
     * Render debug patch points
     *
     * @param {Patch} patch
     */
    renderDebugPoints(patch) {
        patch.points.forEach(([x, y]) => {
            this.renderCircle(x + patch.origin[0], y + patch.origin[1], 4, 'red');
        });
    }
}
