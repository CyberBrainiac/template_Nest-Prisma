"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OwnerController", {
    enumerable: true,
    get: function() {
        return OwnerController;
    }
});
const _common = require("@nestjs/common");
const _ownerservice = require("./owner.service");
const _createownerdto = require("./dto/create-owner.dto");
const _updateownerdto = require("./dto/update-owner.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let OwnerController = class OwnerController {
    create(createOwnerDto) {
        return this.ownerService.create(createOwnerDto);
    }
    findAll() {
        return this.ownerService.owners({
            orderBy: {
                name: 'asc'
            }
        });
    }
    findOne(id) {
        return this.ownerService.findOne(+id);
    }
    update(id, updateOwnerDto) {
        return this.ownerService.update(+id, updateOwnerDto);
    }
    remove(id) {
        return this.ownerService.remove(+id);
    }
    constructor(ownerService){
        this.ownerService = ownerService;
    }
};
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createownerdto.CreateOwnerDto === "undefined" ? Object : _createownerdto.CreateOwnerDto
    ]),
    _ts_metadata("design:returntype", void 0)
], OwnerController.prototype, "create", null);
_ts_decorate([
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", void 0)
], OwnerController.prototype, "findAll", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], OwnerController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateownerdto.UpdateOwnerDto === "undefined" ? Object : _updateownerdto.UpdateOwnerDto
    ]),
    _ts_metadata("design:returntype", void 0)
], OwnerController.prototype, "update", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", void 0)
], OwnerController.prototype, "remove", null);
OwnerController = _ts_decorate([
    (0, _common.Controller)('owner'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ownerservice.OwnerService === "undefined" ? Object : _ownerservice.OwnerService
    ])
], OwnerController);

//# sourceMappingURL=owner.controller.js.map