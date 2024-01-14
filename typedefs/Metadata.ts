import { DateString, Localizable } from "./types";

export interface Producer {
    /**
     * The name of the producer for this resource. This should be
     * the name of whichever generated this resource; the sources
     * from which the data has been derived should instead be in
     * citations.
     */
    name: Localizable,
    /**
     * Owner of this producer, if the name specified in `name` is
     * not an individual (e.g. automated software).
     */
    owner?: Localizable,
    /**
     * The organization that is responsible for this producer, if
     * applicable.
     */
    organization?: Localizable,
    /**
     * The URL to the producer's website or documentation.
     */
    url?: string,
    /**
     * Contact information for this producer.
     */
    contact?: Localizable | {
        /**
         * Phone numbers for this producer, in international dialing format.
         */
        phone?: string | string[],
        /**
         * Email addresses for this producer.
         */
        email?: string | string[],
        /**
         * Mailing addresses for this producer. Address lines should be
         * separated with the line break (`\n`) character.
         */
        mail?: string | string[],
        /**
         * Social media handles for this producer. The key should be the
         * canonical domain name for the social media website, and the
         * value should be the handle.
         */
        social?: Record<string, Localizable>
    }
}

export interface Metadata {
    /**
     * The producer of this resource. The producer is the entity which
     * generated the resource, whether it be a person, organization, or
     * automated service.
     */
    producer?: Producer,
    /**
     * The date on which this resource was produced. This should be in
     * ISO 8601 format.
     */
    produced?: DateString
}