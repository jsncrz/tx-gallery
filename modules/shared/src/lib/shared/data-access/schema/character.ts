import { BaseObject } from "./base.object";

export interface Character extends BaseObject {
    name: string;
    tlName: string;
    twitterLink: string;
    pictureUrl: string;
    tag: string;
    group: string;
    limit: number;
    minFaves: number;
    debutDate?: Date;
    lastSynced?: Date;
    isSyncing?: boolean
}

export enum CharacterGroup {
    Nijisanji = 'Nijisanji',
    Hololive = 'Hololive',
    VSPO = 'VSPO',
    Neoporte = "Neo-Porte",
    Independent = 'Independent'
}
