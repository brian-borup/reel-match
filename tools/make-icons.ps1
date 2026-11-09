# Draws the app icons: a film reel under a row of marquee bulbs on the
# projection-booth navy. Everything is drawn on a 512-unit canvas and scaled
# to each size the app needs.
# Run from anywhere on Windows:  pwsh reel-match/tools/make-icons.ps1
Add-Type -AssemblyName System.Drawing

$out = Join-Path $PSScriptRoot '..\icons'
function Color($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function Art($g) {
  $g.FillRectangle((New-Object System.Drawing.SolidBrush (Color '#1a1f28')), 0, 0, 512, 512)

  # Marquee bulbs along the top and bottom
  $bulb = New-Object System.Drawing.SolidBrush (Color '#f4b93c')
  for ($x = 40; $x -le 472; $x += 36) {
    $g.FillEllipse($bulb, $x - 8, 40, 16, 16)
    $g.FillEllipse($bulb, $x - 8, 456, 16, 16)
  }

  # The reel: an amber disc with six holes around a hub
  $g.FillEllipse((New-Object System.Drawing.SolidBrush (Color '#f4b93c')), 106, 106, 300, 300)
  $hole = New-Object System.Drawing.SolidBrush (Color '#1a1f28')
  for ($i = 0; $i -lt 6; $i++) {
    $a = [Math]::PI / 3 * $i - [Math]::PI / 2
    $cx = 256 + [Math]::Cos($a) * 92
    $cy = 256 + [Math]::Sin($a) * 92
    $g.FillEllipse($hole, $cx - 40, $cy - 40, 80, 80)
  }
  $g.FillEllipse($hole, 236, 236, 40, 40)
  $g.FillEllipse((New-Object System.Drawing.SolidBrush (Color '#f7f1e3')), 246, 246, 20, 20)
}

# Draws the art $scale times the icon size, centered on the background colour.
# Maskable icons get a smaller picture so circle crops keep the reel whole.
function Icon($px, $name, $scale) {
  $bmp = New-Object System.Drawing.Bitmap $px, $px
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.PixelOffsetMode = 'HighQuality'
  $g.Clear((Color '#1a1f28'))
  $k = $px * $scale / 512
  $g.TranslateTransform($px * (1 - $scale) / 2, $px * (1 - $scale) / 2)
  $g.ScaleTransform($k, $k)
  Art $g
  $bmp.Save((Join-Path $out $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

Icon 512 'icon-512.png' 1
Icon 192 'icon-192.png' 1
Icon 180 'apple-touch-icon.png' 1
Icon 512 'icon-maskable-512.png' 0.8
