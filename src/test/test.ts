export const Test1 = `type Test1 = {
  a: string;
  b: number;
  c: [];
  d: undefined;
}`;

export const Test2 = `type Test2 = {
  a: string; // a is something good. Magna do ad est aliqua anim sint nulla occaecat. Consectetur dolor reprehenderit ea mollit ipsum amet.Consectetur non ad duis Lorem in nostrud qui fugiat ea est laboris culpa cupidatat.
  b: number; // Est dolore ea ex enim aliqua deserunt anim occaecat.
  // Dolor proident pariatur mollit duis irure.
  c: [];
  d: undefined;
};`;

export const Test3 = `type Test3 = {
  adsf: string;
  b: number;
  cvcxv: [];
  123: any;
  z123: null;
  d: undefined; // test
  e: {};
  f: {
    t: {
      a: string;
      b: [];
      c: {
        h: {
          k: string;
        };
      };
    };
  }; // test
  k: Object;
  o: { t: { a: string; b: []; c: { h: { j: string; n: number } } } };
};`;

export const Test4 = `
export interface Child1 {
  esfdsa: string;
  vcxzvcxz: string; // test
  tewtwe: string;
  qqew: string;
}

export interface Child2 {
  dasda: string;
  gfxzgf: string; // dfafdsa
  bcvk4: string;
  wqe123: string;
  kdkeiII: string;
}

interface Info {
  FEFEss: number;
  fskeo: number;
  tfkr4D: number;
  fddsfe: string;
  azfds: Child1;
  bvnb: string;
  tests: []; //test comment
  qqqqaaaaa: Child2[]; // test comment~
  ttt: Array<Child2>;
  ccccxxxxx: Child1[];
}
`;
