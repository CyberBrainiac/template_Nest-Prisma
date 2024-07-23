"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OwnerService", {
    enumerable: true,
    get: function() {
        return OwnerService;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("../../prisma/prisma.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OwnerService = class OwnerService {
    async owner(ownerWhereUniqueInput) {
        return this.prisma.owner.findUnique({
            where: ownerWhereUniqueInput
        });
    }
    async owners(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.owner.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });
    }
    async createOwner(data) {
        return this.prisma.owner.create({
            data
        });
    }
    async updateOwner(params) {
        const { where, data } = params;
        return this.prisma.owner.update({
            data,
            where
        });
    }
    async deleteOwner(where) {
        return this.prisma.owner.delete({
            where
        });
    }
    constructor(prisma){
        this.prisma = prisma;
    }
};
OwnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], OwnerService);

//# sourceMappingURL=owner.service.js.map