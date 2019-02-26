class Patch {
    /**
     * Get box
     *
     * @param {Array} origin
     * @param {Array} points
     *
     * @return {Array}
     */
    static getBox(origin, points) {
        const { min, max } = Math;
        const [x, y] = origin;
        let minX, maxX, minY, maxY;

        points.forEach(([x, y]) => {
            minX = minX ? min(minX, x) : x;
            maxX = maxX ? max(maxX, x) : x;
            minY = minY ? min(minY, y) : y;
            maxY = maxY ? max(maxY, y) : y;
        });

        return [minX + x, maxX + x, minY + y, maxY + y];
    }

    /**
     * Get mean radius
     *
     * @param {Array} points
     * @param {Number} round
     *
     * @return {Number}
     */
    static getMeanRadius(points, round) {
        const { dist } = Math;

        return points.reduce((sum, point) => sum + dist(point, [0, 0]), 0) / (points.length - 1) + round * 2;
    }

    /**
     * Get max radius
     *
     * @param {Array} points
     * @param {Number} round
     *
     * @return {Number}
     */
    static getMaxRadius(points, round) {
        const { dist, max } = Math;

        return points.reduce((radius, point) => max(radius, dist(point, [0, 0])), 0) + round * 2;
    }

    /**
     * @param {String} color
     * @param {Number[]} origin
     * @param {Array} points
     * @param {Number} round
     */
    constructor(color, origin, points, round) {
        this.color = color;
        this.origin = origin;
        this.points = points;
        this.round = round;
        this.box = this.constructor.getBox(origin, points);
        this.radius = this.constructor.getMeanRadius(points, round);

        this.touch = this.touch.bind(this);
    }

    /**
     * Does the given patch touch me?
     *
     * @param {Patch} patch
     *
     * @return {Boolean}
     */
    touch(patch) {
        return this.touchRadius(patch);
    }

    /**
     * Box based collision test
     *
     * @param {Patch} patch
     *
     * @return {Boolean}
     */
    touchBox(patch) {
        const [minX, maxX, minY, maxY] = this.box;
        const [pMinX, pMaxX, pMinY, pMaxY] = patch.box;

        return minX <= pMaxX && maxX >= pMinX && minY <= pMaxY && maxY >= pMinY;
    }

    /**
     * Radius based collision test
     *
     * @param {Patch} patch
     *
     * @return {Boolean}
     */
    touchRadius(patch) {
        return Math.dist(this.origin, patch.origin) < (patch.radius + this.radius);
    }
}
