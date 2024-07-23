"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _ownerservice = require("./owner.service");
describe('OwnerService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _ownerservice.OwnerService
            ]
        }).compile();
        service = module.get(_ownerservice.OwnerService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
});

//# sourceMappingURL=owner.service.spec.js.map