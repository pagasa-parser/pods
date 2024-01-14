# Resources

Resources are top-level objects that represent a specific PODS resource.
An example of a resource is a [disaster event](disaster-event/definition.md).
Each resource may contain its own set of properties and values, which should be
handled by interpreters according to its definition.

These rules apply to all resources in this specification:

1. All resources **MUST** be a valid JavaScript Object Notation (JSON)
  the resource type.
2. All resources **MUST** have `snake_case` keys.
3. All resources **MUST** have a `spec` property with the constant value
  `"https://pagasa-parser.github.io/pods/v0.1.0/"`.
4. All resources **MUST** have a `version` property with the constant value
  `"v0.1.0"`.
  object.
5. All resources **MUST** have a `type` property with a string value, denoting
6. All resources **MUST** allow an optional `metadata` property,
   containing a [metadata object](metadata/definition.md).
7. All resources **MAY** allow additional properties, which should be handled by
    interpreters according to its definition.
8. All resources **SHOULD** allow an optional `citation` property within all of its properties
   with an object type, excluding those required above, containing a
   [citation object or array](citation/definition.md).
9. All resources **MUST** encode timestamps in ISO 8601 format (e.g.
   `2024-01-14T06:38:58.497Z`).
10. All resources **MUST NOT** allow the properties *specifically* defined above
   to be overridden.
11. All resources **SHOULD** order the properties defined above as they appear in
   this definition.

# Canonical definition
The canonical definition for this resource is maintained in its [TypeScript type
definition]({{typedefs}}/ResourceBase.ts).
