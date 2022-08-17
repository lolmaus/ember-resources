import { Resource } from 'ember-resources';
import { expectType } from 'ts-expect';

import type { ExpandArgs } from 'ember-resources';

class A extends Resource {
  a = 1;
}

expectType<number>(A.from({}).a);
expectType<A>(A.from({}));

type BArgs = {
  positional: [number, string];
  named: {
    num: number;
    str: string;
  };
};

export class B extends Resource<BArgs> {
  modify(positional: BArgs['positional'], named: BArgs['named']) {
    expectType<[number, string]>(positional);
    expectType<number>(named.num);
    expectType<string>(named.str);
  }
}

type CArgs = {
  Positional: [number, string];
  Named: {
    num: number;
    str: string;
  };
};

export class C extends Resource<CArgs> {
  modify(positional: CArgs['Positional'], named: CArgs['Named']) {
    expectType<[number, string]>(positional);
    expectType<number>(named.num);
    expectType<string>(named.str);
  }
}

type DArgs<T = unknown> = {
  Positional: [];
  Named: {
    foo: T;
  };
};

export class D<MyType = unknown> extends Resource<DArgs<MyType>> {
  modify(
    positional: ExpandArgs<DArgs<MyType>>['Positional'],
    named: ExpandArgs<DArgs<MyType>>['Named']
  ) {
    expectType<never[]>(positional);
    expectType<{ foo: MyType }>(named);
  }
}

export class DUsage {
  foo = 2;
  // Available in TS 4.7+
  myInstance = D<number>.from(() => ({ foo: this.foo }));
}
