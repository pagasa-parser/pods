import {CycloneMeteorologicalInformation} from "./CycloneMeteorologicalInformation";

export interface CycloneBulletin extends CycloneMeteorologicalInformation {
    /**
     * Held as constant. Used to determine whether this object is a bulletin.
     */
    bulletin: true;
    /**
     * The title of this bulletin.
     */
    title?: string;
    /**
     * A textual summary of the cyclone's activity.
     */
    summary?: string;
    /**
     * The sequential number of this information. For PAGASA TCBs, this
     * is the TCB number.
     */
    sequence_no?: number;
    /**
     * Whether this bulletin is the final bulletin to be issued by this agency
     * for this cyclone.
     */
    final: boolean;
}
