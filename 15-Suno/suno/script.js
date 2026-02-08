// HTML belgesi tamamen yüklendiğinde bu kodu çalıştır
document.addEventListener('DOMContentLoaded', () => {
  // ==== Yardımcılar ====
  const $ = (id) => document.getElementById(id);
  const clean = (arr) => arr.map(s => (s || '').trim()).filter(Boolean);
  const setDisabled = (el, bool) => { el.disabled = !!bool; };

  // ==== DOM Elemanları ====
  const generateButton = $('generateButton');
  const copyButton = $('copyButton');
  const optimizeButton = $('optimizeButton');
  const undoOptimizeButton = $('undoOptimizeButton');
  const clearButton = $('clearButton');
  const resultText = $('result');
  const charCount = $('charCount');
  const usageCount = $('usageCount');

  // Optimize öncesi prompt'u saklamak için
  let beforeOptimizePrompt = '';

  // Form elemanları
  const genre = $('genre');
  const genreType = $('genreType');
  const origin = $('origin');
  const mood = $('mood');
  const tempo = $('tempo');
  const harmonyType = $('harmonyType');
  const turkishStyle = $('turkishStyle');
  const makamContainer = $('makamContainer');
  const makam = $('makam');
  
  // Dünya Müzikleri elemanları
  const worldMusicSection = $('worldMusicSection');
  const worldRegion = $('worldRegion');
  const worldTradition = $('worldTradition');
  const worldInstrument = $('worldInstrument');
  const worldRhythm = $('worldRhythm');
  const worldScale = $('worldScale');
  const worldTexture = $('worldTexture');
  const worldContext = $('worldContext');
  const worldVocals = $('worldVocals');
  const worldAtmosphere = $('worldAtmosphere');

  const structureFlow = $('structureFlow');
  const percussion = $('percussion');
  const bass = $('bass');
  const leadInstrument = $('leadInstrument');
  const accompanyingInstrument = $('accompanyingInstrument');

  const vocal = $('vocal');
  const vocalDetailsContainer = $('vocalDetailsContainer');
  const vocalEffects = $('vocalEffects');
  const vocalTimbre = $('vocalTimbre');
  const femaleVocalRangeContainer = $('femaleVocalRangeContainer');
  const femaleVocalRange = $('femaleVocalRange');
  const maleVocalRangeContainer = $('maleVocalRangeContainer');
  const maleVocalRange = $('maleVocalRange');

  // YENİ ALANLAR (Tutulacak)
  const mixingStyle = $('mixingStyle');
  const vocalAdvancedEffects = $('vocalAdvancedEffects');

  // Formu topluca temizlemek için
  const allSelects = document.querySelectorAll('select');

  // === Türk Müziği Stili "Tercümeleri" ===
  const styleDescriptors = {
  "Arabesk": "Turkish Arabesk - deeply emotional music with makam melodies, quarter tones, lush strings (violins, ouds), darbuka. Vocals performed with Turkish phrasing and vibrato during lyrical sections. Lo-fi warm production emphasizing authentic acoustic instruments",
    
  "Anatolian Rock": "Anatolian Rock - rock fusion with Turkish folk. Electric saz and distorted guitars create makam harmonies. Intro melody is prominent and melodic. Vocals delivered with rock intensity during verses and chorus, blending Turkish and modern elements",
    
    "TSM": (makamValue) => {
      let base = "Turkish Classical Art Music - refined classical tradition with oud, violin, kanun, ney, tanbur in polyphonic textures. Complex makam systems and usul rhythmic cycles";
      if (makamValue) {
        base += `. Performed in ${makamValue} makam with authentic modal structure and quarter-tone inflections`;
      }
      base += ". Vocals executed with Turkish classical technique during composed sections, emphasizing precision and spiritual expression";
      return base;
    },
    
  "Folk": "Turkish Folk Music - Anatolian music centered on saz and kaval/duduk melodies. Modal harmonies with regional variations. Vocals sung in folk style with earthy character during verses. Straightforward structures with percussion",
    
    "Fantezi": "Turkish Fantezi - pop-influenced sentimental music blending tradition with modern production. Intro melody MUST be played on piano. Core instrumentation features prominent piano and lush synth pads throughout, mixed with makam strings and electronic drums. Catchy melodies with vocals delivered in contemporary pop style and polished contemporary sound"
  };

  // === Yapı & Dinamik Akış Kombinasyonları ===
  const structureFlowMap = {
    "classic-pop-rock": {
      structure: "with verse/chorus song structure",
      flow: "building from verse to chorus climax"
    },
    "epic-cinematic": {
      structure: "with full intro-verse-chorus-bridge-outro structure",
      flow: "beginning softly and building to a powerful climax"
    },
    "minimal-ambient": {
      structure: "with a simple, repetitive looping structure",
      flow: "maintaining consistent energy throughout"
    },
    "edm-electronic": {
      structure: "with verse/chorus song structure",
      flow: "with drop and rise dynamics, EDM-style energy shifts"
    },
    "progressive-jazz": {
      structure: "with a complex, through-composed structure",
      flow: "with dynamic ebb and flow, alternating intensity"
    },
    "live-performance": {
      structure: "with verse/chorus song structure",
      flow: "with a gradual build-up of intensity"
    },
    "experimental-free": {
      structure: "with free-form, improvised structure",
      flow: "with dynamic ebb and flow, alternating intensity"
    },
    "intro-heavy": {
      structure: "with full intro-verse-chorus-bridge-outro structure",
      flow: "starting explosively and gradually fading out"
    },
    "ballad-emotional": {
      structure: "following classic AABA pattern structure",
      flow: "starting explosively and gradually fading out"
    },
    "modern-pop-hit": {
      structure: "with verse-chorus-verse-chorus-bridge-chorus pop structure",
      flow: "building from verse to chorus climax"
    }
  };

  // === Genre Türleri (Alt-türler) ===
  const genreTypes = {
    "Alternative": [
      { value: "Alternative Rock", label: "Alternative Rock - Alternatif Rock" },
      { value: "Grunge", label: "Grunge - Grunge" },
      { value: "Indie Rock", label: "Indie Rock - Indie Rock" },
      { value: "New Wave", label: "New Wave - Yeni Dalga" },
      { value: "Post-Punk", label: "Post-Punk - Post-Punk" },
      { value: "Shoegaze", label: "Shoegaze - Shoegaze" }
    ],
    "Pop": [
      { value: "Ballad", label: "Ballad - Balad" },
      { value: "Disco", label: "Disco - Disko" },
      { value: "Alternative Pop", label: "Alternative Pop - Alternatif Pop" },
      { value: "Indie Pop", label: "Indie Pop - Indie Pop" },
      { value: "Synth-pop", label: "Synth-pop - Synth-pop" },
      { value: "Pop Rock", label: "Pop Rock - Pop Rock" }
    ],
    "Rock": [
      { value: "Progressive Rock", label: "Progressive Rock - Progresif Rock" },
      { value: "Alternative Rock", label: "Alternative Rock - Alternatif Rock" },
      { value: "Hard Rock", label: "Hard Rock - Sert Rock" },
      { value: "Psychedelic Rock", label: "Psychedelic Rock - Psikodelik Rock" },
      { value: "Indie Rock", label: "Indie Rock - Indie Rock" }
    ],
    "Acoustic Rock": [
      { value: "Unplugged", label: "Unplugged - Unplugged" },
      { value: "Folk Rock", label: "Folk Rock - Halk Rock" },
      { value: "Singer-Songwriter", label: "Singer-Songwriter - Şarkıcı-Söz Yazarı" }
    ],
    "Blues": [
      { value: "Delta Blues", label: "Delta Blues - Delta Blues" },
      { value: "Chicago Blues", label: "Chicago Blues - Chicago Blues" },
      { value: "Electric Blues", label: "Electric Blues - Elektrik Blues" },
      { value: "Soul Blues", label: "Soul Blues - Soul Blues" }
    ],
    "Acoustic Blues": [
      { value: "Delta", label: "Delta - Delta" },
      { value: "Piedmont", label: "Piedmont - Piedmont" },
      { value: "Fingerstyle", label: "Fingerstyle - Parmak Tarzı" }
    ],
    "Jazz": [
      { value: "Bebop", label: "Bebop - Bebop" },
      { value: "Cool Jazz", label: "Cool Jazz - Soğuk Caz" },
      { value: "Modal Jazz", label: "Modal Jazz - Modal Caz" },
      { value: "Fusion", label: "Fusion - Füzyon" },
      { value: "Smooth Jazz", label: "Smooth Jazz - Pürüzsüz Caz" }
    ],
    "Hip Hop": [
      { value: "Conscious Rap", label: "Conscious Rap - Bilinçli Rap" },
      { value: "Gangsta Rap", label: "Gangsta Rap - Gangsta Rap" },
      { value: "Trap", label: "Trap - Trap" },
      { value: "Mumble Rap", label: "Mumble Rap - Murıldanıp Rap" },
      { value: "Boom-Bap", label: "Boom-Bap - Boom-Bap" }
    ],
    "Lo-fi": [
      { value: "Lo-fi Hip Hop", label: "Lo-fi Hip Hop - Lo-fi Hip Hop" },
      { value: "Lo-fi Pop", label: "Lo-fi Pop - Lo-fi Pop" },
      { value: "Chillhop", label: "Chillhop - Chillhop" },
      { value: "Vaporwave", label: "Vaporwave - Vaporwave" }
    ],
    "Electronic": [
      { value: "Techno", label: "Techno - Tekno" },
      { value: "House", label: "House - House" },
      { value: "Afro House", label: "Afro House - Afro House" },
      { value: "Trance", label: "Trance - Trance" },
      { value: "Dubstep", label: "Dubstep - Dubstep" },
      { value: "Ambient Electronic", label: "Ambient Electronic - Ambiyans Elektronik" },
      { value: "Synth-wave", label: "Synth-wave - Synth-wave" }
    ],
    "Cinematic": [
      { value: "Orchestral", label: "Orchestral - Orkestra" },
      { value: "Dramatic", label: "Dramatic - Dramatik" },
      { value: "Epic", label: "Epic - Epik" },
      { value: "Ambient Cinematic", label: "Ambient Cinematic - Ambiyans Sinematik" }
    ],
    "Folk": [
      { value: "Traditional Folk", label: "Traditional Folk - Geleneksel Halk" },
      { value: "Modern Folk", label: "Modern Folk - Modern Halk" },
      { value: "World Folk", label: "World Folk - Dünya Halk" },
      { value: "Indie Folk", label: "Indie Folk - Indie Halk" }
    ],
    "Reggae": [
      { value: "Roots Reggae", label: "Roots Reggae - Köklü Reggae" },
      { value: "Dancehall", label: "Dancehall - Dansehol" },
      { value: "Ska", label: "Ska - Ska" },
      { value: "Dub", label: "Dub - Dub" }
    ],
    "Country": [
      { value: "Traditional Country", label: "Traditional Country - Geleneksel Country" },
      { value: "Outlaw Country", label: "Outlaw Country - Kaçak Country" },
      { value: "Country Pop", label: "Country Pop - Country Pop" },
      { value: "Honky Tonk", label: "Honky Tonk - Honky Tonk" },
      { value: "Bluegrass", label: "Bluegrass - Bluegrass" }
    ],
    "Metal": [
      { value: "Heavy Metal", label: "Heavy Metal - Ağır Metal" },
      { value: "Thrash Metal", label: "Thrash Metal - Thrash Metal" },
      { value: "Death Metal", label: "Death Metal - Death Metal" },
      { value: "Black Metal", label: "Black Metal - Kara Metal" },
      { value: "Doom Metal", label: "Doom Metal - Doom Metal" },
      { value: "Progressive Metal", label: "Progressive Metal - Progresif Metal" }
    ],
    "Funk": [
      { value: "Groove Funk", label: "Groove Funk - Groove Funk" },
      { value: "Electro-Funk", label: "Electro-Funk - Elektro-Funk" },
      { value: "Fusion Funk", label: "Fusion Funk - Füzyon Funk" }
    ],
    "Soul": [
      { value: "Classic Soul", label: "Classic Soul - Klasik Soul" },
      { value: "Modern Soul", label: "Modern Soul - Modern Soul" },
      { value: "Neo-Soul", label: "Neo-Soul - Neo-Soul" }
    ],
    "R&B": [
      { value: "Classic R&B", label: "Classic R&B - Klasik R&B" },
      { value: "Contemporary R&B", label: "Contemporary R&B - Çağdaş R&B" },
      { value: "Smooth R&B", label: "Smooth R&B - Pürüzsüz R&B" },
      { value: "Hip-Hop R&B", label: "Hip-Hop R&B - Hip-Hop R&B" }
    ],
    "Classical": [
      { value: "Baroque", label: "Baroque - Barok" },
      { value: "Classical Period", label: "Classical Period - Klasik Dönem" },
      { value: "Romantic", label: "Romantic - Romantik" },
      { value: "Contemporary Classical", label: "Contemporary Classical - Çağdaş Klasik" }
    ],
    "Ambient": [
      { value: "Dark Ambient", label: "Dark Ambient - Karanlık Ambiyans" },
      { value: "Space Ambient", label: "Space Ambient - Uzay Ambiyansı" },
      { value: "Meditation", label: "Meditation - Meditasyon" },
      { value: "Nature Ambient", label: "Nature Ambient - Doğa Ambiyansı" }
    ],
    "Latin": [
      { value: "Bolero", label: "Bolero - Bolero" },
      { value: "Tango", label: "Tango - Tango" },
      { value: "Salsa", label: "Salsa - Salsa" },
      { value: "Merengue", label: "Merengue - Merengue" },
      { value: "Cumbia", label: "Cumbia - Cumbia" },
      { value: "Mambo", label: "Mambo - Mambo" },
      { value: "Reggaeton", label: "Reggaeton - Reggaeton" }
    ],
    "Afrobeats": [
      { value: "Afrobeats", label: "Afrobeats - Afrobeats" },
      { value: "Amapiano", label: "Amapiano - Amapiano" },
      { value: "Grime", label: "Grime - Grime" },
      { value: "Afro-Pop", label: "Afro-Pop - Afro-Pop" },
      { value: "Afro-Funk", label: "Afro-Funk - Afro-Funk" }
    ],
    "World Music": [
      { value: "Africa", label: "Afrika (Africa)" },
      { value: "Middle East", label: "Orta Doğu (Middle East)" },
      { value: "Asia", label: "Asya (Asia)" },
      { value: "Europe", label: "Avrupa (Europe)" },
      { value: "Latin America", label: "Latin Amerika (Latin America)" },
      { value: "North America", label: "Kuzey Amerika (North America)" },
      { value: "Oceania", label: "Okyanusya (Oceania)" }
    ]
  };

  // ==== DÜNYA MÜZİKLERİ VERİTABANI ====
  const worldMusicData = {
    "Africa": {
      "Batı Afrika Highlife (West African Highlife)": {
        description: "Celebratory music blending African rhythms with Western instrumentation",
        instruments: ["Elektro Gitar (Electric Guitar)", "Trompet Grubu (Trumpet Section)", "Konga (Congas)", "Şekere (Shekere)", "Konuşan Davul (Talking Drum)"]
      },
      "Afrobeat (Afrobeat)": {
        description: "Fela Kuti's fusion of West African, jazz, highlife, funk, and chanted vocals",
        instruments: ["Korna Grubu (Horn Section)", "Elektro Gitar (Electric Guitar)", "Konga (Congas)", "Konuşan Davul (Talking Drum)", "Org (Organ)"]
      },
      "Mbalax - Senegal (Mbalax - Senegal)": {
        description: "Senegalese dance music with sabar drumming and Cuban influences",
        instruments: ["Sabar Davulları (Sabar Drums)", "Tama Davulu (Tama/Talking Drum)", "Elektro Gitar (Electric Guitar)", "Klavye (Keyboards)"]
      },
      "Soukous/Kongo Rumbası (Soukous/Rumba Congolaise)": {
        description: "Congolese rumba with intricate guitar melodies and dance rhythms",
        instruments: ["Elektro Gitar (Electric Guitar)", "Bas Gitar (Bass Guitar)", "Konga (Congas)", "Likembe (Likembe)"]
      },
      "Güney Afrika Township Cazı (South African Township Jazz)": {
        description: "Jazz from South African townships during apartheid era",
        instruments: ["Saksafon (Saxophone)", "Trompet (Trumpet)", "Piyano (Piano)", "Davul (Drums)"]
      },
      "Kwaito (Kwaito)": {
        description: "South African house music variant with slower tempo and hip-hop elements",
        instruments: ["Elektronik Ritim (Electronic Beats)", "Sentezleyici (Synthesizer)", "Bas (Bass)"]
      }
    },
    "Middle East": {
      "Arap Makamı/Tarab (Arabic Maqam/Tarab)": {
        description: "Classical Arabic music with maqam scales and emotional expression",
        instruments: ["Ud (Oud)", "Kanun (Qanun)", "Ney (Ney)", "Keman (Violin)", "Tabla (Tabla)", "Rık (Riq)"]
      },
      "Pers Klasik Müziği (Persian Classical)": {
        description: "Iranian classical music with dastgah system and poetic lyrics",
        instruments: ["Tar (Tar)", "Setar (Setar)", "Santur (Santur)", "Ney (Ney)", "Tombak (Tombak)"]
      },
      "Mizrahi/İsrail Oryantal (Mizrahi/Israeli Oriental)": {
        description: "Israeli music blending Middle Eastern and Mediterranean influences",
        instruments: ["Ud (Oud)", "Buzuki (Bouzouki)", "Darbuka (Darbuka)", "Keman (Violin)"]
      }
    },
    "Asia": {
      "Hint Klasik - Hindustani (Indian Classical - Hindustani)": {
        description: "North Indian classical with raga system and improvisation",
        instruments: ["Sitar (Sitar)", "Tabla (Tabla)", "Sarangi (Sarangi)", "Bansuri Flütü (Bansuri)", "Armoniyum (Harmonium)"]
      },
      "Hint Klasik - Carnatic (Indian Classical - Carnatic)": {
        description: "South Indian classical music with emphasis on vocals and devotion",
        instruments: ["Vina (Veena)", "Mridangam (Mridangam)", "Ghatam (Ghatam)", "Keman (Violin)", "Flüt (Flute)"]
      },
      "Gamelan - Endonezya (Gamelan - Indonesia)": {
        description: "Indonesian ensemble music with metallic percussion",
        instruments: ["Metalofon (Metallophones)", "Gonglar (Gongs)", "Davullar (Drums)", "Bambu Flüt (Bamboo Flute)", "Rebab (Rebab)"]
      },
      "Japon Geleneksel (Japanese Traditional)": {
        description: "Traditional Japanese music including court and folk traditions",
        instruments: ["Koto (Koto)", "Şamisen (Shamisen)", "Şakuhachi (Shakuhachi)", "Taiko Davulları (Taiko Drums)"]
      },
      "Çin Geleneksel (Chinese Traditional)": {
        description: "Ancient Chinese music with pentatonic scales",
        instruments: ["Erhu (Erhu)", "Guzheng (Guzheng)", "Pipa (Pipa)", "Dizi (Dizi)", "Yangqin (Yangqin)"]
      },
      "Tayland Klasik (Thai Classical)": {
        description: "Court music of Thailand with ornate melodies",
        instruments: ["Ranat Ek (Ranat Ek)", "Khim (Khim)", "Pi (Pi)", "Saw Duang (Saw Duang)"]
      }
    },
    "Europe": {
      "Flamenco (Flamenco)": {
        description: "Passionate Andalusian music with guitar, vocals, and dance",
        instruments: ["Flamenco Gitarı (Flamenco Guitar)", "Cajon (Cajón)", "El Çırpma (Palmas/Handclaps)"]
      },
      "Fado (Fado)": {
        description: "Portuguese melancholic song tradition with saudade emotion",
        instruments: ["Portekiz Gitarı (Portuguese Guitar)", "Klasik Gitar (Classical Guitar)", "Vokal (Vocals)"]
      },
      "Rebetiko - Yunanistan (Rebetiko - Greece)": {
        description: "Greek urban folk music with Ottoman influences",
        instruments: ["Buzuki (Bouzouki)", "Baglama (Baglamas)", "Gitar (Guitar)"]
      },
      "Balkan Brass (Balkan Brass)": {
        description: "Energetic brass band music from Balkans with complex rhythms",
        instruments: ["Trompet (Trumpet)", "Tuba (Tuba)", "Klarnet (Clarinet)", "Saksafon (Saxophone)", "Davul (Drums)"]
      },
      "Kelt Halk Müziği (Celtic Folk)": {
        description: "Traditional music from Ireland, Scotland, Brittany",
        instruments: ["Keman (Fiddle)", "Uilleann Gaydası (Uilleann Pipes)", "Bodhrán (Bodhrán)", "Kalay Düdük (Tin Whistle)", "Harp (Harp)"]
      }
    },
    "Latin America": {
      "Tango (Tango)": {
        description: "Argentine dance music with dramatic emotion and bandoneón",
        instruments: ["Bandoneón (Bandoneón)", "Keman (Violin)", "Piyano (Piano)", "Kontrbas (Double Bass)"]
      },
      "Bossa Nova (Bossa Nova)": {
        description: "Brazilian fusion of samba and jazz with soft vocals",
        instruments: ["Naylon Telli Gitar (Nylon String Guitar)", "Hafif Perküsyon (Light Percussion)", "Bas (Bass)"]
      },
      "Samba (Samba)": {
        description: "Brazilian carnival music with complex polyrhythms",
        instruments: ["Surdo (Surdo)", "Tamborim (Tamborim)", "Agogô (Agogô)", "Cuíca (Cuíca)", "Pandeiro (Pandeiro)"]
      },
      "Salsa (Salsa)": {
        description: "Cuban-Puerto Rican dance music with Afro-Cuban roots",
        instruments: ["Konga (Conga)", "Bongo (Bongos)", "Timbales (Timbales)", "Piyano (Piano)", "Trompet (Trumpet)", "Trombon (Trombone)"]
      },
      "Cumbia (Cumbia)": {
        description: "Colombian folk rhythm with indigenous and African influences",
        instruments: ["Akordeon (Accordion)", "Guacharaca (Guacharaca)", "Tambora (Tambora)", "Bas (Bass)"]
      },
      "Mariachi (Mariachi)": {
        description: "Mexican ensemble music with violins and trumpets",
        instruments: ["Trompet (Trumpet)", "Keman (Violin)", "Guitarrón (Guitarrón)", "Vihuela (Vihuela)", "Gitar (Guitar)"]
      }
    },
    "North America": {
      "Blues (Blues)": {
        description: "African American music tradition with call-response and blue notes",
        instruments: ["Gitar (Guitar)", "Mızıka (Harmonica)", "Piyano (Piano)", "Bas (Bass)", "Davul (Drums)"]
      },
      "Gospel (Gospel)": {
        description: "African American Christian music with powerful vocals",
        instruments: ["Org (Organ)", "Piyano (Piano)", "Koro (Choir)", "Davul (Drums)", "Bas (Bass)"]
      },
      "Yerli Amerikan Geleneksel (Native American Traditional)": {
        description: "Indigenous music with drums, flutes, and chanting",
        instruments: ["Çerçeve Davul (Frame Drum)", "Yerli Flüt (Native Flute)", "Çıngıraklar (Rattles)", "Vokal (Vocals)"]
      },
      "Cajun/Zydeco (Cajun/Zydeco)": {
        description: "Louisiana Creole music with accordion and washboard",
        instruments: ["Akordeon (Accordion)", "Keman (Fiddle)", "Çamaşır Tahtası (Washboard)", "Üçgen (Triangle)"]
      }
    },
    "Oceania": {
      "Aborjin Didgeridoo (Aboriginal Didgeridoo)": {
        description: "Australian Aboriginal music with ancient drone instrument",
        instruments: ["Didgeridoo (Didgeridoo)", "Çubuk Vurmalı (Clapsticks)", "Vokal (Vocals)"]
      },
      "Polinezya Müziği (Polynesian)": {
        description: "Pacific Islander music with ukulele and log drums",
        instruments: ["Ukulele (Ukulele)", "Pate Davulu (Pate/Log Drum)", "Vokal (Vocals)", "Burun Flütü (Nose Flute)"]
      },
      "Maori Müziği (Maori)": {
        description: "New Zealand indigenous music with haka and poi",
        instruments: ["Pūtōrino (Pūtōrino)", "Pūkāea (Pūkāea)", "Poi (Poi)", "Vokal (Vocals)"]
      }
    }
  };

  // ==== Dinamik Menü / Durum Yönetimi ====

  // Karakter sayacını güncelle
  const updateCharCount = () => {
    const count = resultText.value.length;
    charCount.textContent = count;
    
    // Renk kodlaması
    if (count <= 700) {
      charCount.className = 'text-green-400'; // Güvenli
    } else if (count <= 900) {
      charCount.className = 'text-yellow-400'; // Uyarı
    } else {
      charCount.className = 'text-red-400'; // Limit aştı
    }

    // Optimize butonu görünürlüğü
    if (count > 1000) {
      optimizeButton.classList.remove('hidden');
    } else {
      optimizeButton.classList.add('hidden');
    }
  };

  // Vokal UI görünürlüğü ve menüleri
  const updateVocalUI = () => {
    const v = vocal.value;
    const showDetails = v === 'Female' || v === 'Male';

    // Görünürlük
    vocalDetailsContainer.classList.toggle('hidden', !showDetails);
    femaleVocalRangeContainer.classList.toggle('hidden', v !== 'Female');
    maleVocalRangeContainer.classList.toggle('hidden', v !== 'Male');

    // Instrumental seçilince tüm vokal detay menülerini devre dışı bırak
    const isInstrumental = v === 'Instrumental';
    [vocalEffects, vocalTimbre, vocalAdvancedEffects, femaleVocalRange, maleVocalRange].forEach(el => {
      if (!el) return;
      // Sadece ilgili menüyü etkileyelim
      const shouldDisable =
        isInstrumental ||
        (el === femaleVocalRange && v !== 'Female') ||
        (el === maleVocalRange && v !== 'Male') ||
        (!showDetails && (el === vocalEffects || el === vocalTimbre || el === vocalAdvancedEffects));
      setDisabled(el, shouldDisable);
      if (shouldDisable) el.selectedIndex = 0;
    });
  };

  // Genre seçilince Type dropdown'unu güncelle
  const updateGenreTypes = () => {
    const selectedGenre = genre.value;
    genreType.innerHTML = '<option value="">-- Alt-tür seçin --</option>';
    
    if (selectedGenre && genreTypes[selectedGenre]) {
      genreTypes[selectedGenre].forEach(type => {
        const option = document.createElement('option');
        option.value = type.value;
        option.textContent = type.label;
        genreType.appendChild(option);
      });
      genreType.disabled = false;
      
      // World Music seçilince Dünya Müzikleri bölümünü göster
      if (selectedGenre === 'World Music') {
        worldMusicSection.classList.remove('hidden');
      } else {
        worldMusicSection.classList.add('hidden');
        // World Music değilse dünya müzikleri alanlarını temizle
        worldRegion.selectedIndex = 0;
        worldTradition.innerHTML = '<option value="">-- Önce Bölge Seçin --</option>';
        worldInstrument.innerHTML = '<option value="">-- Önce Gelenek Seçin --</option>';
        worldTradition.disabled = true;
        worldInstrument.disabled = true;
      }
    } else {
      genreType.disabled = true;
      worldMusicSection.classList.add('hidden');
    }
  };

  // Dünya Müzikleri bölgesine göre gelenek güncelle
  const updateWorldTraditions = () => {
    const selectedRegion = worldRegion.value;
    worldTradition.innerHTML = '<option value="">-- Önce Bölge Seçin --</option>';
    worldInstrument.innerHTML = '<option value="">-- Önce Gelenek Seçin --</option>';
    
    if (selectedRegion && worldMusicData[selectedRegion]) {
      Object.keys(worldMusicData[selectedRegion]).forEach(tradition => {
        const option = document.createElement('option');
        option.value = tradition;
        option.textContent = tradition;
        worldTradition.appendChild(option);
      });
      worldTradition.disabled = false;
    } else {
      worldTradition.disabled = true;
      worldInstrument.disabled = true;
    }
  };

  // Gelenek seçilince enstrüman güncelle
  const updateWorldInstruments = () => {
    const selectedRegion = worldRegion.value;
    const selectedTradition = worldTradition.value;
    worldInstrument.innerHTML = '<option value="">-- Enstrüman Seçin --</option>';
    
    if (selectedRegion && selectedTradition && worldMusicData[selectedRegion][selectedTradition]) {
      const instruments = worldMusicData[selectedRegion][selectedTradition].instruments;
      instruments.forEach(instrument => {
        const option = document.createElement('option');
        option.value = instrument;
        option.textContent = instrument;
        worldInstrument.appendChild(option);
      });
      worldInstrument.disabled = false;
    } else {
      worldInstrument.disabled = true;
    }
  };

  // Türk Müziği Stili değiştiğinde makam alanını göster/gizle
  const updateTurkishStyleUI = () => {
    const isTSM = turkishStyle.value === 'TSM';
    makamContainer.classList.toggle('hidden', !isTSM);
    if (!isTSM) {
      makam.selectedIndex = 0;
    }
  };

  vocal.addEventListener('change', updateVocalUI);
  genre.addEventListener('change', updateGenreTypes);
  
  // World Music alt-tür seçimi worldRegion'a aktarılır
  genreType.addEventListener('change', () => {
    if (genre.value === 'World Music' && genreType.value) {
      worldRegion.value = genreType.value;
      updateWorldTraditions();
    }
  });
  
  worldRegion.addEventListener('change', updateWorldTraditions);
  worldTradition.addEventListener('change', updateWorldInstruments);
  turkishStyle.addEventListener('change', updateTurkishStyleUI);

  // İlk yüklemede durumları ayarla
  updateVocalUI();
  updateTurkishStyleUI();

  // ==== Textarea Elle Yazma Event Listener ====
  // Kullanıcı prompt alanına elle yazdığında karakter sayacını güncelle
  resultText.addEventListener('input', updateCharCount);

  // ==== Kullanım Sayacı (localStorage) ====
  const getUsageCount = () => {
    return parseInt(localStorage.getItem('sunoPromptCount') || '0', 10);
  };

  const incrementUsageCount = () => {
    const count = getUsageCount() + 1;
    localStorage.setItem('sunoPromptCount', count.toString());
    updateUsageDisplay();
  };

  const updateUsageDisplay = () => {
    if (usageCount) {
      usageCount.textContent = getUsageCount();
    }
  };

  // İlk yüklemede sayacı göster
  updateUsageDisplay();

  // ==== Help/Yardım Accordion Toggle ====
  const helpToggle = $('helpToggle');
  const helpContent = $('helpContent');
  const helpArrow = $('helpArrow');

  if (helpToggle && helpContent && helpArrow) {
    helpToggle.addEventListener('click', () => {
      const isHidden = helpContent.classList.contains('hidden');
      
      if (isHidden) {
        // Açılıyor
        helpContent.classList.remove('hidden');
        helpArrow.style.transform = 'rotate(180deg)';
      } else {
        // Kapanıyor
        helpContent.classList.add('hidden');
        helpArrow.style.transform = 'rotate(0deg)';
      }
    });
  }

  // ==== AKILLI KISALTMA SİSTEMİ ====
  const optimizePrompt = (prompt, maxLength = 1000) => {
    if (prompt.length <= maxLength) return prompt;

    let optimized = prompt;

    // Faz 1: Gereksiz kelimeleri kaldır (anlam korunur)
    const fillerToRemove = [
      { from: /\bwith a\b/gi, to: '' },
      { from: /\bwith an\b/gi, to: '' },
      { from: /\bthat is\b/gi, to: '' },
      { from: /\bthat are\b/gi, to: '' },
      { from: /\bwhich is\b/gi, to: '' },
      { from: /\bwhich are\b/gi, to: '' },
      { from: /\bIt should have\b/gi, to: 'Has' },
      { from: /\bThe piece should feature\b/gi, to: 'Features' },
      { from: /\bshould be\b/gi, to: '' },
      { from: /\band the track should have\b/gi, to: ',' },
      { from: /\bproviding harmonic support\b/gi, to: 'harmony' },
      { from: /\bas the lead melodic voice\b/gi, to: 'lead' },
      { from: /\bcreating harmonic layers\b/gi, to: 'layered' },
      { from: /\batmosphere\b/gi, to: 'feel' }
    ];

    fillerToRemove.forEach(rule => {
      optimized = optimized.replace(rule.from, rule.to);
    });

    // Faz 2: Çoklu boşlukları temizle
    optimized = optimized.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').replace(/\s*\.\s*/g, '. ').trim();

    // Hala uzunsa Faz 3: Uzun ifadeleri kısalt
    if (optimized.length > maxLength) {
      const advancedShortening = [
        { from: /Featuring (.+?) as lead melody with (.+?) harmony/gi, to: 'Lead: $1, harmony: $2' },
        { from: /Centered on (.+?) lead/gi, to: 'Lead: $1' },
        { from: /Built with (.+?) layered/gi, to: '$1 layers' },
        { from: /Foundation built on/gi, to: 'Bass:' },
        { from: /Rhythm driven by/gi, to: 'Drums:' },
        { from: /Vocal range centered in the (.+?) register/gi, to: '$1 range' },
        { from: /Create a piece of music in the style of/gi, to: 'Style:' },
        { from: /Context:/gi, to: '' },
        { from: /Effects applied:/gi, to: 'FX:' },
        { from: /traditional verse\/chorus song structure/gi, to: 'verse/chorus' },
        { from: /building from verse to chorus climax/gi, to: 'builds to climax' },
        { from: /beginning softly and building to a powerful climax/gi, to: 'soft to powerful build' },
        { from: /with a gradual build-up of intensity/gi, to: 'gradual intensity build' }
      ];

      advancedShortening.forEach(rule => {
        optimized = optimized.replace(rule.from, rule.to);
      });

      optimized = optimized.replace(/\s+/g, ' ').trim();
    }

    // Hala uzunsa Faz 4: Az önemli bölümleri kaldır (öncelik sırasına göre)
    if (optimized.length > maxLength) {
      // Context açıklamalarını kaldır
      optimized = optimized.replace(/\.\s*[A-Z][^.]*?(blending|fusion|tradition|featuring)[^.]*\./gi, '.');
      optimized = optimized.replace(/\s+/g, ' ').trim();
    }

    // Son kontrol: Hala çok uzunsa sert kısaltma
    if (optimized.length > maxLength) {
      optimized = optimized.substring(0, maxLength - 3) + '...';
    }

    return optimized;
  };

  // ==== Prompt Oluşturma (SUNO Best Practice) ====
  generateButton.addEventListener('click', () => {
    const sections = {};

    // ============ SECTION 1: INTRO (Track Description) ============
    let introSection = '';
    if (turkishStyle.value) {
      const descriptor = styleDescriptors[turkishStyle.value];
      introSection = typeof descriptor === 'function' ? descriptor(makam.value) : descriptor;
      // Eğer genre veya genreType seçiliyse, fusion/blend ekle
      if (genre.value) {
        if (genreType.value) {
          introSection += `. Fusion with ${genre.value} (${genreType.value})`;
        } else {
          introSection += `. Fusion with ${genre.value}`;
        }
      }
    } else {
      let desc = 'A';
      if (origin.value) desc += ` ${origin.value}`;
      if (genre.value) {
        if (genreType.value) {
          desc += ` ${genre.value} (${genreType.value})`;
        } else {
          desc += ` ${genre.value}`;
        }
      }
      desc += ' track';
      introSection = desc;
    }
    sections.intro = introSection;

    // ============ SECTION 2: FOUNDATION (Harmony, Tempo, Mood, Key) ============
    const foundationParts = [];
    
    if (harmonyType.value) {
      const harmonyMap = {
        'Tonal': 'Tonal harmony with major/minor progression',
        'Modal': 'Modal harmony based on traditional modes',
        'Atonal': 'Atonal, free-form harmonic structure',
        'Pentatonic': 'Pentatonic scale-based melodies'
      };
      foundationParts.push(harmonyMap[harmonyType.value] || harmonyType.value);
    }

    if (tempo.value) {
      foundationParts.push(`at ${tempo.value}`);
    }

    if (mood.value) {
      foundationParts.push(`with a ${mood.value} atmosphere`);
    }

    sections.foundation = foundationParts.length ? foundationParts.join(', ') : '';

    // ============ SECTION 2.5: WORLD MUSIC (Dünya Müzikleri) ============
    const worldMusicParts = [];
    
    if (worldRegion.value && worldTradition.value) {
      const traditionData = worldMusicData[worldRegion.value][worldTradition.value];
      
      // Başlangıç
      worldMusicParts.push(`Create a piece of music in the style of ${worldTradition.value}`);
      
      // Performance Context
      if (worldContext.value) {
        worldMusicParts.push(`intended ${worldContext.value}`);
      }
      
      // Musical Texture + Scale
      if (worldTexture.value && worldScale.value) {
        worldMusicParts.push(`The piece should feature ${worldTexture.value} built on ${worldScale.value}`);
      } else if (worldTexture.value) {
        worldMusicParts.push(`featuring ${worldTexture.value}`);
      } else if (worldScale.value) {
        worldMusicParts.push(`built on ${worldScale.value}`);
      }
      
      // Rhythmic Feel
      if (worldRhythm.value) {
        worldMusicParts.push(`It should have a ${worldRhythm.value} feel`);
      }
      
      // Vocals (sadece Instrumental seçili DEĞİLSE)
      if (worldVocals.value && vocal.value !== 'Instrumental') {
        worldMusicParts.push(`and be ${worldVocals.value}`);
      }
      
      // Lead Instrument
      if (worldInstrument.value) {
        worldMusicParts.push(`The lead instrument is a ${worldInstrument.value}`);
      }
      
      // Atmosphere
      if (worldAtmosphere.value) {
        worldMusicParts.push(`and the track should have an atmosphere ${worldAtmosphere.value}`);
      }
      
      // Description (Context)
      if (traditionData && traditionData.description) {
        worldMusicParts.push(`Context: ${traditionData.description}`);
      }
    }
    
    sections.worldMusic = worldMusicParts.length ? worldMusicParts.join('. ') : '';

    // ============ SECTION 3: INSTRUMENTS (Detailed Combinations) ============
    const instrumentParts = [];

    // Perküsyon + Bas + Lead + Accompanying kombinasyonu
    if (leadInstrument.value || accompanyingInstrument.value || percussion.value || bass.value) {
      let instrumentLine = '';
      
      if (leadInstrument.value && accompanyingInstrument.value) {
        instrumentLine = `Featuring ${leadInstrument.value} as lead melody with ${accompanyingInstrument.value} providing harmonic support`;
      } else if (leadInstrument.value) {
        instrumentLine = `Centered on ${leadInstrument.value} as the lead melodic voice`;
      } else if (accompanyingInstrument.value) {
        instrumentLine = `Built with ${accompanyingInstrument.value} creating harmonic layers`;
      }
      
      if (bass.value) {
        instrumentLine += instrumentLine ? ` and ${bass.value}` : `Foundation built on ${bass.value}`;
      }
      
      if (percussion.value) {
        instrumentLine += instrumentLine ? `, ${percussion.value}` : `Rhythm driven by ${percussion.value}`;
      }
      
      if (instrumentLine) instrumentParts.push(instrumentLine);
    }

    // Mixing & Prodüksiyon Stili (Birleştirildi)
    if (mixingStyle.value) {
      const combinedMap = {
        // Mixing Karakteri
        'Warm mixing': 'warm, rounded tone character',
        'Bright mixing': 'bright, clear high-end frequencies',
        'Dark mixing': 'dark, warm, recessed high frequencies',
        'Balanced mixing': 'balanced, neutral frequency spectrum',
        // Prodüksiyon Tarzı
        'Clean, polished, modern': 'clean, polished, and modern production',
        'Lo-fi, vintage, warm': 'lo-fi, vintage, and warm sound character',
        'Minimal': 'minimal and sparse arrangement',
        'Layered, complex': 'layered and complex arrangement',
        'Raw, live recording': 'raw, live recording aesthetic',
        'Atmospheric, reverb-heavy': 'atmospheric, reverb-rich soundscape'
      };
      instrumentParts.push(combinedMap[mixingStyle.value] || mixingStyle.value);
    }

    sections.instruments = instrumentParts.length ? instrumentParts.join(', ') : '';

    // ============ SECTION 4: STRUCTURE & DYNAMICS (BİRLEŞTİRİLDİ) ============
    const structureParts = [];

    if (structureFlow.value && structureFlowMap[structureFlow.value]) {
      const combo = structureFlowMap[structureFlow.value];
      structureParts.push(combo.structure);
      structureParts.push(combo.flow);
    }

    sections.structure = structureParts.length ? structureParts.join(', ') : '';

    // ============ SECTION 5: VOCALS ============
    const vocalParts = [];
    const selectedVocal = vocal.value;

    if (selectedVocal && selectedVocal !== 'Instrumental') {
      // Vokal tanıtımı
      let vocalIntro = `A ${selectedVocal.toLowerCase()} vocalist`;
      
      if (turkishStyle.value) {
        vocalIntro += ' performing in Turkish Arabesk style' + (turkishStyle.value !== 'Arabesk' ? ` (${turkishStyle.value})` : '');
      } else if (origin.value && origin.value !== 'Turkish') {
        vocalIntro += ` singing in ${origin.value}`;
      }
      
      vocalParts.push(vocalIntro);

      // Vokal Stili - Kısa açıklama kullan
      if (vocalEffects.value) {
        vocalParts.push(vocalEffects.value);
      }

      // Vokal Timbre
      if (vocalTimbre.value) {
        vocalParts.push(`with a ${vocalTimbre.value.toLowerCase()} tone`);
      }

      // Vokal Range
      let rangeText = '';
      if (selectedVocal === 'Female' && femaleVocalRange.value) {
        rangeText = `Vocal range centered in the ${femaleVocalRange.value.toLowerCase()} register`;
      } else if (selectedVocal === 'Male' && maleVocalRange.value) {
        rangeText = `Vocal range centered in the ${maleVocalRange.value.toLowerCase()} register`;
      }
      if (rangeText) vocalParts.push(rangeText);

      // Vokal Efektler
      const effectParts = [];
      if (vocalAdvancedEffects.value) effectParts.push(vocalAdvancedEffects.value);
      
      if (effectParts.length) {
        vocalParts.push(`Effects applied: ${effectParts.join(', ')}`);
      }

    } else if (selectedVocal === 'Instrumental') {
      vocalParts.push('This is an instrumental track with no vocals');
    }

    sections.vocals = vocalParts.length ? vocalParts.join('. ') : '';

    // ============ FINAL PROMPT ASSEMBLY ============
    const finalSections = clean([
      sections.intro,
      sections.foundation,
      sections.worldMusic,
      sections.instruments,
      sections.structure,
      sections.vocals
    ]);

    let finalPrompt = finalSections.join('. ');
    finalPrompt = finalPrompt ? `${finalPrompt}.` : '';
    
    resultText.value = finalPrompt;
    
    // Karakter sayacını güncelle (optimize butonu otomatik gösterilir/gizlenir)
    updateCharCount();
    
    // Kullanım sayacını artır
    if (finalPrompt) {
      incrementUsageCount();
    }
  });

  // ==== Optimize Et Butonu ====
  optimizeButton.addEventListener('click', () => {
    const currentPrompt = resultText.value;
    if (currentPrompt.length <= 1000) return;

    // Geri alma için orijinal prompt'u sakla
    beforeOptimizePrompt = currentPrompt;

    const originalLength = currentPrompt.length;
    const optimizedPrompt = optimizePrompt(currentPrompt, 1000);
    
    resultText.value = optimizedPrompt;
    updateCharCount();
    
    // Geri Al butonunu göster
    undoOptimizeButton.classList.remove('hidden');
    
    console.log(`✅ Prompt optimized: ${originalLength} → ${optimizedPrompt.length} characters`);
    
    // Kullanıcıya geri bildirim
    const originalText = optimizeButton.textContent;
    optimizeButton.textContent = '✅ Optimize Edildi!';
    optimizeButton.classList.remove('bg-orange-600', 'hover:bg-orange-700');
    optimizeButton.classList.add('bg-green-600', 'hover:bg-green-700');
    
    setTimeout(() => {
      optimizeButton.textContent = originalText;
      optimizeButton.classList.remove('bg-green-600', 'hover:bg-green-700');
      optimizeButton.classList.add('bg-orange-600', 'hover:bg-orange-700');
    }, 2000);
  });

  // ==== Geri Al Butonu (Undo Optimize) ====
  undoOptimizeButton.addEventListener('click', () => {
    if (!beforeOptimizePrompt) return;
    
    // Orijinal prompt'u geri yükle
    resultText.value = beforeOptimizePrompt;
    updateCharCount();
    
    // Geri Al butonunu gizle
    undoOptimizeButton.classList.add('hidden');
    
    console.log(`↶ Optimization undone. Restored original prompt (${beforeOptimizePrompt.length} characters)`);
    
    // Kullanıcıya geri bildirim
    undoOptimizeButton.textContent = '✅ Geri Alındı!';
    undoOptimizeButton.classList.remove('bg-gray-600', 'hover:bg-gray-700');
    undoOptimizeButton.classList.add('bg-green-600', 'hover:bg-green-700');
    
    setTimeout(() => {
      undoOptimizeButton.textContent = '↶ Geri Al';
      undoOptimizeButton.classList.remove('bg-green-600', 'hover:bg-green-700');
      undoOptimizeButton.classList.add('bg-gray-600', 'hover:bg-gray-700');
    }, 2000);
    
    // Saklanan prompt'u temizle
    beforeOptimizePrompt = '';
  });

  // ==== Temizle ====
  clearButton.addEventListener('click', () => {
    allSelects.forEach(select => { select.selectedIndex = 0; });
    resultText.value = '';
    charCount.textContent = '0';
    charCount.className = 'text-green-400';

    // Vokal alt menülerini gizle/disable et
    vocalDetailsContainer.classList.add('hidden');
    femaleVocalRangeContainer.classList.add('hidden');
    maleVocalRangeContainer.classList.add('hidden');

    // Tür kilidini sıfırla
    setDisabled(genre, false);

    // Odak ilk alana
    genre.focus();
  });

  // ==== Kopyala (modern API + geri dönüş) ====
  copyButton.addEventListener('click', async () => {
    if (!resultText.value) return;

    const restore = () => {
      copyButton.textContent = 'Kopyala';
      copyButton.classList.remove('bg-blue-500');
      copyButton.classList.add('bg-green-600', 'hover:bg-green-700');
    };

    const copiedUI = () => {
      copyButton.textContent = 'Kopyalandı!';
      copyButton.classList.remove('bg-green-600', 'hover:bg-green-700');
      copyButton.classList.add('bg-blue-500');
      setTimeout(restore, 2000);
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(resultText.value);
        copiedUI();
      } else {
        // Geriye dönük destek
        const textArea = document.createElement('textarea');
        textArea.value = resultText.value;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        copiedUI();
      }
    } catch (err) {
      console.error('Kopyalama başarısız oldu:', err);
    }
  });
});
