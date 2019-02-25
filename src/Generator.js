class Generator {
    static randomInt(min = 0, max = 1) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    static randomModificator(magnitude, base = 0) {
        return Math.random() * magnitude - (magnitude / 2);
    }

    constructor(width, height, colors, density = 2000) {
        this.width = width;
        this.height = height;
        this.colors = colors;
        this.surface = innerWidth * innerHeight;
        this.density = density;

        this.createPatch = this.createPatch.bind(this);
    }

    getPatches() {
        const length = Math.round(this.surface / this.density);
        const patches = this.createPatches(length * 0.06, [10, 21], [30, 40]);

        // Fill with small patches
        this.createPatches(length * 0.5, [3, 10], [3, 18], patches);

        // Fill with smaller patches
        this.createPatches(length, [3, 8], [1, 10], patches);

        return patches;
    }

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

    createPatch(complexityRange, radiusRange) {
        const { randomInt } = this.constructor;

        return new Patch(
            this.getRandomColor(),
            this.getRandomOrigin(),
            this.getRandomPoints(randomInt(...complexityRange), randomInt(...radiusRange))
        );
    }

    getRandomColor() {
        return this.colors[Math.floor(this.colors.length * Math.random())];
    }

    getRandomOrigin() {
        return [
            Math.random() * this.width,
            Math.random() * this.height,
        ];
    }

    getRandomPoints(length, radius) {
        const { randomModificator } = this.constructor;
        const defaultAngle = (2 * Math.PI) / length;
        let angle = 0;
        let orbit = radius;

        return new Array(length).fill(null).map(() => {
            angle += defaultAngle * (1 + randomModificator(0.5));
            orbit = Math.min(orbit * (1 + randomModificator(0.5)), radius * 2);

            return [ Math.cos(angle) * orbit, Math.sin(angle) * orbit ];
        });
    }
}
