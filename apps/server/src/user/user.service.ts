import { Injectable } from "@nestjs/common";

import { CreateOneUserArgs } from "@generated/user/create-one-user.args";
import { FindUniqueUserArgs } from "@generated/user/find-unique-user.args";
import { UpdateOneUserArgs } from "@generated/user/update-one-user.args";

import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async findMany() {
        return this.prisma.user.findMany();
    }

    async findUnique(input: FindUniqueUserArgs) {
        return this.prisma.user.findUnique(input);
    }

    async create(input: CreateOneUserArgs) {
        return this.prisma.user.create(input);
    }

    async update(input: UpdateOneUserArgs) {
        return this.prisma.user.update(input);
    }
}