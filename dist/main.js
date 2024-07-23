"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
async function bootstrap() {
    const port = 3000;
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    await app.listen(port);
    _common.Logger.log(`App success started on port: ${port}`);
}
bootstrap();

//# sourceMappingURL=main.js.map