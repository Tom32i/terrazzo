class Generator {
    /**
     * @param {Number} width
     * @param {Number} height
     * @param {Array} colors
     * @param {Number} density
     */
    constructor(width, height, colors, density = 1500) {
        this.width = width;
        this.height = height;
        this.colors = colors;
        this.surface = innerWidth * innerHeight;
        this.density = density;

        this.createPatch = this.createPatch.bind(this);
    }

    /**
     * Generate a bunch of evenly spaced patches accross the current space
     *
     * @return {Patch[]}
     */
    getPatches() {
        const length = Math.round(this.surface / this.density);
        const patches = this.createPatches(length * 0.03, [3, 8], [25, 50]);

        // Fill with small patches
        this.createPatches(length * 0.4, [3, 8], [5, 20], patches);

        // Fill with smaller patches
        this.createPatches(length, [3, 8], [1, 5], patches);

        return patches;
    }

    /**
     * Create patches
     *
     * @param {Number} length
     * @param {Array} complexityRange
     * @param {Array} radiusRange
     * @param {Array} patches
     * @param {Number} maxExecutionTime
     *
     * @return {Patch[]}
     */
    createPatches(length, complexityRange, radiusRange, patches = [], maxExecutionTime = 3000) {
        const start = Date.now();

        while (patches.length < length && (Date.now() - start) < maxExecutionTime) {
            const patch = this.createPatch(complexityRange, radiusRange);

            if (!patches.some(patch.touch)) {
                patches.push(patch);
            }
        }

        return patches;
    }

    /**
     * Generate a new patch
     *
     * @param {Array} complexityRange
     * @param {Array} radiusRange
     *
     * @return {Patch}
     */
    createPatch(complexityRange, radiusRange) {
        const { randomInt } = Math;
        const radius = randomInt(...radiusRange);

        return new Patch(
            this.getRandomColor(),
            this.getRandomOrigin(),
            this.getRandomPoints(randomInt(...complexityRange), radius),
            4
        );
    }

    /**
     * Get a random color from the palette
     *
     * @return {String}
     */
    getRandomColor() {
        return Math.randomElement(this.colors);
    }

    /**
     * Get a random point in the current space
     *
     * @return {Array}
     */
    getRandomOrigin() {
        return [
            Math.random() * this.width,
            Math.random() * this.height,
        ];
    }

    /**
     * Get random points forming a shape
     *
     * @param {Number} length
     * @param {Number} radius
     *
     * @return {Array}
     */
    getRandomCirclePoints(length, radius) {
        const { randomModificator, min, sin, cos, PI } = Math;
        const defaultAngle = (2 * PI) / length;
        let angle = 0;
        let orbit = radius;

        return new Array(length).fill(null).map(() => {
            angle += defaultAngle * randomModificator(0.5, 1);
            orbit = min(orbit * randomModificator(0.5, 1), radius * 2);

            return [ cos(angle) * orbit, sin(angle) * orbit ];
        });
    }

    /**
     * Get random points forming a shape
     *
     * @param {Number} length
     * @param {Number} radius
     *
     * @return {Array}
     */
    getRandomPoints(length, radius) {
        const { randomInt, randomModificator, dist, sin, cos, PI } = Math;
        const defaultAngle = (2 * PI) / length;
        let angle = 0;

        const shape = new Array(length).fill(null).map(() => {
            angle += defaultAngle * randomModificator(0.5, 1);
            const orbit = radius * randomModificator(1, 1);

            return [ cos(angle) * orbit, sin(angle) * orbit ];
        });

        const points = [];

        shape.forEach((A, i) => {
            const [aX, aY] = A;
            const [bX, bY] = shape[i === (length - 1) ? 0 : i + 1];
            const distX = bX - aX;
            const distY = bY - aY;
            const add = randomInt(1, 4);
            const line = x => (x - aX) * (distY / distX) + aY;

            points.push(A);

            for (let i = 0; i < add; i++) {
                const move = (i + 1) / (add + 1);
                const x = aX + (distX * move);
                const y = line(x);

                points.push([
                    x + ((distX / (add + 1)) * randomModificator(1)),
                    y + ((distY / (add + 1)) * randomModificator(1))
                ]);
            }
        });

        return points;
    }
}
