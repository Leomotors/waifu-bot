import { Injectable } from "@nestjs/common";

import { CreateOneMusicArgs } from "@generated/music/create-one-music.args";
import { FindManyMusicArgs } from "@generated/music/find-many-music.args";
import { FindUniqueMusicArgs } from "@generated/music/find-unique-music.args";
import { Music } from "@generated/music/music.model";

import { PrismaService } from "../prisma.service";

@Injectable()
export class MusicService {
    constructor(private readonly prisma: PrismaService) {}

    findMany(input?: FindManyMusicArgs) {
        return this.prisma.music.findMany(input);
    }

    findUnique(input: FindUniqueMusicArgs) {
        return this.prisma.music.findUnique(input);
    }

    playlistOfMusic(music: Music) {
        return this.prisma.music
            .findUniqueOrThrow({
                where: {
                    videoId: music.videoId,
                },
            })
            .playlist();
    }

    countPlaylists(music: Music) {
        return this.prisma.playlist.count({
            where: { music: { some: { videoId: music.videoId } } },
        });
    }

    create(input: CreateOneMusicArgs) {
        return this.prisma.music.create(input);
    }
}
