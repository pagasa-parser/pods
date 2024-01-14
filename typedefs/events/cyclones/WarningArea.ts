import {Area} from "./Area";

export interface WarningAreaWhole extends Area {
    partial: false;
}

export interface WarningAreaSection extends Area {
    partial: true;
    includes: {
        type: "section";
        term: string;
        part: string;
        areas: Area[];
    }
}

export interface WarningAreaMainland extends Area {
    partial: true;
    includes: {
        type: "mainland";
        areas?: Area[];
    }
}

export interface WarningAreaRest extends Area {
    partial: true;
    includes: {
        type: "rest";
        areas?: Area[];
    }
}

export type WarningArea =
    | WarningAreaWhole
    | WarningAreaSection
    | WarningAreaMainland
    | WarningAreaRest;
