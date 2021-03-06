import { ImATeapotException, Injectable } from "@nestjs/common";

import { CreateOneUserArgs } from "@generated/user/create-one-user.args";
import { FindManyUserArgs } from "@generated/user/find-many-user.args";
import { FindUniqueUserArgs } from "@generated/user/find-unique-user.args";
import { UpdateOneUserArgs } from "@generated/user/update-one-user.args";
import { User } from "@generated/user/user.model";

import { IncomingMessage } from "http";

import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    findMany(input?: FindManyUserArgs) {
        return this.prisma.user.findMany(input);
    }

    findUnique(input: FindUniqueUserArgs) {
        return this.prisma.user.findUnique(input);
    }

    userFromContext(req: IncomingMessage) {
        const token = req.headers.authorization;
        if (token == process.env.ADMIN_SECRET) {
            throw new ImATeapotException("Admin does not have an account");
        }

        return this.prisma.accessToken
            .findUniqueOrThrow({
                where: { token },
            })
            .user();
    }

    playlistOfUser(user: User) {
        return this.prisma.user
            .findUniqueOrThrow({ where: { id: user.id } })
            .playlist();
    }

    profileOfUser(user: User) {
        return this.prisma.profile.findUnique({
            where: { userId: user.id },
        });
    }

    accessTokenOfUser(user: User) {
        return this.prisma.accessToken.findUnique({
            where: { userId: user.id },
        });
    }

    async countPlaylists(user: User) {
        return (
            await this.prisma.user
                .findUniqueOrThrow({ where: { id: user.id } })
                .playlist({ select: { id: true } })
        ).length;
    }

    create(input: CreateOneUserArgs) {
        return this.prisma.user.create(input);
    }

    update(input: UpdateOneUserArgs) {
        return this.prisma.user.update(input);
    }
}
