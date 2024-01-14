import {DisasterEvent} from "../DisasterEvent";
import {CycloneMeteorologicalInformation} from "./CycloneMeteorologicalInformation";
import {CycloneBulletin} from "./CycloneBulletin";
import {WarningArea} from "./WarningArea";
import {DateString} from "../../types";
import {Citation} from "../../Citation";

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

    /**
     * Active warning areas for this tropical cyclone.
     */
    warnings?: Record<`${1 | 2 | 3 | 4 | 5}`, WarningArea[]> & {
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
         * The source of this information.
         */
        citation?: Citation | Citation[];
    };
}
