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
  information object](definition.md#current-information).
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

* The `warnings` property **MUST** be an object with signal level properties `"5"`,
  `"4"`, `"3"`, `"2"`, `"1"`, and metadata properties `"valid_until"` and `"valid_since"`.
* The `warnings` property **MUST** have a `valid_until` string property.
  * This property **MUST** be set to the date and time at which the TCWS
    warnings are no longer valid.
* The `warnings` property **MUST** have a `valid_since` string property.
  * This property **MUST** be set to the date and time at which the TCWS
    warnings became valid.
* The `warnings` property **MAY** contain a `citation` property.
* The level properties of `warnings` **SHOULD** be ordered in decreasing severity.
* Each level property represents a TCWS warning level, from TCWS #1 to TCWS #5.
* Each level property in `warnings` **MUST** be an array of [warning objects](#warning-objects).

## Areas
An **area** here refers to a province, municipality, island, island group, or
barangay.

* All area objects **MUST** have a `name` string property.
  * It **MUST** be set to the name of the area as it appears in the bulletin.
* All area objects **MUST** have a [valid `psgc`
  property](#philippine-standard-geographic-code), if one is available.

## Warning objects
A warning area is an area where a TCWS warning is in effect. These have varying
granularities, depending on the extent and intensity of the storm. These may
encompass part of an area, or the entirety of it.

There has been a lot of discrepancy on how TCWS warnings have been issued.
In some cases, TCWS warnings are applied to entire provinces, and sometimes
only to very specific portions of municipalities or islands. The following
policy should be applied in producing and implementing TCWS warnings objects:

* TCWS warning objects **MUST** be a valid [area object](#areas).
* TCWS warning objects **MUST** have a `partial` boolean property.
    * This property **MUST** be `true` if the warning is applied only to a
      portion of the area referenced by `name`.
    * This property **MUST** be `false` if the warning is fully applicable
      to the area, with no other parts of the area under a higher TCWS level.
* If a warning has been raised only for a section of an area, the warning area
  **MUST** have its own TCWS warning object with `partial` set to `true`.
    * Such an object **MUST** have an `includes` object property.
      * The object `type` property **MUST** be set to `"section"`
      * The object **MUST** have a `term` string property, set to the term
        used in describing the part (e.g. "portion", "region", etc.)
      * The object **MUST** have a `part` string property, set to the part
        of the area which is under the warning (e.g. "northwestern").
* If a warning has been raised only for a "mainland" area:
  * The `type` property **MUST** be set to `"mainland"`
  * The `part` and `term` properties **MUST** be undefined
* If a warning has been raised only for the rest of an area:
  * The `type` property **MUST** be set to `"rest"`
  * The `part` and `term` properties **MUST** be undefined
* For sections, mainlands, and "rest of"s:
  * The `includes` object **MUST** have an `areas` array property.
  * For every included area in the warning, the `areas` array **MUST**
    contain a valid [area object](#areas). This **MAY** be an empty
    array if the `part` is `"rest"` or `"mainland"` and no areas were
    explicitly mentioned in the bulletin.
    * Islands that are part of the included areas in the warning **MAY**
      be given a [valid `psgc` property](#philippine-standard-geographic-code)
      if one is available, as long as the entirety of the island is within
      the jurisdiction of the area.
* Islands which are not included areas of a warning **MUST** be given
  their own TCWS warning object if they are under a TCWS warning, even
  if the island is part of a larger area which is also under a TCWS warning.
* There **MUST** be a TCWS warning object for the highest possible granularity.
    * If a warning has been raised for an entire province, with no higher
      or lower warnings for specific municipalities in the province, there
      **MUST** only be one TCWS warning object for the entire province.
    * If a warning has been raised for a specific municipality, it **MUST**
      have its own TCWS warning object. If the rest of the province is under
      a different warning, the province **MUST** have its own TCWS warning object.
    * If a warning has been raised for a specific portion of a municipality,
      it **MUST** have its own TCWS warning object and **MUST** have the
      `part`/`includes` property set appropriately.
    * If a warning has been raised for the rest of a province or municipality,
      where a specific portion of the province or municipality has been issued
      a higher warning level, the province or municipality **MUST** have its
      own TCWS warning object with the `part`/`includes` property set
      appropriately.
    * If an area is not under any TCWS warning, it **MUST NOT** have a
      TCWS warning object.
* The warning object **MAY** contain a `citation` property.

### Philippine Standard Geographic Code
TCWS warning objects and the areas they reference **MUST** have a
`psgc` Philippine Standard Geographic Code (PSGC) string property. This aids
in determining specific areas which are under a TCWS warning on a map
and allows easy machine processing of affected areas.

* This property **MUST** be a string containing the PSGC of the area.
* This property **MUST** be a 10-digit PSGC.
* This property **MUST** be a valid PSGC.
* Provinces **MUST** have a PSGC ending in `00000`.
* Municipalities **MUST** have a PSGC ending in `000`.
* If no valid PSGC exists for the area, this property **MUST** be `null`.

### Example conversions

TCWS warning object for the entire province of Albay:
```json
{ 
  "psgc": "050500000",
  "name": "Albay",
  "partial": false
}
```
TCWS warning object for the City of Manila, under the name "Manila":
```json
{ 
  "psgc": "133900000",
  "name": "Manila",
  "partial": false
}
```

TCWS #2 for the extreme southern portion of Bulacan, TCWS #1 for the rest of Bulacan:

```json
{
    "2": [
        {
            "psgc": "031400000",
            "name": "Bulacan",
            "partial": true,
            "includes": {
                "type": "section",
                "term": "portion",
                "part": "extreme southern",
                "areas": [
                    {
                        "psgc": "0301404000",
                        "name": "Bocaue"
                    },
                    {
                        "psgc": "0301405000",
                        "name": "Bulakan"
                    },
                    {
                        "psgc": "0301411000",
                        "name": "Marilao"
                    },
                    {
                        "psgc": "0301412000",
                        "name": "Meycauayan"
                    },
                    {
                        "psgc": "0301414000",
                        "name": "Obando"
                    }
                ]
            }
        }
    ],
    "1": [
        {
            "psgc": "031400000",
            "name": "Bulacan",
            "partial": true,
            "includes": {
                "part": "rest"
            }
        }
    ]
}
```

TCWS #5 for the eastern portion of Babuyan Islands (Camiguin Island).
TCWS #4 for Cagayan. Note that the Babuyan Islands is not given a `psgc`
property, but Camiguin Island was given a `psgc` property as it is within
the jurisdiction of Calayan. This behavior is not required, and exists
as a convenience for map rendering.

```json
{
    "5": [
        {
            "name": "Babuyan Islands",
            "partial": true,
            "includes": {
                "type": "section",
                "term": "portion",
                "part": "eastern",
                "areas": [
                    {
                        "psgc": "0201509000",
                        "name": "Camiguin Island"
                    }
                ]
            }
        }
    ],
    "4": [
        {
            "psgc": "0201500000",
            "name": "Cagayan",
            "partial": false
        }
    ]
}
```

# Canonical definition
The canonical definition for this resource is maintained in its [TypeScript type
definition]({{typedefs}}/events/cyclones/Cyclone.ts).
