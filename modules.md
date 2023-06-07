[typesense-utils](README.md) / Exports

# typesense-utils

## Table of contents

### Type Aliases

- [BuildVectorQuerySignature1](modules.md#buildvectorquerysignature1)
- [BuildVectorQuerySignature2](modules.md#buildvectorquerysignature2)
- [FacetQuery](modules.md#facetquery)
- [Field](modules.md#field)
- [FilterByBoolean](modules.md#filterbyboolean)
- [FilterByGeopoint](modules.md#filterbygeopoint)
- [FilterByNumber](modules.md#filterbynumber)
- [FilterByQuery](modules.md#filterbyquery)
- [FilterByString](modules.md#filterbystring)
- [FilterBySubQuery](modules.md#filterbysubquery)
- [FilterExpression](modules.md#filterexpression)
- [Geopoint](modules.md#geopoint)
- [SortBy](modules.md#sortby)
- [SortByGeopoint](modules.md#sortbygeopoint)
- [Vector](modules.md#vector)
- [VectorQueryField](modules.md#vectorqueryfield)
- [VectorQueryOptions](modules.md#vectorqueryoptions)

### Enumerations

- [NullOrder](enums/NullOrder.md)
- [Order](enums/Order.md)

### Interfaces

- [SortByBoolean](interfaces/SortByBoolean.md)
- [SortByCondition](interfaces/SortByCondition.md)
- [SortByNumber](interfaces/SortByNumber.md)
- [SortByString](interfaces/SortByString.md)
- [SortByTextMatch](interfaces/SortByTextMatch.md)

### Functions

- [buildFacetBy](modules.md#buildfacetby)
- [buildFacetQuery](modules.md#buildfacetquery)
- [buildFieldsList](modules.md#buildfieldslist)
- [buildFilterBy](modules.md#buildfilterby)
- [buildGroupBy](modules.md#buildgroupby)
- [buildQueryBy](modules.md#buildqueryby)
- [buildSortBy](modules.md#buildsortby)
- [buildVectorQuery](modules.md#buildvectorquery)

## Type Aliases

### BuildVectorQuerySignature1

Ƭ **BuildVectorQuerySignature1**<`T`\>: [field: VectorQueryField<T\>, vector: Vector, options?: VectorQueryOptions]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildVectorQuery.ts:16](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildVectorQuery.ts#L16)

___

### BuildVectorQuerySignature2

Ƭ **BuildVectorQuerySignature2**<`T`\>: [field: VectorQueryField<T\>, id: string, options?: VectorQueryOptions]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildVectorQuery.ts:18](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildVectorQuery.ts#L18)

___

### FacetQuery

Ƭ **FacetQuery**<`T`\>: [`FilterByQuery`](modules.md#filterbyquery)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildFacetQuery.ts:3](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFacetQuery.ts#L3)

___

### Field

Ƭ **Field**<`Next`, `Type`, `Path`\>: `Next` extends `Type` ? `Path` : `Next` extends infer U[] ? [`Field`](modules.md#field)<`U`, `Type`, `Path`\> : `Next` extends `object` ? { [K in keyof Next & string]: Field<Next[K], Type, Path extends string ? \`${Path}.${K}\` : K\> }[keyof `Next` & `string`] : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Next` | `Next` |
| `Type` | `boolean` \| `number` \| `string` \| [`Geopoint`](modules.md#geopoint) |
| `Path` | extends `string` \| `undefined` = `undefined` |

#### Defined in

[Field.ts:3](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/Field.ts#L3)

___

### FilterByBoolean

Ƭ **FilterByBoolean**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `boolean` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `$eq?` | `T` | Matches documents where the value of a field equals the specified value. |
| `$in?` | `boolean`[] | Selects the documents where the value of a field equals any value in the specified array |
| `$ne?` | `T` | Selects the documents where the value of the field is not equal to the specified value. This includes documents that do not contain the field. |

#### Defined in

[buildFilterBy.ts:4](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L4)

___

### FilterByGeopoint

Ƭ **FilterByGeopoint**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `$center?` | [point: Geopoint, radius: number] | The query returns coordinate pairs that are within the bounds of the circle. Specify radius in kilometers. |
| `$polygon?` | [`Geopoint`](modules.md#geopoint)[] | The query returns pairs that are within the bounds of the polygon. The last point is always implicitly connected to the first. |

#### Defined in

[buildFilterBy.ts:61](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L61)

___

### FilterByNumber

Ƭ **FilterByNumber**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `number` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `$eq?` | `T` | Matches documents where the value of a field equals the specified value. |
| `$gt?` | `T` | Selects those documents where the value of the field is greater than (i.e. >) the specified value. |
| `$gte?` | `T` | Selects the documents where the value of the field is greater than or equal to (i.e. >=) a specified value (e.g. value.) |
| `$in?` | `number`[] | Selects the documents where the value of a field equals any value in the specified array |
| `$lt?` | `T` | Selects the documents where the value of the field is less than (i.e. <) the specified value. |
| `$lte?` | `T` | Selects the documents where the value of the field is less than or equal to (i.e. <=) the specified value. |

#### Defined in

[buildFilterBy.ts:19](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L19)

___

### FilterByQuery

Ƭ **FilterByQuery**<`T`\>: [`FilterBySubQuery`](modules.md#filterbysubquery)<`T`\> \| [`FilterExpression`](modules.md#filterexpression)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildFilterBy.ts:97](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L97)

___

### FilterByString

Ƭ **FilterByString**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` = `string` |

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `$eq?` | `T` | Matches documents where the value of a field equals the specified value. |
| `$in?` | `string`[] | Selects the documents where the value of a field equals any value in the specified array |
| `$ne?` | `T` | Selects the documents where the value of the field is not equal to the specified value. This does not includes documents that do not contain the field. |

#### Defined in

[buildFilterBy.ts:46](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L46)

___

### FilterBySubQuery

Ƭ **FilterBySubQuery**<`T`\>: { [K in keyof T]?: Operator<T[K]\> }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildFilterBy.ts:93](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L93)

___

### FilterExpression

Ƭ **FilterExpression**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$and?` | [`FilterByQuery`](modules.md#filterbyquery)<`T`\>[] |
| `$or?` | [`FilterByQuery`](modules.md#filterbyquery)<`T`\>[] |

#### Defined in

[buildFilterBy.ts:88](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L88)

___

### Geopoint

Ƭ **Geopoint**: [lat: number, lng: number]

#### Defined in

[Geopoint.ts:1](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/Geopoint.ts#L1)

___

### SortBy

Ƭ **SortBy**<`T`\>: { `_text_match?`: [`SortByTextMatch`](interfaces/SortByTextMatch.md)  } \| { `_eval?`: [`SortByCondition`](interfaces/SortByCondition.md)<`T`\>[]  } \| `SortByField`<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[buildSortBy.ts:104](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildSortBy.ts#L104)

___

### SortByGeopoint

Ƭ **SortByGeopoint**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `$exclude_radius?` | `number` | Sorts nearby places within a radius based on another attribute |
| `$order` | [`Order`](enums/Order.md) | Sorts in the specified order |
| `$point` | [`Geopoint`](modules.md#geopoint) | Sorts within a geo point |
| `$precision?` | `number` | Buckets geo points into "groups" around the $point |

#### Defined in

[buildSortBy.ts:48](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildSortBy.ts#L48)

___

### Vector

Ƭ **Vector**: `number`[]

#### Defined in

[Vector.ts:1](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/Vector.ts#L1)

___

### VectorQueryField

Ƭ **VectorQueryField**<`T`, `P`\>: `T` extends [`Vector`](modules.md#vector) ? `P` : `T` extends infer U[] ? [`VectorQueryField`](modules.md#vectorqueryfield)<`U`, `P`\> : `T` extends `object` ? { [K in keyof T & string]: VectorQueryField<T[K], P extends string ? \`${P}.${K}\` : K\> }[keyof `T` & `string`] : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `P` | extends `string` \| `undefined` = `undefined` |

#### Defined in

[buildVectorQuery.ts:3](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildVectorQuery.ts#L3)

___

### VectorQueryOptions

Ƭ **VectorQueryOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `$flat_search_cutoff?` | `number` |
| `$k?` | `number` |

#### Defined in

[buildVectorQuery.ts:11](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildVectorQuery.ts#L11)

## Functions

### buildFacetBy

▸ **buildFacetBy**<`T`\>(`fields`): `string`

Builds a string referencing fields that will be used for faceting your results on.

https://typesense.org/docs/0.24.0/api/search.html#faceting-parameters

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`Field`](modules.md#field)<`T`, `string` \| `number` \| `boolean` \| [`Geopoint`](modules.md#geopoint), `undefined`\>[] |

#### Returns

`string`

#### Defined in

[buildFacetBy.ts:9](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFacetBy.ts#L9)

___

### buildFacetQuery

▸ **buildFacetQuery**<`T`\>(`query`): `string`

Builds a facet query to filters by facet values. It supports only [a single field at the moment](https://github.com/typesense/typesense/issues/590).

https://typesense.org/docs/0.24.0/api/search.html#faceting-parameters

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`FacetQuery`](modules.md#facetquery)<`T`\> |

#### Returns

`string`

#### Defined in

[buildFacetQuery.ts:10](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFacetQuery.ts#L10)

___

### buildFieldsList

▸ **buildFieldsList**<`T`\>(`fields`): `string`

Builds a comma-separated list of fields from the document.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`Field`](modules.md#field)<`T`, `string` \| `number` \| `boolean` \| [`Geopoint`](modules.md#geopoint), `undefined`\>[] |

#### Returns

`string`

#### Defined in

[buildFieldsList.ts:6](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFieldsList.ts#L6)

___

### buildFilterBy

▸ **buildFilterBy**<`T`\>(`query`): `string`

Builds a query to filter conditions for refining your search results.

https://typesense.org/docs/0.23.0/api/search.html#query-parameters

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`FilterByQuery`](modules.md#filterbyquery)<`T`\> |

#### Returns

`string`

#### Defined in

[buildFilterBy.ts:193](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildFilterBy.ts#L193)

___

### buildGroupBy

▸ **buildGroupBy**<`T`\>(`fields`): `string`

Builds an expression to aggregate search results into groups or buckets by specify one or more group_by fields.

NOTE: To group on a particular field, it must be a faceted field.

https://typesense.org/docs/0.24.0/api/search.html#grouping-parameters

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`Field`](modules.md#field)<`T`, `string` \| `number` \| `boolean` \| [`Geopoint`](modules.md#geopoint), `undefined`\>[] |

#### Returns

`string`

#### Defined in

[buildGroupBy.ts:11](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildGroupBy.ts#L11)

___

### buildQueryBy

▸ **buildQueryBy**<`T`\>(`fields`): `string`

Builds a string referencing `string | string[]` fields.

https://typesense.org/docs/0.24.0/api/search.html#query-parameters

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | [`Field`](modules.md#field)<`T`, `string`, `undefined`\>[] |

#### Returns

`string`

#### Defined in

[buildQueryBy.ts:8](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildQueryBy.ts#L8)

___

### buildSortBy

▸ **buildSortBy**<`T`\>(`query`): `string`

Builds a sort expression with a list of fields and their corresponding sort orders that will be used for ordering your results.

https://typesense.org/docs/0.24.0/api/search.html#sort-results

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`SortBy`](modules.md#sortby)<`T`\> |

#### Returns

`string`

#### Defined in

[buildSortBy.ts:165](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildSortBy.ts#L165)

___

### buildVectorQuery

▸ **buildVectorQuery**<`T`\>(`...args`): `string`

Builds a vector query to filter by vectors.

https://typesense.org/docs/0.24.0/api/vector-search.html#vector-search

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`BuildVectorQuerySignature1`](modules.md#buildvectorquerysignature1)<`T`\> \| [`BuildVectorQuerySignature2`](modules.md#buildvectorquerysignature2)<`T`\> |

#### Returns

`string`

#### Defined in

[buildVectorQuery.ts:25](https://github.com/igrek8/typesense-utils/blob/57d3f6b/src/buildVectorQuery.ts#L25)
