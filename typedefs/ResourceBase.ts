import { Metadata } from "./Metadata";
import { Citation } from "./Citation";

export interface ResourceBase {
    /**
     * The specification of this resource. Held constant.
     */
    spec: "https://pagasa-parser.github.io/pods/v0.1.0/",
    /**
     * The version of the specification. Held constant.
     */
    version: "v0.1.0",
    /**
     * The type of resource that this object is. This must be
     * differentiated to a constant string type.
     */
    type: string,
    /**
     * Additional metadata for the producer of this resource.
     */
    metadata: Metadata,
    /**
     * Citations for the data that applies to all fields in this
     * resource. Additional `citation` fields may be found in
     * lower-level objects; these supersede the citations in this
     * field.
     */
    citation: Citation
}