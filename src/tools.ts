import { Property, QuerySyntaxEnum, Table, Limit, SortingOrderEnum, SortingData, StringOrProperty, FunctionData, PropertyOrLogicalOperatorScope, LogicalOperatorScope, AnyButFunction, IQuerySchemeElement, Fn, IQueryScheme } from '@chego/chego-api';

export const isTableDotKeyString = (value: any): boolean =>
    (typeof value === "string") && /^(\w+)\.(\w+)$/.test(value);

export const isAliasString = (value: any): boolean =>
    (typeof value === "string") && /^(\w+)( AS )(\w+)$/i.test(value);

export const newProperty = ({ table, name, alias, type }: { table?: Table, name?: string, alias?: string, type?: QuerySyntaxEnum }): Property => ({
    table: table || null,
    name: name || '',
    alias: alias || '',
    type: type || QuerySyntaxEnum.Undefined
});

export const newTable = (name: string, alias?: string): Table => ({
    name,
    alias: alias || ''
});

export const newLimit = (offsetOrCount: number, count?: number): Limit => ({ offsetOrCount, count });

export const newSortingData = (property: Property = null, order: SortingOrderEnum = SortingOrderEnum.ASC): SortingData => ({
    property,
    order
});

export const getLabel = (obj: Property | Table):string => obj.alias ? obj.alias : obj.name;

export const mergePropertiesWithLogicalAnd = (properties: PropertyOrLogicalOperatorScope[], current: PropertyOrLogicalOperatorScope, i: number): PropertyOrLogicalOperatorScope[] =>
    properties.concat(isLogicalOperatorScope(current) || i === 0 ? current : newLogicalOperatorScope(QuerySyntaxEnum.And, [current]));

export const newLogicalOperatorScope = (type: QuerySyntaxEnum, properties?: PropertyOrLogicalOperatorScope[]): LogicalOperatorScope =>
    ({
        type,
        properties: properties || []
    });


export const isLogicalOperator = (value: QuerySyntaxEnum): boolean =>
    value === QuerySyntaxEnum.And || value === QuerySyntaxEnum.Or || value === QuerySyntaxEnum.Not;

export const isLogicalOperatorScope = (data: any): data is LogicalOperatorScope =>
    data
    && Object.keys(data).length === 2
    && (<LogicalOperatorScope>data).type !== undefined
    && (<LogicalOperatorScope>data).properties !== undefined
    && isLogicalOperator(data.type);

export const isFunction = (value: any): boolean => typeof value === 'function';

export const clone = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.reduce((acc: any, key: any) => (acc.push(clone(key)), acc), [])
    } else {
        if (!obj || Object.getPrototypeOf(obj) !== Object.prototype) {
            return obj;
        }
        return Object.keys(obj).reduce((acc: any, key: any) => (acc[key] = clone(obj[key]), acc), {})
    }
}

export const isQuerySchemeElement = (obj: any): boolean =>
    obj
    && Object.keys(obj).length === 2
    && (<IQuerySchemeElement>obj).type !== undefined
    && (<IQuerySchemeElement>obj).params !== undefined;


export const combineReducers = (...reducers: Fn[]) => (previous: any, current: any, index: number, org: any[]) => {
    let tempItem: any;
    let tempArray: any[];
    if (Array.isArray(previous)) {
        tempItem = current;
        reducers.forEach((reduce: Fn) => {
            tempArray = reduce([], tempItem, index, org);
            tempItem = tempArray[0];
        });
        return [...previous, ...tempArray];
    } else {
        tempItem = previous;
        reducers.forEach((reduce: Fn) => {
            tempItem = reduce(tempItem, current, index, org);
        });
        return tempItem;
    }
}

export const parseStringToTable = (name: string, alias?: string): Table => {
    const table: Table = newTable(name, alias);

    if (isAliasString(table.name)) {
        const data: string[] = table.name.replace(/ {1,}/g, ' ').split(' AS ');
        table.name = data[0];
        table.alias = data[1];
    }

    if (isTableDotKeyString(table.name)) {
        const data: string[] = table.name.split('.');
        table.name = data[0];
    }
    return table;
}

export const parseStringToProperty = (name: string, table?: Table): Property => {
    const result: Property = newProperty({ table, name });

    if (isAliasString(result.name)) {
        const data: string[] = result.name.replace(/ {1,}/g, ' ').split(' AS ');
        result.name = data[0];
        result.alias = data[1];
    }

    if (isTableDotKeyString(result.name)) {
        const data: string[] = result.name.split('.');
        result.table = newTable(data[0]);
        result.name = data[1];
    }
    return result;
}

export const isProperty = (value: any): value is Property =>
    value
    && Object.keys(value).length === 4
    && (<Property>value).table !== undefined
    && (<Property>value).name !== undefined
    && (<Property>value).alias !== undefined
    && (<Property>value).type !== undefined;

export const isMySQLFunction = (data: any): data is FunctionData => data
    && (<FunctionData>data).type !== undefined
    && (<FunctionData>data).properties !== undefined
    && (<FunctionData>data).alias !== undefined
    && (data.type > 35 && data.type < 43)
    || (data.type > 21 && data.type < 25);

export const isRowId = (value: any): boolean =>
    isProperty(value)
    && (<Property>value).type === QuerySyntaxEnum.RowId;

export const isAlias = (value: any): boolean =>
    isProperty(value)
    && (<Property>value).type === QuerySyntaxEnum.Alias;

export const isQueryScheme = (obj:any) :obj is IQueryScheme => 
    obj
    && (<IQueryScheme>obj).add !== undefined 
    && (<IQueryScheme>obj).toArray !== undefined;