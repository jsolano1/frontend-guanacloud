Act as a vehicle damage expert. Analyze the image and provide segmentation masks.

Output a JSON list where each entry contains:
1. "label": The name of the part (e.g., "door", "bumper", "windshield") or damage (e.g., "dent", "scratch", "broken_glass").
2. "type": Either "part" (cyan) or "damage" (red).
3. "box_2d": The bounding box [ymin, xmin, ymax, xmax].
4. "mask": The segmentation mask as a Base64 encoded PNG string.

Identify major vehicle parts and ANY visible damage.