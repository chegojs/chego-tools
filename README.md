# chego-tools

This package contains a bunch of functions used across Chego components. 

## Install
```
npm install --save @chego/chego-tools
```

## Short introduction

The functions included in this package have been separated from the core component, so that they can be used in database drivers without any unnecessary and heavy dependencies. As such, they should not be part of the official API.

To find out what `Property`, `Table`, `SortingData`, `Alias`, `RowId`, `Limit`, `LogicalOperatorScope`, `FunctionData` are, please check [Chego API](https://github.com/chegojs/chego-api)

## Tools

#### <code>newProperty({ table?: Table, name?: string, alias?: string, type?: QuerySyntaxEnum }): Property</code>
Returns new `Property` object.

#### <code>newTable(name: string, alias?: string): Table</code>
Returns new `Table` object.

#### <code>newLimit(offsetOrCount: number, count?: number): Limit</code>
Returns new `Limit` object.

#### <code>newSortingData(property: Property = null, order: SortingOrderEnum = SortingOrderEnum.ASC): SortingData</code>
Returns new `SortingData` object.

#### <code>rowId(alias: string = 'id'): Property</code>
Returns new `Property` object with the defined type `QuerySyntaxEnum.RowId`. 

#### <code>alias(name: string, alias: string): Property</code>
Returns new `Property` object with the defined type `QuerySyntaxEnum.Alias`. 

#### <code>getLabel(obj: Property | Table):string</code>
Returns label string of given property/table. If `alias` is set then it will return its value, otherwise it returns `name` of the property.

#### <code>parseStringToPropertyIfRequired(key: StringOrProperty):Property</code>
Function checks if a given `key` is a `string`, if so, it parses it to a `Property` object. 

#### <code>mergePropertiesWithLogicalAnd(properties: PropertyOrLogicalOperatorScope[], current: PropertyOrLogicalOperatorScope, i: number): PropertyOrLogicalOperatorScope[]</code>
`Array.reduce` callback, which checks each element and wraps it within the logical operator scope.

pseudocode 
```
select['foo','bar','baz', or('qux')] ---> select['foo',and('bar'),and('baz'), or('qux')] 
```

#### <code>newLogicalOperatorScope(type: QuerySyntaxEnum, properties?: PropertyOrLogicalOperatorScope[]): LogicalOperatorScope</code>
Returns new `LogicalOperatorScope` object.

#### <code>isLogicalOperator(value: QuerySyntaxEnum): boolean</code>
Checks if a given enum value is equal to `And`, `Or` or `Not`.

#### <code>isLogicalOperatorScope(data: any): data is LogicalOperatorScope</code>
Checks if a given prop is a `LogicalOperatorScope` object.

#### <code>isFunction(value: any): boolean</code>
Checks if a given prop is a `function`.

#### <code>clone(obj: any):any</code>
Performs a deep cloning of an object.

#### <code>isQuerySchemeElement(obj: any): boolean</code>
Checks if a given prop is a `QuerySchemeElement` object.

#### <code>combineReducers(...reducers: Fn[]) => (previous: any, current: any, index: number, org: any[])</code>
Executes `Array.reduce` callbacks - one by one - in a single iteration.

#### <code>parseStringToTable(name: string, alias?: string): Table</code>
Converts given string to `Table` object.

#### <code>parseStringToProperty(name: string, table?: Table): Property</code>
Converts given string to `Property` object.

#### <code>isTableDotKeyString(value: any): boolean</code>
Checks if a given param is a `string` and matches pattern eg. `superheros.name`.

#### <code>isAliasString(value: any): boolean</code>
Checks if a given param is a `string` and matches pattern eg. `writers.name AS author`.

#### <code>isProperty = (value: any): value is Property</code>
Checks if a given param is a `Property` object.

#### <code>isRowId = (value: any): boolean</code>
Checks if a given param is a `Property` object with defined type `QuerySyntaxEnum.RowId`.

#### <code>isAlias = (value: any): boolean</code>
Checks if a given param is a `Property` object with defined type `QuerySyntaxEnum.Alias`.

#### <code>isMySQLFunction = (value: any): value is FunctionData</code>
Checks if a given param is a `FunctionData` object.

## Contribute
There is still a lot to do, so if you want to be part of the Chego project and make it better, it's great.
Whether you find a bug or have a feature request, please contact us. With your help, we'll make it a great tool.

[How to contribute](https://github.com/orgs/chegojs/chego/CONTRIBUTING.md)

Follow our kanban boards to be up to date

[Kanban boards](https://github.com/orgs/chegojs/chego/TODO.md)

Join the team, feel free to catch any task or suggest a new one.

## License

Copyright (c) 2019 [Chego Team](https://github.com/orgs/chegojs/people)

Licensed under the [MIT license](LICENSE).