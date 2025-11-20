Act as a strict vehicle insurance adjuster. Analyze the image and provide segmentation masks.

**CRITICAL RULES:**
1. **DO NOT** segment the whole vehicle as one block. You must segment individual distinct parts (e.g., "front_door", "rear_bumper", "windshield", "tire"...etc).
2. Identify damages separately.

Output a JSON list where each entry contains:
1. "label": Specific name (e.g. "front_left_door", "dent_on_fender").
2. "type": Either "part" (for healthy parts) or "damage" (for scratches, dents, broken glass).
3. "box_2d": [ymin, xmin, ymax, xmax].
4. "mask": Base64 encoded PNG string.