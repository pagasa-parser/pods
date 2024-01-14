import {Area} from "./Area";
import {Citation} from "../../Citation";

export interface WarningAreaBase extends Area {
    citation?: Citation | Citation[];
}

export interface WarningAreaWhole extends WarningAreaBase {
    partial: false;
}

export interface WarningAreaSection extends WarningAreaBase {
    partial: true;
    includes: {
        type: "section";
        term: string;
        part: string;
        areas: Area[];
    }
}

export interface WarningAreaMainland extends WarningAreaBase {
    partial: true;
    includes: {
        type: "mainland";
        areas?: Area[];
    }
}

export interface WarningAreaRest extends WarningAreaBase {
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
