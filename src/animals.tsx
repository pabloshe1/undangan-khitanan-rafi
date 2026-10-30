import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const INK = "#3a2412";
const Svg = (p: P) => <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" {...p} />;

export const Lion = (p: P) => (
  <Svg {...p}>
    <circle cx="50" cy="52" r="42" fill="#d2661f" />
    {Array.from({ length: 14 }, (_, i) => {
      const a = (i * 360) / 14 * (Math.PI / 180);
      return <circle key={i} cx={50 + 42 * Math.cos(a)} cy={52 + 42 * Math.sin(a)} r="9" fill="#d2661f" />;
    })}
    <circle cx="27" cy="30" r="8" fill="#ffb938" /><circle cx="73" cy="30" r="8" fill="#ffb938" />
    <circle cx="50" cy="54" r="31" fill="#ffb938" />
    <circle cx="40" cy="48" r="3.2" fill={INK} /><circle cx="60" cy="48" r="3.2" fill={INK} />
    <ellipse cx="50" cy="61" rx="14" ry="10" fill="#ffe7b0" />
    <path d="M44 57h12l-6 6z" fill={INK} />
    <path d="M50 63v3M50 66q-4 4-8 0M50 66q4 4 8 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Elephant = (p: P) => (
  <Svg {...p}>
    <circle cx="20" cy="46" r="20" fill="#8a847c" /><circle cx="80" cy="46" r="20" fill="#6f9fc4" />
    <circle cx="20" cy="46" r="11" fill="#f3a5b0" /><circle cx="80" cy="46" r="11" fill="#f3a5b0" />
    <circle cx="50" cy="44" r="29" fill="#a9a299" />
    <path d="M50 54v28q0 9 9 9" stroke="#a9a299" strokeWidth="15" fill="none" strokeLinecap="round" />
    <path d="M38 62q-6 10-3 18M62 62q6 10 3 18" stroke="#fffdf5" strokeWidth="5" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="40" r="3.2" fill={INK} /><circle cx="60" cy="40" r="3.2" fill={INK} />
  </Svg>
);

