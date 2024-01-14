import {DateString, Direction, Localizable} from "../../types";
import {Citation} from "../../Citation";

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
    center?: [number, number] | {
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
