import { Geopoint } from './Geopoint';

export type Field<
  Next,
  Type = boolean | number | string | Geopoint,
  Path extends string | undefined = undefined
> = Next extends Type
  ? Path
  : Next extends (infer U)[]
  ? Field<U, Type, Path>
  : Next extends object
  ? {
      [K in keyof Next & string]: Field<Next[K], Type, Path extends string ? `${Path}.${K}` : K>;
    }[keyof Next & string]
  : never;
