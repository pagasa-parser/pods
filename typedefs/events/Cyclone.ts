import { Citation } from "../Citation";
import { DateString, Direction, Localizable } from "../types";
import { DisasterEvent } from "./DisasterEvent";

export interface CycloneMeteorologicalInformation {
    /**
     * The date and time since when this information is valid.
     * This is usually the issuance date of a tropical cyclone bulletin.
     */
    valid_since: DateString;
    /**
     * The date and time until when this information is valid.
     * This is usually found in the "Valid until" field at the
     * top of a tropical cyclone bulletin.
     */
    valid_until: DateString;
    /**
     * The issuing agency for this information. See specification
     * for possible values.
     */
    issuing_agency: string;
    /**
     * The category of this cyclone. This may differ per issuing agency.
     * See specification for possible values.
     */
    category?: string;
    /**
     * The maximum sustained winds of the cyclone, in knots.
     */
    winds?: number;
    /**
     * The maximum gusts of the cyclone, in knots.
     */
    gusts?: number;
    /**
     * The minimum central pressure of the cyclone, in millibars.
     */
    pressure?: number;
    /**
     * The center of the cyclone. This may be provided as a `[latitude,
     * longitude]` tuple, or as a `{ lat, lon }` object.
     * 
     * The latitude must be a number between -90 and 90, inclusive.
     * The longitude must be a number between -180 and 180, inclusive.
     */
    center?: [ number, number ] | {
        lat: number;
        lon: number;
    };
    /**
     * The movement of the storm. May be a string ("Almost stationary") or,
     * if possible, a `{ direction, speed }` object.
     */
    movement?: Localizable | {
        /**
         * The direction of the storm's movement as an acronym.
         */
        direction: Direction;
        /**
         * The speed of the storm, in knots.
         */
        speed: number;
    };

    /**
     * Citations for this information.
     */
    citation?: Citation;
}

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

export interface CycloneWarnings {
    
}

/**
 * A tropical cyclone is an area of low atmospheric pressure which
 * produces a system of strong winds and heavy rain around a
 * circulation center.
 */
export interface Cyclone extends DisasterEvent {
    /**
     * The type of this disaster event. Held as constant.
     */
    type: "cyclone";

    /**
     * The international name of the cyclone, if named.
     * International names are assigned by the Japan Meteorological Agency
     * in their capacity as the Regional Specialized Meteorological Center
     * for the Western Pacific Ocean.
     */
    international_name: string | null;
    /**
     * The local name of the cyclone, if named.
     * Local names are assigned by the Philippine Atmospheric, Geophysical
     * and Astronomical Services Administration (PAGASA).
     */
    local_name: string | null;
    /**
     * Additional identifiers for this storm. These keep track of different
     * designations for a given storm.
     */
    identifiers?: {
        /**
         * The Japan Meteorological Agency (JMA) identifier for this storm.
         * @example "2202"
         */
        jma?: string,
        /**
         * The Joint Typhoon Warning Center (JTWC) identifier for this storm.
         * @example "02W"
         */
        jtwc?: string,
        /**
         * The Wikidata entity ID for this storm.
         * @example "Q106493857"
         */
        wikidata?: string,
        /**
         * The International Best Track Archive for Climate Stewardship
         * (IBTrACS) cyclone ID for this storm.
         * @example "2021104N08138"
         */
        ibtracs?: string
    }

    /**
     * Peak meteorological information about this cyclone. Follow the
     * 'Canonical sources' rules in the specification for values in this
     * object.
     */
    peak: CycloneMeteorologicalInformation;

    /**
     * Current information about this cyclone. See {@link DisasterEvent.current}
     * for more information about primitive values. Follow the 'Canonical sources'
     * rules in the specification for values in this object.
     */
    current: false | CycloneMeteorologicalInformation | CycloneBulletin;

    /**
     * Forecast information about this cyclone. Follow the
     * 'Canonical sources' rules in the specification for values in this
     * object.
     */
    forecast?: CycloneMeteorologicalInformation | CycloneMeteorologicalInformation[];

    /**
     * Historical information about this cyclone. Follow the
     * 'Canonical sources' rules in the specification for values in this
     * object.
     */
    archive?: (CycloneMeteorologicalInformation | CycloneBulletin)[];
}