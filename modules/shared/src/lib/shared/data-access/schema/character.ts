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
    lastSynced?: Date;
    isSyncing?: boolean
}

export enum CharacterGroup {
    Nijisanji = 'Nijisanji',
    Hololive = 'Hololive',
    VSPO = 'VSPO',
    Others = 'Others'
}

export function getCharacterGroupLabel(priorityValue: string): string {
    switch (priorityValue) {
        case CharacterGroup.Nijisanji:
            return 'Nijisanji';
        case CharacterGroup.Hololive:
            return 'Hololive';
        case CharacterGroup.VSPO:
            return 'VSPO';
        default:
            return 'Others';
    }
}
