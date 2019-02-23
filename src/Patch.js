class Patch {
    static getBox(origin, points) {
        const [x, y] = origin;
        let minX, maxX, minY, maxY;

        points.forEach(([x, y]) => {
            minX = minX ? Math.min(minX, x) : x;
            maxX = maxX ? Math.max(maxX, x) : x;
            minY = minY ? Math.min(minY, y) : y;
            maxY = maxY ? Math.max(maxY, y) : y;
        });

        return [minX + x, maxX + x, minY + y, maxY + y];
    }

    static getMeanRadius(points) {
        const { dist } = this;

        return points.reduce((sum, point) => sum + dist(point, [0, 0]), 0) / points.length;
    }

    static getMaxRadius(points) {
        return points.reduce((radius, point) => Math.max(radius, dist(point, [0, 0])), 0);
    }

    static dist(A, B) {
        return Math.sqrt(Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2));
    }

    constructor(color, origin, points) {
        this.color = color;
        this.origin = origin;
        this.points = points;
        this.box = this.constructor.getBox(origin, points);
        this.radius = this.constructor.getMeanRadius(points);

        this.touch = this.touch.bind(this);
    }

    touch(patch) {
        return this.touchRadius(patch);
    }

    touchBox(patch) {
        const [minX, maxX, minY, maxY] = this.box;
        const [pMinX, pMaxX, pMinY, pMaxY] = patch.box;

        return minX <= pMaxX && maxX >= pMinX && minY <= pMaxY && maxY >= pMinY;
    }

    touchRadius(patch) {
        const { dist } = this.constructor;

        return dist(this.origin, patch.origin) < (patch.radius + this.radius);
    }
}
