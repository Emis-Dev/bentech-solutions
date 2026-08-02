import base64

with open('assets/logo-icon.png', 'rb') as f:
    icon_b64 = base64.b64encode(f.read()).decode('utf-8')

# Stacked version (original logo format)
svg_stacked = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 440" width="400" height="440">
  <image href="data:image/png;base64,{icon_b64}" x="50" y="10" width="300" height="260" />
  <text x="200" y="340" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-weight="800" font-size="62" fill="#FFFFFF" letter-spacing="-0.5px">BenTech</text>
  <text x="200" y="410" text-anchor="middle" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-weight="800" font-size="58" fill="#00C875" letter-spacing="0.5px">Solutions</text>
</svg>'''

with open('assets/logo-stacked.svg', 'w', encoding='utf-8') as f:
    f.write(svg_stacked)

# Horizontal version (perfect for headers)
svg_horizontal = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 150" width="520" height="150">
  <image href="data:image/png;base64,{icon_b64}" x="0" y="5" width="160" height="140" />
  <text x="175" y="80" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-weight="800" font-size="66" fill="#FFFFFF" letter-spacing="-1px">BenTech</text>
  <text x="175" y="132" font-family="'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" font-weight="800" font-size="52" fill="#00C875" letter-spacing="0.5px">Solutions</text>
</svg>'''

with open('assets/logo-horizontal.svg', 'w', encoding='utf-8') as f:
    f.write(svg_horizontal)

print("SVG files generated successfully")