export const Giraffe = (p: P) => (
  <Svg {...p}>
    <rect x="38" y="30" width="24" height="72" rx="6" fill="#ffc83d" />
    {[[46, 52, 4], [55, 66, 5], [45, 82, 4], [56, 93, 4]].map(([x, y, r]) => <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#b9651c" />)}
    <path d="M42 15l-3-9M58 15l3-9" stroke="#b9651c" strokeWidth="3" strokeLinecap="round" />
    <circle cx="39" cy="6" r="3.5" fill="#b9651c" /><circle cx="61" cy="6" r="3.5" fill="#b9651c" />
    <ellipse cx="31" cy="25" rx="9" ry="4" fill="#ffc83d" transform="rotate(-20 31 25)" />
    <ellipse cx="69" cy="25" rx="9" ry="4" fill="#ffc83d" transform="rotate(20 69 25)" />
    <ellipse cx="50" cy="26" rx="18" ry="15" fill="#ffc83d" />
    <ellipse cx="50" cy="34" rx="12" ry="8" fill="#ffe7b0" />
    <circle cx="42" cy="22" r="2.6" fill={INK} /><circle cx="58" cy="22" r="2.6" fill={INK} />
    <circle cx="46" cy="35" r="1.4" fill={INK} /><circle cx="54" cy="35" r="1.4" fill={INK} />
  </Svg>
);

export const Panda = (p: P) => (
  <Svg {...p}>
    <circle cx="24" cy="24" r="14" fill={INK} /><circle cx="76" cy="24" r="14" fill={INK} />
    <circle cx="50" cy="54" r="38" fill="#fffdf5" />
    <ellipse cx="34" cy="50" rx="10" ry="13" fill={INK} transform="rotate(20 34 50)" />
    <ellipse cx="66" cy="50" rx="10" ry="13" fill={INK} transform="rotate(-20 66 50)" />
    <circle cx="35" cy="49" r="3" fill="#fffdf5" /><circle cx="65" cy="49" r="3" fill="#fffdf5" />
    <ellipse cx="50" cy="63" rx="6" ry="4.5" fill={INK} />
    <path d="M50 67v3q-5 4-9 1M50 70q5 4 9 1" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Leaf = (p: P) => (
  <Svg {...p}>
    <path d="M6 94C6 42 40 8 94 6c0 54-34 88-88 88z" fill="currentColor" />
    <path d="M6 94L72 28" stroke="rgba(0,0,0,.18)" strokeWidth="2.5" />
  </Svg>
);

export const Monkey = (p: P) => (
  <Svg viewBox="0 0 100 135" {...p}>
    <path d="M0 5h100" stroke="#5a3418" strokeWidth="9" strokeLinecap="round" />
    <path d="M50 8v26" stroke="#8a5a32" strokeWidth="6" strokeLinecap="round" />
    <path d="M36 92L16 78M64 92l20-14M42 118l-6 9M58 118l6 9" stroke="#8a5a32" strokeWidth="9" strokeLinecap="round" />
    <ellipse cx="50" cy="102" rx="17" ry="21" fill="#8a5a32" />
    <circle cx="27" cy="58" r="9" fill="#8a5a32" /><circle cx="73" cy="58" r="9" fill="#8a5a32" />
    <circle cx="27" cy="58" r="4.5" fill="#f0b894" /><circle cx="73" cy="58" r="4.5" fill="#f0b894" />
    <circle cx="50" cy="58" r="23" fill="#8a5a32" />
    <ellipse cx="50" cy="63" rx="16" ry="14" fill="#f6cfa8" />
    <circle cx="43" cy="56" r="2.6" fill={INK} /><circle cx="57" cy="56" r="2.6" fill={INK} />
    <circle cx="38" cy="65" r="3" fill="#f4a39a" /><circle cx="62" cy="65" r="3" fill="#f4a39a" />
    <path d="M43 67q7 6 14 0" stroke={INK} strokeWidth="2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Vine = (p: P) => (
  <Svg viewBox="0 0 200 110" {...p}>
    <path d="M-5 18C45 4 58 62 108 42S168 8 205 30" stroke="#5c6b2a" strokeWidth="7" fill="none" strokeLinecap="round" />
    <g fill="#3f8a4c">
      <ellipse cx="38" cy="34" rx="9" ry="17" transform="rotate(-35 38 34)" />
      <ellipse cx="80" cy="58" rx="9" ry="17" transform="rotate(30 80 58)" />
      <ellipse cx="128" cy="26" rx="9" ry="17" transform="rotate(-25 128 26)" />
      <ellipse cx="170" cy="30" rx="8" ry="15" transform="rotate(40 170 30)" />
    </g>
  </Svg>
);

export const Orangutan = (p: P) => (
  <Svg {...p}>
    {Array.from({ length: 12 }, (_, i) => {
      const a = ((i * 360) / 12) * (Math.PI / 180);
      return <circle key={i} cx={50 + 38 * Math.cos(a)} cy={50 + 38 * Math.sin(a)} r="11" fill="#d4561a" />;
    })}
    <circle cx="50" cy="50" r="38" fill="#d4561a" />
    <circle cx="14" cy="56" r="8" fill="#f0b17a" /><circle cx="86" cy="56" r="8" fill="#f0b17a" />
    <ellipse cx="50" cy="56" rx="27" ry="26" fill="#f0b17a" />
    <circle cx="39" cy="50" r="4.2" fill="#fffdf5" /><circle cx="61" cy="50" r="4.2" fill="#fffdf5" />
    <circle cx="39" cy="51" r="2.4" fill={INK} /><circle cx="61" cy="51" r="2.4" fill={INK} />
    <ellipse cx="50" cy="68" rx="14" ry="10" fill="#f8d2a8" />
    <circle cx="46" cy="64" r="1.6" fill={INK} /><circle cx="54" cy="64" r="1.6" fill={INK} />
    <path d="M42 71q8 7 16 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const Sloth = (p: P) => (
  <Svg {...p}>
    <ellipse cx="50" cy="66" rx="44" ry="28" fill="#9b7653" />
    <path d="M14 82q-5 9 1 14M24 86q-3 8 2 13M86 82q5 9-1 14M76 86q3 8-2 13" stroke="#f3e6c8" strokeWidth="4" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="46" r="31" fill="#b48d66" />
    <ellipse cx="50" cy="50" rx="25" ry="21" fill="#efdcb8" />
    <ellipse cx="38" cy="47" rx="8" ry="5.5" fill="#6b4a2f" transform="rotate(-22 38 47)" />
    <ellipse cx="62" cy="47" rx="8" ry="5.5" fill="#6b4a2f" transform="rotate(22 62 47)" />
    <path d="M34 47q4-4 8 0M58 47q4-4 8 0" stroke="#fffdf5" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="50" cy="57" rx="5.5" ry="3.8" fill={INK} />
    <path d="M42 63q8 7 16 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
  </Svg>
);
