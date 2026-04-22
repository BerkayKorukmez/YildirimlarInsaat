# Yıldırımlar İnşaat — Kurumsal Web Sitesi

Modern, responsive, vanilla HTML/CSS/JS ile hazırlanmış kurumsal web sitesi.

## Çalıştırma

Hiçbir build adımı gerektirmez. İki seçeneğiniz var:

**1. En kolay:** `index.html` dosyasını çift tıklayın, tarayıcıda açılır.

**2. Local server (önerilen, form ve yollar için):**
```powershell
# Python 3
python -m http.server 8000
# Sonra tarayıcıda: http://localhost:8000
```

## Dosya Yapısı

```
yildirimlarinsaat/
├── index.html                 # Ana sayfa
├── hakkimizda.html            # Hakkımızda
├── referanslar.html           # Referanslar
├── iletisim.html              # İletişim (form + harita)
├── hizmetler/
│   ├── parlak-perdahli-zemin.html
│   ├── fircali-zemin.html
│   ├── tepsili-zemin.html
│   ├── endustriyel-beton-zemin.html
│   ├── yuzey-sertlestirici.html
│   ├── derz-kesim-dolgu.html
│   ├── tas-hali.html
│   └── zemin-bakim-onarim.html
├── css/style.css              # Tüm stiller
├── js/main.js                 # Mobil menü, animasyonlar, form
├── images/                    # Görselleri buraya koy
└── README.md
```

## Görsel Rehberi

`images/` klasörüne aşağıdaki isimlerle görselleri koyman yeterli. Dosya yoksa otomatik gizleniyor, site yine çalışıyor.

### Zorunlu

| Dosya adı | Açıklama | Önerilen boyut |
|---|---|---|
| `hero-1.jpg` | Ana sayfa hero arka plan (endüstriyel zemin ortamı) | 1920×1080 |
| `about-1.jpg` | Hakkımızda ana görsel (çalışan ekip / iş yeri) | 800×1000 |
| `about-2.jpg` | Hakkımızda küçük görsel (detay / ekipman) | 600×600 |

### Hizmetler (kart görselleri)

| Dosya adı | Hizmet | Boyut |
|---|---|---|
| `service-endustriyel.jpg` | Endüstriyel Zemin | 800×500 |
| `service-epoksi.jpg` | Epoksi Kaplama | 800×500 |
| `service-silim.jpg` | Silim Kesim | 800×500 |
| `service-beton.jpg` | Beton Parlatma | 800×500 |
| `service-yol.jpg` | Yol Çizgi | 800×500 |
| `service-dekoratif.jpg` | Dekoratif Zemin | 800×500 |
| `service-tashali.jpg` | Taş Halı | 800×500 |

### Referanslar

`ref-1.jpg` … `ref-9.jpg` — Tamamlanmış proje fotoğrafları (800×600 önerilir).

## Güncellenecek Yerler (İletişim Bilgileri)

Tüm HTML dosyalarında `<!-- CONTACT: ... -->` etiketiyle işaretli alanlar var. Aşağıdaki bilgileri verince hepsini tek tek değiştireceğim (veya aradan şu değerleri bul-değiştir yaparak güncelleyebilirsin):

| Placeholder | Değiştir |
|---|---|
| `0(XXX) XXX XX XX` | Gerçek telefon numarası |
| `+900000000000` | Uluslararası format (tel: ve wa.me linkleri için) |
| `info@yildirimlarinsaat.com` | Gerçek e-posta |
| `[Adres bilgisi]` | Gerçek adres |
| Sosyal medya | Instagram ve WhatsApp linkleri |

### Harita

`iletisim.html` içindeki `<iframe src="https://www.google.com/maps/embed?..."` kısmı — Google Maps'ten "Share > Embed a map" ile gerçek adresin embed kodunu al, src URL'ini değiştir.

## Özellikler

- Mobil ve masaüstü responsive
- Sticky header + dropdown hizmet menüsü
- Scroll ile beliren animasyonlar
- Animated counter (sayaçlar)
- Contact form (mailto fallback — backend istersen eklenebilir)
- Floating WhatsApp butonu
- Font Awesome 6 ikonlar
- Google Fonts (Inter + Playfair Display)
- Dark/light karışım tema (navy + turuncu accent)

## Renk Paleti

| Renk | Kod | Kullanım |
|---|---|---|
| Primary Orange | `#ff6b1a` | Accent, butonlar, vurgu |
| Dark Navy | `#0a1628` | Koyu arka planlar, header/footer |
| Soft Grey | `#f7f9fc` | Açık bölüm arka planları |
| Text | `#1e293b` | Ana metin |

Değiştirmek istersen `css/style.css` en üstteki `:root` bloğundan hepsi kontrol edilebilir.

## Deploy

Tamamen statik olduğu için direkt herhangi bir hosting'e yükleyebilirsin:
- Netlify (drag & drop)
- Vercel
- GitHub Pages
- cPanel / FTP
- Ücretsiz: Cloudflare Pages
