export type StationInfo = {
    name: string;
    image: string;
};

export type SingleProgram = {
    midill: string;
    midill_heiti: string;
    dagsetning: string;
    upphaf: string;
    titill: string;
    isltitill: string;
    undirtitill: string;
    seria: number;
    thattur: number;
    thattafjoldi: number;
    birta_thatt: number;
    opin: number;
    beint: number;
    frumsyning: number;
    framundan_i_beinni: number;
    flokkur: string;
    adalhlutverk: string;
    leikstjori: string;
    ar: string;
    bannad: string;
    frelsi: number;
    netdagar: number;
    lysing: string;
    slott: number;
    slotlengd: string;
};

export enum ChannelIndexes {
    stod2 = 'stod2',
    sport = 'sport',
    sport2 = 'sport2',
    sport3 = 'sport3',
    sport4 = 'sport4',
    golfstodin = 'golfstodin',
    esport = 'esport',
    bio = 'bio',
    stod3 = 'stod3',
    pepsimax = 'pepsimax',
    sportem = 'sportem',
    besta01 = 'besta01',
    besta02 = 'besta02',
    besta03 = 'besta03',
}
