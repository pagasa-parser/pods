# Tropical cyclones

A tropical cyclone is an area of low atmospheric pressure which
produces a system of strong winds and heavy rain around a circulation
center. In the Philippines, tropical cyclones are generally referred
to with the umbrella term "*bagyo*", which can vary from very weak
storms to supertyphoons.

## Canonical sources
Multiple sources of information exist for meteorological data on a
given tropical cyclone. For this reason, it is usually hard to
determine which source is the most accurate. To address this, the
following policy applies to all meteorological information that
can be found on tropical cyclone resource objects:

1. All meteorological information **MUST** be sourced from the
   [Philippine Atmospheric, Geophysical and Astronomical Services
   Administration (PAGASA)](https://bagong.pagasa.dost.gov.ph/).
2. Meteorological information **SHOULD** be gathered from Tropical
   Cyclone Bulletins, but **MAY** also be sourced from the PAGASA
   website or official social media, as required.
3. Additional meteorological information **MAY** be sourced from
   other agencies, but **MUST** be clearly marked as such.

The focus on Philippine government agencies reflects the purpose
of this specification: to provide information for Philippine
events. However, context from other agencies are sometimes also
important for a more complete picture of the event.

## Basic information
* All tropical cyclone resource objects **MUST** have a `type` of
  `cyclone`.
* All tropical cyclone resource objects **MUST** have an `international_name`
  property.
    * It **MUST** be a string containing the international (JMA-designated)
      name of the tropical cyclone, if any.
    * In the absence of an international name, this property **MUST** be `null`.
* All tropical cyclone resource objects **MUST** have a `local_name`
  property.
    * It **MUST** be a string containing the international (PAGASA-designated)
      name of the tropical cyclone, if any.
    * In the absence of an international name, this property **MUST** be `null`.
* All tropical cyclone resource objects **MUST** have an `identifiers`
  property, if identifiers exist.
  * This property **MUST** be an object.
  * This object **MUST** contain the following properties, if identifiers exist:
    * `jma`: The JMA-designated ID of the tropical cyclone (e.g. `2202`), if any.
    * `jtwc`: The JTWC-designated ID of the tropical cyclone (e.g. `02W`), if any.
    * `wikidata`: The Wikidata entity ID of the tropical cyclone (e.g. `Q106493857`), if any.
    * `ibtracs`: The International Best Track Archive for Climate Stewardship
      (IBTrACS) cyclone ID of the tropical cyclone (e.g. `2021104N08138`), if any.
  * If there are no additional identifiers for this storm except its name,
    this property **MUST** be `null`.
* Tropical cyclone resource objects **MAY** have a `current` property.
  * This property **MUST** be `false` if it is no longer active at the time
    of production.
  * This property **MUST** be a [meteorological information
    object](#meteorological-information) if it is active at the time of production.
  * This property **MAY** be omitted if the validity of the information
    has lapsed (`valid_until` is in the past).

## Meteorological information

Meteorological information exists in four places:

* in the `peak` property, where peak meteorological data is stored;
* in the `current` property, where current meteorological data is stored;
* in the `archive` property, where historical meteorological data is stored;
* in the `forecast` property, where forecast meteorological data is stored.

Meteorological information objects contain relevant information about a storm's
intensity, position, and movement.

* Meteorological information objects **MUST** follow the [disaster event current
  information object](definition.md#Current-information).
* Meteorological information objects **MUST** have an `issuing_agency` string property with
  the proper issuing agency information ([see below](#issuing-agency)).
* Meteorological information objects **SHOULD** have a `category` string property with the
  storm's category according to the issuing agency, if applicable.
* Meteorological information objects **SHOULD** have a `winds` number property with the
  storm's maximum sustained winds in knots.
    * This value **MAY** be a decimal if precision will be lost due to unit conversion.
* Meteorological information objects **SHOULD** have a `gusts` number property with the
  storm's maximum gusts in knots.
    * This value **MAY** be a decimal if precision will be lost due to unit conversion.
* Meteorological information objects **SHOULD** have a `pressure` number property with the
  storm's minimum central pressure in millibars.
* Meteorological information objects **SHOULD** have a `center` property with the
  storm's current position.
    * This property **MAY** be an object.
        * This object **MUST** have a `latitude` number property with the storm's current
        latitude in decimal degrees.
        * This object **MUST** have a `longitude` number property with the storm's current
        longitude in decimal degrees.
    * This property **MAY** be a two-number tuple, containing a latitude and longitude
      respectively.
    * Southern latitudes **MUST** be negative.
    * Western longitudes **MUST** be negative.
    * The property **MUST** be either an object, a tuple, or undefined.
* Meteorological information objects **SHOULD** have a `movement` property with the
  storm's current movement.
    * This property **MAY** be a localizable string.
    * This property **MAY** be an object.
        * This object **MUST** have a `direction` number property with the storm's current
        direction in degrees.
        * This object **MUST** have a `speed` number property with the storm's current
        speed in knots.
    * The property **MUST** be either a string, an object, or undefined.
* If no datum is available for the above, the property **MUST** be undefined.
* Meteorological information objects **SHOULD** have a `citation` property,
  set to a [citation object or array](../citation/definition.md).

### Bulletins
Bulletin data is available for some meteorological information objects.
The bulletin data exposes information about the bulletin from which
the information was sourced.

* Bulletin data objects **MUST** be valid meteorological information objects.
* Bulletin data objects **MUST** have a `bulletin` property with the constant
  boolean value `true`.
* Bulletin data objects **SHOULD** have a `title` string property, if applicable.
* Bulletin data objects **SHOULD** have a `summary` string property, if applicable.
* Bulletin data objects **SHOULD** have a `sequence_no` number property, if applicable.
    * This property **MUST** be the sequential number of the bulletin that the object
      references, if available.
* Bulletin data objects **MUST** have a `final` boolean property.
    * This property **MUST** be `true` if the bulletin is the final bulletin for
      the storm.
    * This property **MUST** be `false` if the bulletin is not the final bulletin
      for the storm.

### Issuing agency

The issuing agencies for tropical cyclone information must be set to
the acronym of the agency which issued the information in uppercase.

* `PAGASA`: Philippine Atmospheric, Geophysical and Astronomical
  Services Administration
* `JMA`: Japan Meteorological Agency
* `JTWC`: Joint Typhoon Warning Center

If the above agencies are not in use, or the acronym would otherwise
cause confusion, use the CCCC code of the issuing agency instead, as
defined by the World Meteorological Organization (WMO) in
WMO Publication No. 9, Volume C, Chapter I, Catalogue of Meteorological Bulletins.

### Peak information
Peak information is stored in the `peak` property. This property
**MUST** be set to the [meteorological information object](#meteorological-information)
at which the tropical cyclone is at its lowest minimum central pressure.

### Current information
Current information is stored in the `current` property. This property
**MUST** be set to the current [meteorological information object](#meteorological-information)
for the tropical cyclone, or `false` if the cyclone is no longer active.

This property **MAY** be a [bulletin data object](#bulletins), if supported.

### Archive information
Archive information is stored in the `archive` property. This property
**MUST** be set to an array of past [meteorological information objects](#meteorological-information)
or [bulletin data objects](#bulletins) for the tropical cyclone. The
current information **MUST NOT** be found in the archive array.

### Forecast information
Forecast information is stored in the `forecast` property. This property
**MUST** be set to an array of future [meteorological information objects](#meteorological-information)
or a single future meteorological information object for the tropical cyclone,
if forecasts have been provided by the issuing agency.

## Warnings
Tropical Cyclone Wind Signal (TCWS) warnings are issued by the PAGASA
in areas where tropical cyclone winds are expected to occur. This property
of the tropical cyclone resource object is highly specific to the TCWS.

* The `warnings` property **MUST** be an object with keys `"5"`, `"4"`, `"3"`, `"2"`, `"1"`.
* The properties of `warnings` **SHOULD** be ordered in decreasing severity.
* Each key represents a TCWS warning level, from TCWS #1 to TCWS #5.
* Each value in `warnings` **MUST** be an array of [warning areas](#warning-areas).

## Warning areas
A warning area is an area where a TCWS warning is in effect. These have varying
granularities, depending on the extent and intensity of the storm.

There has been a lot of discrepancy on how TCWS warnings have been issued.
In some cases, TCWS warnings are applied to entire provinces, and sometimes
only to very specific portions of municipalities. The following policy
should be applied in producing and implementing TCWS warnings objects:

* There **MUST** be a TCWS warning object for the highest possible granularity.
    * If a warning has been raised for an entire province, with no higher
      or lower warnings for specific municipalities in the province, there
      **MUST** only be one TCWS warning object for the entire province.
    * If a warning has been raised for a specific municipality, it **MUST**
      have its own TCWS warning object. If the rest of the province is under
      a different warning, the province **MUST** have its own TCWS warning object.
    * If a warning has been raised for a specific portion of a municipality,
      it **MUST** have its own TCWS warning object and **MUST** have the
      `part` property set appropriately.
    * If an area is not under any TCWS warning, it **MUST NOT** have a
      TCWS warning object.
* TCWS warning objects **MUST** have a Philippine Standard Geographic Code
  (PSGC) property.
    * This property **MUST** be a string containing the PSGC of the area.
    * This property **MUST** be a 10-digit PSGC.
    * This property **MUST** be a valid PSGC.
    * Provinces **MUST** have a PSGC ending in `00000`.
    * Municipalities **MUST** have a PSGC ending in `000`.
    * If no valid PSGC exists for the area, this property **MUST** be `null`.
* TCWS warning objects which only cover a portion of a municipality or
  province **MUST** have a `part` property.
    * This property **MUST** be a string containing the portion.
    * This property **MUST** be a valid portion name.
    * If no valid portion name exists for the area, this property **MUST**
      be undefined.
* If the name used in the bulletin differs from the official name of the
  area according to the PSGC database, the `name` property **MUST** be set.
    * This property **MUST** be a string containing the name of the area
      according to the bulletin.

### Example conversions
```json
// TCWS warning object for the entire province of Albay
[ { "psgc": "050500000" } ]
```
```json
// TCWS warning object for the City of Manila, under the name "Manila"
[ {
    "psgc": "133900000",
    "name": "Manila"
} ]
```
```json
// TCWS #1 for the entire province of Bulacan
// TCWS #2 for the municipality of Marilao
{
    "2": [ { "psgc": "031411000" } ],
    "1": [ { "psgc": "031400000" } ]
}
```