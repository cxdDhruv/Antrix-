# Antrix AWM — Comparison Table (for website)

| Measurement scenario | Antrix AWM | Best alternative method | Result |
|---|---|---|---|
| Narrow-feature / gap width accuracy (e.g. slot width, PCB trace spacing) | 0.79–0.88 px uncertainty | 0.79–1.00 px uncertainty | Up to ~20% lower measurement uncertainty |
| Closely-spaced edges (e.g. thin walls, small bores) | Stays usable down to 8 px edge separation | Standard moment-based methods fail at every tested separation | Only adaptive method in its family that degrades gracefully instead of failing outright |
| General edge/hole/corner measurement, low blur | 0.26 px expanded uncertainty | 0.26 px (matches best available) | Matches the most accurate method tested, no accuracy given up |
| Pixel-locking (bias tied to sub-pixel position) | At the noise floor — no detectable pattern | Comparable at best | No measurable positional bias |

*Numbers are expanded uncertainty (≈95% confidence bound) from a
nine-method controlled benchmark with analytically known ground truth.*
