import { ResourceBase } from "../ResourceBase";
import { DateString } from "../types";

export interface DisasterEvent extends ResourceBase {
    /**
     * The start of the event, in ISO 8601 format. The "start"
     * depends on the type of disaster; further information can be
     * found in the documentation for each disaster type.
     */
    start: DateString;
    /**
     * The end of the event, in ISO 8601 format. The "end" depends
     * on the type of disaster; further information can be found in
     * the documentation for each disaster type.
     */
    end: DateString;

    /**
     * Current information about this disaster event. If the event
     * is no longer active, this will be `false`. If the event is
     * still active, but no further information is available, this
     * will be `true`. If the event is still active and further
     * information is available, this will be an object containing
     * the information, with a "valid_until" property to indicate until
     * when the data may be valid for and a "valid_since" property to
     * indicate since when it has been available.
     */
    current: boolean | {
        valid_since: DateString;
        valid_until: DateString,
        [key: string]: any
    };
}