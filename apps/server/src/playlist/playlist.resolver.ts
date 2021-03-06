import {
    Args,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from "@nestjs/graphql";

import { Music } from "@generated/music/music.model";
import { CreateOnePlaylistArgs } from "@generated/playlist/create-one-playlist.args";
import { FindManyPlaylistArgs } from "@generated/playlist/find-many-playlist.args";
import { FindUniquePlaylistArgs } from "@generated/playlist/find-unique-playlist.args";
import { PlaylistCount } from "@generated/playlist/playlist-count.output";
import { Playlist } from "@generated/playlist/playlist.model";
import { User } from "@generated/user/user.model";

import { PlaylistService } from "./playlist.service";

@Resolver(() => Playlist)
export class PlaylistResolver {
    constructor(private readonly service: PlaylistService) {}

    @Query(() => [Playlist])
    playlists(@Args() input?: FindManyPlaylistArgs) {
        return this.service.findMany(input);
    }

    @Query(() => Playlist, { nullable: true })
    playlist(@Args() input: FindUniquePlaylistArgs) {
        return this.service.findUnique(input);
    }

    @ResolveField(() => [Music])
    music(@Parent() playlist: Playlist) {
        return this.service.musicOfPlaylist(playlist);
    }

    @ResolveField(() => User)
    owner(@Parent() playlist: Playlist) {
        return this.service.ownerOfPlaylist(playlist);
    }

    @ResolveField(() => PlaylistCount)
    _count(@Parent() playlist: Playlist) {
        return { music: this.service.countMusics(playlist) };
    }

    @Mutation(() => Playlist)
    createPlaylist(@Args() input: CreateOnePlaylistArgs) {
        return this.service.create(input);
    }
}
