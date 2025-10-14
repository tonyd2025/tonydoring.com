# Company Logos

Drop your company logo files into this folder. The system automatically generates logo filenames based on your company names!

## How the Dynamic Naming Works:

The system automatically converts company names to logo filenames:

**Examples:**
- "Ad Results Media" → `ad-results-media-logo.png`
- "TechCorp Solutions" → `techcorp-solutions-logo.png`
- "Innovation Labs" → `innovation-labs-logo.png`
- "DataFlow Systems" → `dataflow-systems-logo.png`
- "StartupXYZ" → `startupxyz-logo.png`
- "WebTech Corp" → `webtech-corp-logo.png`
- "Independent" → `independent-logo.png`

## Logo Naming Rules:

1. **Lowercase conversion**: "Ad Results Media" → "ad results media"
2. **Spaces to hyphens**: "ad results media" → "ad-results-media"
3. **Remove special characters**: "Ad Results & Media!" → "ad-results-media"
4. **Add logo suffix**: "ad-results-media" → "ad-results-media-logo.png"

## Logo Requirements:

- **Format**: PNG, JPG, or SVG (PNG recommended)
- **Size**: Ideally 200x200px or larger (will be automatically resized)
- **Background**: Transparent PNG works best, or white background
- **Quality**: High resolution for crisp display

## How to Add Your Logos:

### Method 1: Automatic Naming
1. Get your company logos
2. Rename them using this pattern: `[company-name]-logo.png`
3. Drop them into this `logos` folder
4. Refresh your website - logos appear automatically!

### Method 2: Manual Naming
1. Look at the company name in your HTML
2. Convert it using the naming rules above
3. Name your logo file accordingly
4. Drop it in this folder

## Examples for Your Current Companies:

- **Ad Results Media** → `ad-results-media-logo.png`
- **Innovation Labs** → `innovation-labs-logo.png`
- **DataFlow Systems** → `dataflow-systems-logo.png`
- **StartupXYZ** → `startupxyz-logo.png`
- **WebTech Corp** → `webtech-corp-logo.png`
- **Independent** → `independent-logo.png`

## How it Works:

- ✅ If a logo file exists → Shows the logo
- ❌ If a logo file is missing → Shows the fallback icon
- 🔄 Automatic naming based on company names
- 🎨 Logos are automatically resized to fit the 50x50px container
- 🛡️ Graceful error handling - no broken images

## Benefits:

- **No manual filename updates** when you change company names
- **Automatic logo loading** based on company names
- **Easy to maintain** - just drop in new logos with the right naming pattern
- **Fallback system** ensures your site always looks good
