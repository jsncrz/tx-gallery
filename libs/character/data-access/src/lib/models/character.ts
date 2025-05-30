import { BaseObject } from "@vgallery/core/api-types/src";

export interface Character extends BaseObject {
    id: string;
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
    NijisanjiEn = 'Nijisanji EN',
    Hololive = 'Hololive',
    HololiveEn = 'Hololive EN',
    VSPO = 'VSPO',
    Neoporte = "Neo-Porte",
    Nanashi = "774",
    Independent = 'Independent'
}
