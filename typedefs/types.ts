/**
 * A localizable string may be a constant string or a string that
 * has been translated into different languages. If the latter
 * format is used, keys must be in ISO 639-3 format.
 */
export type Localizable = string | Record<string, string>;

/**
 * An ISO 8601 date string.
 */
export type DateString = string;

type VerticalCardinalDirection = "N" | "S";
type HorizontalCardinalDirection = "E" | "W";
/**
 * A string denoting a cardinal direction in acronym form.
 */
export type CardinalDirection = VerticalCardinalDirection | HorizontalCardinalDirection;

/**
 * A string denoting a direction in acronym form. Supports up to three
 * combined cardinal directions (e.g. "NNE").
 */
export type Direction = 
    | CardinalDirection
    | `${VerticalCardinalDirection}${HorizontalCardinalDirection}`
    | `NN${HorizontalCardinalDirection}`
    | `SS${HorizontalCardinalDirection}`
    | `E${VerticalCardinalDirection}E`
    | `W${VerticalCardinalDirection}W`;