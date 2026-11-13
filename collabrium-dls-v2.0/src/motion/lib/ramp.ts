import { tokens } from '../../tokens/tokens';

const { color } = tokens;

/** The five hues that have a tint ramp. */
export type RampHue = 'orange' | 'salmonPink' | 'green' | 'navy' | 'amber';

/** A hue's ramp, lightest first: its -bg tint, -bg-strong tint, pastel and full colour. The same as the Chart color mapping's ramp. */
export function rampRungs(name: RampHue): readonly [string, string, string, string] {
  const map = {
    orange: [color.fireBg, color.fireBgStrong, color.firePastel, color.orange],
    salmonPink: [color.woodBg, color.woodBgStrong, color.woodPastel, color.salmonPink],
    green: [color.earthBg, color.earthBgStrong, color.earthPastel, color.green],
    navy: [color.waterBg, color.waterBgStrong, color.waterPastel, color.navy],
    amber: [color.goldBg, color.goldBgStrong, color.goldPastel, color.amber],
  } as const;
  return map[name];
}
