import { Geopoint } from './Geopoint';

type _Field<Next, Path extends string | undefined = undefined> = Next extends boolean | number | string | Geopoint
  ? Path
  : Next extends (infer U)[]
  ? _Field<U, Path>
  : Next extends object
  ? {
      [K in keyof Next & string]: _Field<Next[K], Path extends string ? `${Path}.${K}` : K>;
    }[keyof Next & string]
  : never;

export type Field<Next> = _Field<Next>;
