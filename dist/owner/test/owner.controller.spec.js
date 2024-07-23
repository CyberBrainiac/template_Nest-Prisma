"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _ownercontroller = require("./owner.controller");
const _ownerservice = require("./owner.service");
describe('OwnerController', ()=>{
    let controller;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            controllers: [
                _ownercontroller.OwnerController
            ],
            providers: [
                _ownerservice.OwnerService
            ]
        }).compile();
        controller = module.get(_ownercontroller.OwnerController);
    });
    it('should be defined', ()=>{
        expect(controller).toBeDefined();
    });
});

//# sourceMappingURL=owner.controller.spec.js.map