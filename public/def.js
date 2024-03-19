class Special {
  $tpl = '<div class="special-panel"><div class="special-font-size"><span>Шрифт:</span> <button title="Маленький шрифт" value="1"><i>A</i></button> <button title="Средний шрифт" value="2"><i>A</i></button> <button title="Большой шрифт" value="3"><i>A</i></button></div><div class="special-color"><span>Цвет:</span> <button title="Цвет черным по белому" value="1"><i>Ц</i></button> <button title="Цвет белым по черному" value="2"><i>Ц</i></button> <button title="Цвет синим по голубому" value="3" i=""><i>Ц</i></button></div><div class="special-images"><span>Изображения:</span> <button title="Выключить/включить изображения"><i></i></button></div><div class="special-audio"><span>Звук:</span> <button title="Включить/выключить воспроизведение текста" value="0"><i></i></button></div><div class="special-settings"><span>Настройки:</span> <button title="Дополнительные настройки"><i></i></button></div><div class="special-quit"><span>Обычная версия:</span> <button title="Обычная версия сайта"><i></i></button></div></div><div id="special-settings-body"><hr/><h2>Настройки шрифта:</h2><div class="special-font-family"><span>Выберите шрифт:</span> <button value="1"><i>Arial</i></button> <button value="2"><i>Times</i></button></div><div class="special-letter-spacing"><span>Интервал между буквами (<em>Кернинг</em>):</span> <button value="1"><i>Стандартный</i></button> <button value="2"><i>Средний</i></button> <button value="3"><i>Большой</i></button></div><div class="special-line-height"><span>Интервал между строками:</span> <button value="1"><i>Стандартный<br/>интервал</i></button> <button value="2"><i>Полуторный<br/>интервал</i></button> <button value="3"><i>Двойной<br/>интервал</i></button></div><h2>Выбор цветовой схемы:</h2><div class="special-color"><button value="1"><i>Черным<br/>по белому</i></button> <button value="2"><i>Белым<br/>по черному</i></button> <button value="3"><i>Темно-синим<br/>по голубому</i></button> <button value="4"><i>Коричневым<br/>по бежевому</i></button> <button value="5"><i>Зеленым<br/>по темно-коричневому</i></button></div><hr/><div class="special-reset"><button><i>Параметры по умолчанию</i></button></div><div class="special-settings-close"><button><i>Закрыть</i></button></div><div class="avtor"><a href="//lidrekon.ru" target="_blank">lidrekon.ru</a></div></div>';
  $ua = window.navigator.userAgent;
  $msie;
  $special;
  $subversion;
  $responsiveVoice;
  isResponsiveVoice = false;

  constructor (responsiveVoice) {
    this.$special = this.getSpecialCookie();
    this.$msie = this.$ua.indexOf("MSIE ");
    
    if (responsiveVoice) {
      this.isResponsiveVoice = true;
      this.$responsiveVoice = responsiveVoice;
    }

    if (document.querySelectorAll("#specialButton").length) {
        this.$subversion = "lite";
        if (this.$special && this.$special.active) this.On();
        document.querySelector("#specialButton").addEventListener("click", () => this.On());
    } else {
        this.$subversion = "pro";
        this.On();
    }
  }

  onSpecialClick (event) {
    const specialButton = event.currentTarget;
    const specialValue = specialButton.value || null;
    const action = specialButton.parentNode.className.replace('special-', '');
    const defaultAction = () => {
      specialButton.classList.add("active");
      document.querySelector("html").removeClassWild("special-" + action + "-*")
      document.querySelector("html").classList.add("special-" + action + "-" + specialValue);
      this.setSpecialCookie();
    }

    if (!action) return;

    specialButton.classList.remove("active");

    switch (action) {
      case "color":
        this.$special.color = parseInt(specialValue);
        defaultAction();
        break;
      case "font-size":
        this.$special.font_size = parseInt(specialValue);
        defaultAction();
        break;
      case "font-family":
        this.$special.font_family = parseInt(specialValue);
        defaultAction();
        break;
      case "line-height":
        this.$special.line_height = parseInt(specialValue);
        defaultAction();
        break;
      case "letter-spacing":
        this.$special.letter_spacing = parseInt(specialValue);
        defaultAction();
        break;
      case "images":
        this.$special.images = this.$special.images ? 0 : 1;
        specialButton.value = this.$special.images;
        this.ToggleImages();
        this.setSpecialCookie();
        break;
      case "audio":
        const mouseOver = (event) => {
          if (this.$responsiveVoice.isPlaying()) this.$responsiveVoice.cancel();
          this.$responsiveVoice.speak(event.target.innerText.trim(), "Russian Female");
        }
        const bindedMouseOver = mouseOver.bind(this);
        if(specialButton.value == 1) {
          const special_audio = document.querySelector("i.special-audio");
          if (special_audio) special_audio.remove();
          if (this.$responsiveVoice.isPlaying()) this.$responsiveVoice.cancel();
          document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li,dt,dd,.audiotext").forEach(el => {
            el.removeEventListener('mouseove', bindedMouseOver);
          });
          specialButton.value = 0;
        } else {
          this.$responsiveVoice.speak("Включено озвучивание текста.", "Russian Female");
          specialButton.classList.add("active");
          specialButton.value = 1;
          document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li,dt,dd,.audiotext,a,b").forEach(el => {
            el.addEventListener("mouseover", bindedMouseOver);
          });
        }
        break;
      case "settings":
        document.querySelector("#special-settings-body").slideToggle();
        break;
      case "settings-close":
        document.querySelector("#special-settings-body").slideUp();
        break;
      case "reset":
        this.Reset();
        this.Set();
        document.querySelector("#special-settings-body").slideUp();
        break;
      case "quit":
        this.Off();
        break;
      }
  }

  Reset () {
    this.$special = {
      active: 1,
      color: 1, 
      font_family: 1,
      font_size: 1,
      line_height: 1,
      letter_spacing: 1,
      images: 1
    };
    this.setSpecialCookie();
  }

  Set () {
    const html = document.querySelector('html');
    html.removeClassWild("special-*");
    html.classList.add("special-color-" + this.$special.color);
    html.classList.add("special-font-size-" + this.$special.font_size);
    html.classList.add("special-font-family-" + this.$special.font_family);
    html.classList.add("special-line-height-" + this.$special.line_height);
    html.classList.add("special-letter-spacing-" + this.$special.letter_spacing);
    html.classList.add("special-images-" + this.$special.images);
    document.querySelector("#special button").classList.remove("active");
    document.querySelector(`.special-color button[value="${this.$special.color}"]`).classList.add("active");
    document.querySelector(`.special-font-size button[value="${this.$special.font_size}"]`).classList.add("active");
    document.querySelector(`.special-font-family button[value="${this.$special.font_family}"]`).classList.add("active");
    document.querySelector(`.special-line-height button[value="${this.$special.line_height}"]`).classList.add("active");
    document.querySelector(`.special-letter-spacing button[value="${this.$special.letter_spacing}"]`).classList.add("active");
    document.querySelector('.special-images button').value = this.$special.images;

    this.ToggleImages();
  }

  ToggleImages () {
    document.querySelectorAll("img").forEach(el => {
      if (this.$special.images) {
        if (el.dataset['src']) el.setAttribute('src', el.dataset['src']);
        if (el.dataset['srcset']) el.setAttribute('srcset', el.dataset['srcset']);
      } else {
        el.dataset['src'] = el.getAttribute('src');
        if (el.getAttribute('srcset')) el.dataset['srcsest'] = el.getAttribute('srcset');
        el.removeAttribute('src');
        if (el.getAttribute('srcset')) el.removeAttribute('srcset');
      }
    });
  }

  Off () {
    if (document.querySelectorAll("#specialButton").length) {
      const html = document.querySelector('html');
      const audio = document.querySelector('audio');
      const special_audio = document.querySelector('i.special-audio');
      const special = document.querySelector('#special');

      if (this.$responsiveVoice.isPlaying()) this.$responsiveVoice.cancel();
      if (audio) audio.remove();
      if (special_audio) special_audio.remove();
      special.remove();
      html.classList.remove("special");
      html.removeClassWild("special-*");
      document.querySelector("#specialButton").style.display = "block";
      this.removeSpecialCookie();
    } else {
      if (this.$msie > 0) {
        const url = window.location + "";
        if (url.indexOf("template=") >= 0) {
          window.location = url.replace(/template=\d+/g, "template=0");
        } else {
          window.location = url + "?template=0";
        }
      } else {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
          window.location = window.location.origin + window.location.pathname;
        };
        httpRequest.open('POST', window.location.origin + window.location.pathname);
        httpRequest.send('template=' + encodeURIComponent(0));
      }
    }
  }

  On () {
    const styleSheet = document.createElement('link');
    styleSheet.setAttribute('rel', 'stylesheet');
    styleSheet.setAttribute('type', 'text/css');
    styleSheet.setAttribute('href', '//lidrekon.ru/slep/css/special.min.css');
    document.querySelector("head").append(styleSheet);

    if (!this.$special) this.Reset();
    if (document.querySelectorAll("#specialButton").length) {
      this.$special.active = 1;
      document.querySelector("#specialButton").style.display = "none";
      this.setSpecialCookie();
    }

    const specialDiv = document.createElement('div');
    specialDiv.setAttribute('id', 'special');
    specialDiv.innerHTML = this.$tpl;
    document.querySelector("body").prepend(specialDiv);
    document.querySelector("html").classList.add("special");
    this.Set();
    this.setSpecialClick();
  }

  setSpecialClick () {
    document
      .querySelectorAll('#special button')
      .forEach(btn => btn.addEventListener('click', event => this.onSpecialClick(event)));
  }

  getSpecialCookie (name='special') {
    const matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches && matches[1] ? JSON.parse(matches[1]) : undefined;
  }

  setSpecialCookie () {
    document.cookie = `special=${JSON.stringify(this.$special)}; path=/;`;
  }

  removeSpecialCookie () {
    document.cookie = 'special= ;';
  }
}

class ResponsiveVoice {
  debug = false;

  iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
  iOS9 = /(iphone|ipod|ipad).* os 9_/.test(navigator.userAgent.toLowerCase()) || /(iphone|ipod|ipad).* os 10_/.test(navigator.userAgent.toLowerCase());
  is_chrome = -1 < navigator.userAgent.indexOf("Chrome");
  is_safari = -1 < navigator.userAgent.indexOf("Safari");
  is_opera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
  is_android = -1 < navigator.userAgent.toLowerCase().indexOf("android");
  iOS_initialized = false;
  iOS9_initialized = false;

  systemvoices = null;
  voicesupport_attempts = 0;

  CHARACTER_LIMIT = 100;
  VOICESUPPORT_ATTEMPTLIMIT = 5;
  WORDS_PER_MINUTE = 130;

  fallbackMode = false;
  fallback_parts = null;
  fallback_audio = null;
  fallback_part_index = 0;
  fallback_playbackrate = 1;
  fallback_audiopool = [];
  
  utterances = [];
  OnLoad_callbacks = [];
  
  useTimer = false;
  timeoutId = null;
  default_rv = null;
  msgparameters = null;
  fallbackServicePath = null;
  def_fallback_playbackrate = null;

  responsivevoices = [
    { name: "UK English Female", flag: "gb", gender: "f", voiceIDs: [3, 5, 1, 6, 7, 171, 201, 8] },
    { name: "UK English Male", flag: "gb", gender: "m", voiceIDs: [0, 4, 2, 75, 202, 159, 6, 7] },
    { name: "US English Female", flag: "us", gender: "f", voiceIDs: [39, 40, 41, 42, 43, 173, 205, 204, 235, 44] },
    { name: "Arabic Male", flag: "ar", gender: "m", voiceIDs: [96, 95, 97, 196, 98], deprecated: true },
    { name: "Arabic Female", flag: "ar", gender: "f", voiceIDs: [96, 95, 97, 196, 98] },
    { name: "Armenian Male", flag: "hy", gender: "f", voiceIDs: [99] },
    { name: "Australian Female", flag: "au", gender: "f", voiceIDs: [87, 86, 5, 201, 88] },
    { name: "Brazilian Portuguese Female", flag: "br", gender: "f", voiceIDs: [245, 124, 123, 125, 186, 223, 126] },
    { name: "Chinese Female", flag: "cn", gender: "f", voiceIDs: [249, 58, 59, 60, 155, 191, 231, 61] },
    { name: "Chinese (Hong Kong) Female", flag: "hk", gender: "f", voiceIDs: [192, 193, 232, 250, 251, 252] },
    { name: "Chinese Taiwan Female", flag: "tw", gender: "f", voiceIDs: [252, 194, 233, 253, 254, 255] },
    { name: "Czech Female", flag: "cz", gender: "f", voiceIDs: [101, 100, 102, 197, 103] },
    { name: "Danish Female", flag: "dk", gender: "f", voiceIDs: [105, 104, 106, 198, 107] },
    { name: "Deutsch Female", flag: "de", gender: "f", voiceIDs: [27, 28, 29, 30, 31, 78, 170, 199, 32] },
    { name: "Dutch Female", flag: "nl", gender: "f", voiceIDs: [243, 219, 84, 157, 158, 184, 45] },
    { name: "Finnish Female", flag: "fi", gender: "f", voiceIDs: [90, 89, 91, 209, 92] },
    { name: "French Female", flag: "fr", gender: "f", voiceIDs: [240, 21, 22, 23, 77, 178, 210, 26] },
    { name: "Greek Female", flag: "gr", gender: "f", voiceIDs: [62, 63, 80, 200, 64] },
    { name: "Hatian Creole Female", flag: "ht", gender: "f", voiceIDs: [109] },
    { name: "Hindi Female", flag: "hi", gender: "f", voiceIDs: [247, 66, 154, 179, 213, 67] },
    { name: "Hungarian Female", flag: "hu", gender: "f", voiceIDs: [9, 10, 81, 214, 11] },
    { name: "Indonesian Female", flag: "id", gender: "f", voiceIDs: [241, 111, 112, 180, 215, 113] },
    { name: "Italian Female", flag: "it", gender: "f", voiceIDs: [242, 33, 34, 35, 36, 37, 79, 181, 216, 38] },
    { name: "Japanese Female", flag: "jp", gender: "f", voiceIDs: [248, 50, 51, 52, 153, 182, 217, 53] },
    { name: "Korean Female", flag: "kr", gender: "f", voiceIDs: [54, 55, 56, 156, 183, 218, 57] },
    { name: "Latin Female", flag: "va", gender: "f", voiceIDs: [114] },
    { name: "Norwegian Female", flag: "no", gender: "f", voiceIDs: [72, 73, 221, 74] },
    { name: "Polish Female", flag: "pl", gender: "f", voiceIDs: [244, 120, 119, 121, 185, 222, 122] },
    { name: "Portuguese Female", flag: "br", gender: "f", voiceIDs: [128, 127, 129, 187, 224, 130] },
    { name: "Romanian Male", flag: "ro", gender: "m", voiceIDs: [151, 150, 152, 225, 46] },
    { name: "Russian Female", flag: "ru", gender: "f", voiceIDs: [246, 47, 48, 83, 188, 226, 49] },
    { name: "Slovak Female", flag: "sk", gender: "f", voiceIDs: [133, 132, 134, 227, 135] },
    { name: "Spanish Female", flag: "es", gender: "f", voiceIDs: [19, 238, 16, 17, 18, 20, 76, 174, 207, 15] },
    { name: "Spanish Latin American Female", flag: "es", gender: "f", voiceIDs: [239, 137, 136, 138, 175, 208, 139] },
    { name: "Swedish Female", flag: "sv", gender: "f", voiceIDs: [85, 148, 149, 228, 65] },
    { name: "Tamil Male", flag: "hi", gender: "m", voiceIDs: [141] },
    { name: "Thai Female", flag: "th", gender: "f", voiceIDs: [143, 142, 144, 189, 229, 145] },
    { name: "Turkish Female", flag: "tr", gender: "f", voiceIDs: [69, 70, 82, 190, 230, 71] },
    { name: "Afrikaans Male", flag: "af", gender: "m", voiceIDs: [93] },
    { name: "Albanian Male", flag: "sq", gender: "m", voiceIDs: [94] },
    { name: "Bosnian Male", flag: "bs", gender: "m", voiceIDs: [14] },
    { name: "Catalan Male", flag: "catalonia", gender: "m", voiceIDs: [68] },
    { name: "Croatian Male", flag: "hr", gender: "m", voiceIDs: [13] },
    { name: "Czech Male", flag: "cz", gender: "m", voiceIDs: [161] },
    { name: "Danish Male", flag: "da", gender: "m", voiceIDs: [162], deprecated: true },
    { name: "Esperanto Male", flag: "eo", gender: "m", voiceIDs: [108] },
    { name: "Finnish Male", flag: "fi", gender: "m", voiceIDs: [160], deprecated: true },
    { name: "Greek Male", flag: "gr", gender: "m", voiceIDs: [163], deprecated: true },
    { name: "Hungarian Male", flag: "hu", gender: "m", voiceIDs: [164] },
    { name: "Icelandic Male", flag: "is", gender: "m", voiceIDs: [110] },
    { name: "Latin Male", flag: "va", gender: "m", voiceIDs: [165], deprecated: true },
    { name: "Latvian Male", flag: "lv", gender: "m", voiceIDs: [115] },
    { name: "Macedonian Male", flag: "mk", gender: "m", voiceIDs: [116] },
    { name: "Moldavian Male", flag: "md", gender: "m", voiceIDs: [117] },
    { name: "Montenegrin Male", flag: "me", gender: "m", voiceIDs: [118] },
    { name: "Norwegian Male", flag: "no", gender: "m", voiceIDs: [166] },
    { name: "Serbian Male", flag: "sr", gender: "m", voiceIDs: [12] },
    { name: "Serbo-Croatian Male", flag: "hr", gender: "m", voiceIDs: [131] },
    { name: "Slovak Male", flag: "sk", gender: "m", voiceIDs: [167], deprecated: true },
    { name: "Swahili Male", flag: "sw", gender: "m", voiceIDs: [140] },
    { name: "Swedish Male", flag: "sv", gender: "m", voiceIDs: [168], deprecated: true },
    { name: "Vietnamese Male", flag: "vi", gender: "m", voiceIDs: [146], deprecated: true },
    { name: "Welsh Male", flag: "cy", gender: "m", voiceIDs: [147] },
    { name: "US English Male", flag: "us", gender: "m", voiceIDs: [0, 4, 2, 6, 7, 75, 159, 234, 236, 237] },
    { name: "Fallback UK Female", flag: "gb", gender: "f", voiceIDs: [8] },
  ];

  voicecollection = [
    { name: "Google UK English Male" },
    { name: "Agnes" },
    { name: "Daniel Compact" },
    { name: "Google UK English Female" },
    { name: "en-GB", rate: 0.25, pitch: 1 },
    { name: "en-AU", rate: 0.25, pitch: 1 },
    { name: "inglés Reino Unido" },
    { name: "English United Kingdom" },
    { name: "Fallback en-GB Female", lang: "en-GB", fallbackvoice: !0 },
    { name: "Eszter Compact" },
    { name: "hu-HU", rate: 0.4 },
    { name: "Fallback Hungarian", lang: "hu", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Serbian", lang: "sr", fallbackvoice: !0 },
    { name: "Fallback Croatian", lang: "hr", fallbackvoice: !0 },
    { name: "Fallback Bosnian", lang: "bs", fallbackvoice: !0 },
    { name: "Fallback Spanish", lang: "es", fallbackvoice: !0 },
    { name: "Spanish Spain" },
    { name: "español España" },
    { name: "Diego Compact", rate: 0.3 },
    { name: "Google Español" },
    { name: "es-ES", rate: 0.2 },
    { name: "Google Français" },
    { name: "French France" },
    { name: "francés Francia" },
    { name: "Virginie Compact", rate: 0.5 },
    { name: "fr-FR", rate: 0.25 },
    { name: "Fallback French", lang: "fr", fallbackvoice: !0 },
    { name: "Google Deutsch" },
    { name: "German Germany" },
    { name: "alemán Alemania" },
    { name: "Yannick Compact", rate: 0.5 },
    { name: "de-DE", rate: 0.25 },
    { name: "Fallback Deutsch", lang: "de", fallbackvoice: !0 },
    { name: "Google Italiano" },
    { name: "Italian Italy" },
    { name: "italiano Italia" },
    { name: "Paolo Compact", rate: 0.5 },
    { name: "it-IT", rate: 0.25 },
    { name: "Fallback Italian", lang: "it", fallbackvoice: !0 },
    { name: "Google US English", timerSpeed: 1 },
    { name: "English United States" },
    { name: "inglés Estados Unidos" },
    { name: "Vicki" },
    { name: "en-US", rate: 0.2, pitch: 1, timerSpeed: 1.3 },
    { name: "Fallback English", lang: "en-US", fallbackvoice: !0, timerSpeed: 0 },
    { name: "Fallback Dutch", lang: "nl", fallbackvoice: !0, timerSpeed: 0 },
    { name: "Fallback Romanian", lang: "ro", fallbackvoice: !0 },
    { name: "Milena Compact" },
    { name: "ru-RU", rate: 0.25 },
    { name: "Fallback Russian", lang: "ru_RU", fallbackvoice: !0 },
    { name: "Google 日本人", timerSpeed: 1 },
    { name: "Kyoko Compact" },
    { name: "ja-JP", rate: 0.25 },
    { name: "Fallback Japanese", lang: "ja", fallbackvoice: !0 },
    { name: "Google 한국의", timerSpeed: 1 },
    { name: "Narae Compact" },
    { name: "ko-KR", rate: 0.25 },
    { name: "Fallback Korean", lang: "ko", fallbackvoice: !0 },
    { name: "Google 中国的", timerSpeed: 1 },
    { name: "Ting-Ting Compact" },
    { name: "zh-CN", rate: 0.25 },
    { name: "Fallback Chinese", lang: "zh-CN", fallbackvoice: !0 },
    { name: "Alexandros Compact" },
    { name: "el-GR", rate: 0.25 },
    { name: "Fallback Greek", lang: "el", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Swedish", lang: "sv", fallbackvoice: !0, service: "g2" },
    { name: "hi-IN", rate: 0.25 },
    { name: "Fallback Hindi", lang: "hi", fallbackvoice: !0 },
    { name: "Fallback Catalan", lang: "ca", fallbackvoice: !0 },
    { name: "Aylin Compact" },
    { name: "tr-TR", rate: 0.25 },
    { name: "Fallback Turkish", lang: "tr", fallbackvoice: !0 },
    { name: "Stine Compact" },
    { name: "no-NO", rate: 0.25 },
    { name: "Fallback Norwegian", lang: "no", fallbackvoice: !0, service: "g2" },
    { name: "Daniel" },
    { name: "Monica" },
    { name: "Amelie" },
    { name: "Anna" },
    { name: "Alice" },
    { name: "Melina" },
    { name: "Mariska" },
    { name: "Yelda" },
    { name: "Milena" },
    { name: "Xander" },
    { name: "Alva" },
    { name: "Lee Compact" },
    { name: "Karen" },
    { name: "Fallback Australian", lang: "en-AU", fallbackvoice: !0 },
    { name: "Mikko Compact" },
    { name: "Satu" },
    { name: "fi-FI", rate: 0.25 },
    { name: "Fallback Finnish", lang: "fi", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Afrikans", lang: "af", fallbackvoice: !0 },
    { name: "Fallback Albanian", lang: "sq", fallbackvoice: !0 },
    { name: "Maged Compact" },
    { name: "Tarik" },
    { name: "ar-SA", rate: 0.25 },
    { name: "Fallback Arabic", lang: "ar", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Armenian", lang: "hy", fallbackvoice: !0, service: "g2" },
    { name: "Zuzana Compact" },
    { name: "Zuzana" },
    { name: "cs-CZ", rate: 0.25 },
    { name: "Fallback Czech", lang: "cs", fallbackvoice: !0, service: "g2" },
    { name: "Ida Compact" },
    { name: "Sara" },
    { name: "da-DK", rate: 0.25 },
    { name: "Fallback Danish", lang: "da", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Esperanto", lang: "eo", fallbackvoice: !0 },
    { name: "Fallback Hatian Creole", lang: "ht", fallbackvoice: !0 },
    { name: "Fallback Icelandic", lang: "is", fallbackvoice: !0 },
    { name: "Damayanti" },
    { name: "id-ID", rate: 0.25 },
    { name: "Fallback Indonesian", lang: "id", fallbackvoice: !0 },
    { name: "Fallback Latin", lang: "la", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Latvian", lang: "lv", fallbackvoice: !0 },
    { name: "Fallback Macedonian", lang: "mk", fallbackvoice: !0 },
    { name: "Fallback Moldavian", lang: "mo", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Montenegrin", lang: "sr-ME", fallbackvoice: !0 },
    { name: "Agata Compact" },
    { name: "Zosia" },
    { name: "pl-PL", rate: 0.25 },
    { name: "Fallback Polish", lang: "pl", fallbackvoice: !0 },
    { name: "Raquel Compact" },
    { name: "Luciana" },
    { name: "pt-BR", rate: 0.25 },
    { name: "Fallback Brazilian Portugese", lang: "pt-BR", fallbackvoice: !0, service: "g2" },
    { name: "Joana Compact" },
    { name: "Joana" },
    { name: "pt-PT", rate: 0.25 },
    { name: "Fallback Portuguese", lang: "pt-PT", fallbackvoice: !0 },
    { name: "Fallback Serbo-Croation", lang: "sh", fallbackvoice: !0, service: "g2" },
    { name: "Laura Compact" },
    { name: "Laura" },
    { name: "sk-SK", rate: 0.25 },
    { name: "Fallback Slovak", lang: "sk", fallbackvoice: !0, service: "g2" },
    { name: "Javier Compact" },
    { name: "Paulina" },
    { name: "es-MX", rate: 0.25 },
    { name: "Fallback Spanish (Latin American)", lang: "es-419", fallbackvoice: !0, service: "g2" },
    { name: "Fallback Swahili", lang: "sw", fallbackvoice: !0 },
    { name: "Fallback Tamil", lang: "ta", fallbackvoice: !0 },
    { name: "Narisa Compact" },
    { name: "Kanya" },
    { name: "th-TH", rate: 0.25 },
    { name: "Fallback Thai", lang: "th", fallbackvoice: !0 },
    { name: "Fallback Vietnamese", lang: "vi", fallbackvoice: !0 },
    { name: "Fallback Welsh", lang: "cy", fallbackvoice: !0 },
    { name: "Oskar Compact" },
    { name: "sv-SE", rate: 0.25 },
    { name: "Simona Compact" },
    { name: "Ioana" },
    { name: "ro-RO", rate: 0.25 },
    { name: "Kyoko" },
    { name: "Lekha" },
    { name: "Ting-Ting" },
    { name: "Yuna" },
    { name: "Xander Compact" },
    { name: "nl-NL", rate: 0.25 },
    { name: "Fallback UK English Male", lang: "en-GB", fallbackvoice: !0, service: "g1", voicename: "rjs" },
    { name: "Finnish Male", lang: "fi", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Czech Male", lang: "cs", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Danish Male", lang: "da", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Greek Male", lang: "el", fallbackvoice: !0, service: "g1", voicename: "", rate: 0.25 },
    { name: "Hungarian Male", lang: "hu", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Latin Male", lang: "la", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Norwegian Male", lang: "no", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Slovak Male", lang: "sk", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Swedish Male", lang: "sv", fallbackvoice: !0, service: "g1", voicename: "" },
    { name: "Fallback US English Male", lang: "en", fallbackvoice: !0, service: "tts-api", voicename: "" },
    { name: "German Germany", lang: "de_DE" },
    { name: "English United Kingdom", lang: "en_GB" },
    { name: "English India", lang: "en_IN" },
    { name: "English United States", lang: "en_US" },
    { name: "Spanish Spain", lang: "es_ES" },
    { name: "Spanish Mexico", lang: "es_MX" },
    { name: "Spanish United States", lang: "es_US" },
    { name: "French Belgium", lang: "fr_BE" },
    { name: "French France", lang: "fr_FR" },
    { name: "Hindi India", lang: "hi_IN" },
    { name: "Indonesian Indonesia", lang: "in_ID" },
    { name: "Italian Italy", lang: "it_IT" },
    { name: "Japanese Japan", lang: "ja_JP" },
    { name: "Korean South Korea", lang: "ko_KR" },
    { name: "Dutch Netherlands", lang: "nl_NL" },
    { name: "Polish Poland", lang: "pl_PL" },
    { name: "Portuguese Brazil", lang: "pt_BR" },
    { name: "Portuguese Portugal", lang: "pt_PT" },
    { name: "Russian Russia", lang: "ru_RU" },
    { name: "Thai Thailand", lang: "th_TH" },
    { name: "Turkish Turkey", lang: "tr_TR" },
    { name: "Chinese China", lang: "zh_CN_#Hans" },
    { name: "Chinese Hong Kong", lang: "zh_HK_#Hans" },
    { name: "Chinese Hong Kong", lang: "zh_HK_#Hant" },
    { name: "Chinese Taiwan", lang: "zh_TW_#Hant" },
    { name: "Alex" },
    { name: "Maged", lang: "ar-SA" },
    { name: "Zuzana", lang: "cs-CZ" },
    { name: "Sara", lang: "da-DK" },
    { name: "Anna", lang: "de-DE" },
    { name: "Melina", lang: "el-GR" },
    { name: "Karen", lang: "en-AU" },
    { name: "Daniel", lang: "en-GB" },
    { name: "Moira", lang: "en-IE" },
    { name: "Samantha (Enhanced)", lang: "en-US" },
    { name: "Samantha", lang: "en-US" },
    { name: "Tessa", lang: "en-ZA" },
    { name: "Monica", lang: "es-ES" },
    { name: "Paulina", lang: "es-MX" },
    { name: "Satu", lang: "fi-FI" },
    { name: "Amelie", lang: "fr-CA" },
    { name: "Thomas", lang: "fr-FR" },
    { name: "Carmit", lang: "he-IL" },
    { name: "Lekha", lang: "hi-IN" },
    { name: "Mariska", lang: "hu-HU" },
    { name: "Damayanti", lang: "id-ID" },
    { name: "Alice", lang: "it-IT" },
    { name: "Kyoko", lang: "ja-JP" },
    { name: "Yuna", lang: "ko-KR" },
    { name: "Ellen", lang: "nl-BE" },
    { name: "Xander", lang: "nl-NL" },
    { name: "Nora", lang: "no-NO" },
    { name: "Zosia", lang: "pl-PL" },
    { name: "Luciana", lang: "pt-BR" },
    { name: "Joana", lang: "pt-PT" },
    { name: "Ioana", lang: "ro-RO" },
    { name: "Milena", lang: "ru-RU" },
    { name: "Laura", lang: "sk-SK" },
    { name: "Alva", lang: "sv-SE" },
    { name: "Kanya", lang: "th-TH" },
    { name: "Yelda", lang: "tr-TR" },
    { name: "Ting-Ting", lang: "zh-CN" },
    { name: "Sin-Ji", lang: "zh-HK" },
    { name: "Mei-Jia", lang: "zh-TW" },
    { name: "Microsoft David Mobile - English (United States)", lang: "en-US" },
    { name: "Microsoft Zira Mobile - English (United States)", lang: "en-US" },
    { name: "Microsoft Mark Mobile - English (United States)", lang: "en-US" },
    { name: "native", lang: "" },
    { name: "Google español" },
    { name: "Google español de Estados Unidos" },
    { name: "Google français" },
    { name: "Google Bahasa Indonesia" },
    { name: "Google italiano" },
    { name: "Google Nederlands" },
    { name: "Google polski" },
    { name: "Google português do Brasil" },
    { name: "Google русский" },
    { name: "Google हिन्दी" },
    { name: "Google 日本語" },
    { name: "Google 普通话（中国大陆）" },
    { name: "Google 粤語（香港）" },
    { name: "zh-HK", rate: 0.25 },
    { name: "Fallback Chinese (Hong Kong) Female", lang: "zh-HK", fallbackvoice: !0, service: "g1" },
    { name: "Google 粤語（香港）" },
    { name: "zh-TW", rate: 0.25 },
    { name: "Fallback Chinese (Taiwan) Female", lang: "zh-TW", fallbackvoice: !0, service: "g1" },
  ];

  cache_ios_voices = [
    { name: "he-IL", voiceURI: "he-IL", lang: "he-IL" },
    { name: "th-TH", voiceURI: "th-TH", lang: "th-TH" },
    { name: "pt-BR", voiceURI: "pt-BR", lang: "pt-BR" },
    { name: "sk-SK", voiceURI: "sk-SK", lang: "sk-SK" },
    { name: "fr-CA", voiceURI: "fr-CA", lang: "fr-CA" },
    { name: "ro-RO", voiceURI: "ro-RO", lang: "ro-RO" },
    { name: "no-NO", voiceURI: "no-NO", lang: "no-NO" },
    { name: "fi-FI", voiceURI: "fi-FI", lang: "fi-FI" },
    { name: "pl-PL", voiceURI: "pl-PL", lang: "pl-PL" },
    { name: "de-DE", voiceURI: "de-DE", lang: "de-DE" },
    { name: "nl-NL", voiceURI: "nl-NL", lang: "nl-NL" },
    { name: "id-ID", voiceURI: "id-ID", lang: "id-ID" },
    { name: "tr-TR", voiceURI: "tr-TR", lang: "tr-TR" },
    { name: "it-IT", voiceURI: "it-IT", lang: "it-IT" },
    { name: "pt-PT", voiceURI: "pt-PT", lang: "pt-PT" },
    { name: "fr-FR", voiceURI: "fr-FR", lang: "fr-FR" },
    { name: "ru-RU", voiceURI: "ru-RU", lang: "ru-RU" },
    { name: "es-MX", voiceURI: "es-MX", lang: "es-MX" },
    { name: "zh-HK", voiceURI: "zh-HK", lang: "zh-HK" },
    { name: "sv-SE", voiceURI: "sv-SE", lang: "sv-SE" },
    { name: "hu-HU", voiceURI: "hu-HU", lang: "hu-HU" },
    { name: "zh-TW", voiceURI: "zh-TW", lang: "zh-TW" },
    { name: "es-ES", voiceURI: "es-ES", lang: "es-ES" },
    { name: "zh-CN", voiceURI: "zh-CN", lang: "zh-CN" },
    { name: "nl-BE", voiceURI: "nl-BE", lang: "nl-BE" },
    { name: "en-GB", voiceURI: "en-GB", lang: "en-GB" },
    { name: "ar-SA", voiceURI: "ar-SA", lang: "ar-SA" },
    { name: "ko-KR", voiceURI: "ko-KR", lang: "ko-KR" },
    { name: "cs-CZ", voiceURI: "cs-CZ", lang: "cs-CZ" },
    { name: "en-ZA", voiceURI: "en-ZA", lang: "en-ZA" },
    { name: "en-AU", voiceURI: "en-AU", lang: "en-AU" },
    { name: "da-DK", voiceURI: "da-DK", lang: "da-DK" },
    { name: "en-US", voiceURI: "en-US", lang: "en-US" },
    { name: "en-IE", voiceURI: "en-IE", lang: "en-IE" },
    { name: "hi-IN", voiceURI: "hi-IN", lang: "hi-IN" },
    { name: "el-GR", voiceURI: "el-GR", lang: "el-GR" },
    { name: "ja-JP", voiceURI: "ja-JP", lang: "ja-JP" },
  ];

  cache_ios9_voices = [
    { name: "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", lang: "ar-SA", localService: !0, default: !0 },
    { name: "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", lang: "cs-CZ", localService: !0, default: !0 },
    { name: "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", lang: "da-DK", localService: !0, default: !0 },
    { name: "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", lang: "de-DE", localService: !0, default: !0 },
    { name: "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", lang: "el-GR", localService: !0, default: !0 },
    { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: !0, default: !0 },
    { name: "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", lang: "en-GB", localService: !0, default: !0 },
    { name: "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", lang: "en-IE", localService: !0, default: !0 },
    { name: "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", lang: "en-US", localService: !0, default: !0 },
    { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "en-US", localService: !0, default: !0 },
    { name: "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", lang: "en-ZA", localService: !0, default: !0 },
    { name: "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", lang: "es-ES", localService: !0, default: !0 },
    { name: "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", lang: "es-MX", localService: !0, default: !0 },
    { name: "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", lang: "fi-FI", localService: !0, default: !0 },
    { name: "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", lang: "fr-CA", localService: !0, default: !0 },
    { name: "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", lang: "fr-FR", localService: !0, default: !0 },
    { name: "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", lang: "he-IL", localService: !0, default: !0 },
    { name: "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", lang: "hi-IN", localService: !0, default: !0 },
    { name: "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", lang: "hu-HU", localService: !0, default: !0 },
    { name: "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", lang: "id-ID", localService: !0, default: !0 },
    { name: "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", lang: "it-IT", localService: !0, default: !0 },
    { name: "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", lang: "ja-JP", localService: !0, default: !0 },
    { name: "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", lang: "ko-KR", localService: !0, default: !0 },
    { name: "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", lang: "nl-BE", localService: !0, default: !0 },
    { name: "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", lang: "nl-NL", localService: !0, default: !0 },
    { name: "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", lang: "no-NO", localService: !0, default: !0 },
    { name: "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", lang: "pl-PL", localService: !0, default: !0 },
    { name: "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", lang: "pt-BR", localService: !0, default: !0 },
    { name: "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", lang: "pt-PT", localService: !0, default: !0 },
    { name: "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", lang: "ro-RO", localService: !0, default: !0 },
    { name: "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", lang: "ru-RU", localService: !0, default: !0 },
    { name: "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", lang: "sk-SK", localService: !0, default: !0 },
    { name: "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", lang: "sv-SE", localService: !0, default: !0 },
    { name: "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", lang: "th-TH", localService: !0, default: !0 },
    { name: "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", lang: "tr-TR", localService: !0, default: !0 },
    { name: "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", lang: "zh-CN", localService: !0, default: !0 },
    { name: "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", lang: "zh-HK", localService: !0, default: !0 },
    { name: "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", lang: "zh-TW", localService: !0, default: !0 },
  ];

  constructor () {
    this.is_chrome && this.is_safari && (this.is_safari = false);
    this.def_fallback_playbackrate = this.fallback_playbackrate;
    this.fallbackServicePath = 'http://tts.voicetech.yandex.net/' + (this.testCompiled() ? '' : 'develop/') + 'tts';
    this.default_rv = this.responsivevoices[0];
    this.init();
  }

  /* Main functioal */
  init () {
    this.is_android && (this.useTimer = true);
    if (this.is_opera || typeof speechSynthesis === 'undefined') {
      this.enableFallbackMode();
      return;
    }

    const startInterval = () => {
      const interval = setInterval(() => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.lqngth || (this.systemvoices && this.systemvoices.length)) {
          this.systemVoicesReady();
          clearInterval(interval);
          return;
        }

        this.voicesupport_attempts++;
        if (this.voicesupport_attempts > this.VOICESUPPORT_ATTEMPTLIMIT) {
          clearInterval(interval);
          window.speechSynthesis && this.iOS
            ? this.iOS9 ? this.systemVoicesReady(this.cache_ios9_voices) : this.systemVoicesReady(this.cache_ios_voices)
            : this.enableFallbackMode();
        }
      }, 100);
    }
    setTimeout(startInterval, 100);
    this.Dispatch("OnLoad");
  };

  speak (text, voice, params) {
    if (this.iOS9 && !this.iOS9_initialized) {
      setTimeout(() => this.speak(text, voice, params), 100);
      this.clickEvent();
      this.iOS9_initialized = true;
      return;
    }

    const responsiveVoice = voice ? this.getResponsiveVoice(voice) : this.default_rv;
    const masgText = text.replace(/[\"\`]/gm, "'");
    const sentences = [];

    this.isPlaying() && this.cancel();
    this.fallbackMode && this.fallback_audiopool.length > 0 && this.clearFallbackPool();
    this.msgparameters = params || {};
    this.msgtext = masgText;
    this.msgvoicename = voice;
    this.onstartFired = false;

    if (masgText.length > this.CHARACTER_LIMIT) {
      let tempText = masgText;
      for (; tempText.length > this.CHARACTER_LIMIT;) {
        let sentenceEnd = tempText.search(/[:!?.;]+/);
        let d = "";
        if (sentenceEnd === -1 || sentenceEnd >= this.CHARACTER_LIMIT) {
          sentenceEnd = tempText.search(/[,]+/);
          sentenceEnd === -1 && tempText.search(" ") === -1 && (sentenceEnd = 99);
          for (let k = tempText.split(" "), g = 0; g < k.length && !(d.length + k[g].length + 1 > this.CHARACTER_LIMIT); g++)
            d += (g != 0 ? " " : "") + k[g];
        } else d = tempText.substr(0, g + 1);
        tempText = tempText.substr(d.length, f.length - d.length);
        sentences.push(d);
      }
      tempText.length > 0 && sentences.push(tempText);
    } else sentences.push(masgText);

    this.multipartText = sentences;
    let msgProfile = {};

    if (responsiveVoice.mappedProfile) msgProfile = responsiveVoice.mappedProfile;
    else if (((msgProfile.systemvoice = this.getMatchedVoice(responsiveVoice)), (msgProfile.collectionvoice = {}), null == msgProfile.systemvoice)) {
      console.log("RV: ERROR: No voice found for: " + voice);
      return;
    }
    this.msgprofile = msgProfile;
    this.utterances = [];

    for (let g = 0; g < sentences.length; g++) {
      if (this.fallbackMode) {
        this.fallback_playbackrate = this.def_fallback_playbackrate;
        let bestPitch = this.selectBest([msgProfile.collectionvoice.pitch, msgProfile.systemvoice.pitch, 1]);
        let besstRate = this.selectBest([this.iOS9 ? 1 : null, msgProfile.collectionvoice.rate, msgProfile.systemvoice.rate, 1]);
        let bestVolume = this.selectBest([msgProfile.collectionvoice.volume, msgProfile.systemvoice.volume, 1]);
        let extraParams;
        params != null && (
          (bestPitch *= params.pitch || 1),
          (besstRate *= params.rate || 1),
          (bestVolume *= params.volume || 1),
          (extraParams = params.extraParams || null)
        );

        bestPitch /= 2;
        besstRate /= 2;
        bestVolume *= 2;

        bestPitch = Math.min(Math.max(bestPitch, 0), 1);
        besstRate = Math.min(Math.max(besstRate, 0), 1);
        bestVolume = Math.min(Math.max(bestVolume, 0), 1);
        bestPitch = this.fallbackServicePath + "?format=mp3&quality=hi&text=" + sentences[g] + "&lang=" + (msgProfile.collectionvoice.lang || msgProfile.systemvoice.lang || "en-US");
        extraParams && (bestPitch += "&extraParams=" + JSON.stringify(m));
        besstRate = document.createElement("AUDIO");
        besstRate.src = bestPitch;
        besstRate.playbackRate = this.fallback_playbackrate;
        besstRate.preload = "auto";
        besstRate.load();
        this.fallback_parts.push(besstRate);
      } else {
        const _speechSynthesis = new SpeechSynthesisUtterance();
        _speechSynthesis.voiceURI = msgProfile.systemvoice.voiceURI;
        _speechSynthesis.volume = this.selectBest([msgProfile.collectionvoice.volume, msgProfile.systemvoice.volume, 1]);
        _speechSynthesis.rate = this.selectBest([this.iOS9 ? 1 : null, msgProfile.collectionvoice.rate, msgProfile.systemvoice.rate, 1]);
        _speechSynthesis.pitch = this.selectBest([msgProfile.collectionvoice.pitch, msgProfile.systemvoice.pitch, 1]);
        _speechSynthesis.lang = this.selectBest([msgProfile.collectionvoice.lang, msgProfile.systemvoice.lang]);
        _speechSynthesis.text = sentences[g];
        _speechSynthesis.rvIndex = g;
        _speechSynthesis.rvTotal = sentences.length;
        g === 0 && (_speechSynthesis.onstart = this.speech_onstart)
        this.msgparameters.onendcalled = !1;
        null != params
          ? (
            (_speechSynthesis.voice = "undefined" !== typeof params.voice ? params.voice : msgProfile.systemvoice),
            g < sentences.length - 1 && 1 < sentences.length
              ? ((_speechSynthesis.onend = this.onPartEnd), _speechSynthesis.hasOwnProperty("addEventListener") && _speechSynthesis.addEventListener("end", this.onPartEnd))
              : ((_speechSynthesis.onend = this.speech_onend), _speechSynthesis.hasOwnProperty("addEventListener") && _speechSynthesis.addEventListener("end", this.speech_onend)),
            (_speechSynthesis.onerror = params.onerror || ((b) => console.error(b))),
            (_speechSynthesis.onpause = params.onpause),
            (_speechSynthesis.onresume = params.onresume),
            (_speechSynthesis.onmark = params.onmark),
            (_speechSynthesis.onboundary = params.onboundary || this.onboundary),
            (_speechSynthesis.pitch = null != params.pitch ? params.pitch : _speechSynthesis.pitch),
            (_speechSynthesis.rate = this.iOS ? (null != params.rate ? params.rate * params.rate : 1) * _speechSynthesis.rate : (null != params.rate ? params.rate : 1) * _speechSynthesis.rate),
            (_speechSynthesis.volume = null != params.volume ? params.volume : _speechSynthesis.volume)
          )
          : (
            (_speechSynthesis.voice = msgProfile.systemvoice),
            (_speechSynthesis.onend = this.speech_onend),
            (_speechSynthesis.onboundary = this.onboundary),
            (_speechSynthesis.onerror = (b) => console.error(b))
          ),
          this.utterances.push(_speechSynthesis),
          g === 0 && (this.currentMsg = _speechSynthesis),
          this.tts_speak(_speechSynthesis);
      }
    }
    this.fallbackMode && ((this.fallback_part_index = 0), this.startFallbackPart());
  }

  /* Fallback */
  enableFallbackMode () {
    this.fallbackMode = true;
    this.mapRVs();
    this.OnVoiceReady && this.OnVoiceReady.call();
    this.Dispatch("OnReady");
    window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
  }

  startFallbackPart () {
    this.fallback_part_index === 0 && this.speech_onstart();
    this.fallback_audio = this.fallback_parts[this.fallback_part_index];
    if (!this.fallback_audio) return;

    const fallbackAudio = this.fallback_audio;
    this.fallback_audiopool.push(fallbackAudio);

    setTimeout(() => fallbackAudio.playbackRate = this.fallback_playbackrate, 50);

    fallbackAudio.onloadedmetadata = () => {
      fallbackAudio.play();
      fallbackAudio.playbackRate = this.fallback_playbackrate;
    };
    this.fallback_errors && this.speech_onend();
    this.fallback_audio.play();
    this.fallback_audio.addEventListener("ended", () => this.finishFallbackPart());
    this.useTimer && this.startTimeout(this.multipartText[this.fallback_part_index], this.finishFallbackPart);
  }

  finishFallbackPart () {
    this.isFallbackAudioPlaying()
    ? (this.checkAndCancelTimeout(), (this.timeoutId = setTimeout(this.finishFallbackPart, 1e3 * (this.fallback_audio.duration - this.fallback_audio.currentTime))))
    : (this.checkAndCancelTimeout(), this.fallback_part_index < this.fallback_parts.length - 1 ? (this.fallback_part_index++, this.startFallbackPart()) : this.speech_onend());
  }

  clearFallbackPool () {
    if (!this.fallback_audiopool) return;
    this.fallback_audiopool.forEach(fallback => {
      fallback.pause();
      fallback.src = '';
    });
    this.fallback_audiopool = [];
  }

  isFallbackAudioPlaying () {
    for (let i = 0; i < this.fallback_audiopool.length; i++) if (!this.fallback_audiopool[i].paused) return true;
    return false;
  }

  systemVoicesReady () {
    this.systemvoices = b;
    this.mapRVs();
    this.OnVoiceReady != null && this.OnVoiceReady.call();
    this.Dispatch("OnReady");
    window.hasOwnProperty("dispatchEvent") && window.dispatchEvent(new Event("ResponsiveVoice_OnReady"));
  }

  testCompiled () {
    return eval("typeof xy === 'undefined'");
  }

  /* Voice */
  getVoices () {
    return this.responsivevoices.map(voice => ({ name: voice.name }));
  }

  getResponsiveVoice (voiceName) {
    const responsiveVoice = this.responsivevoices.find(r_voice => r_voice.name === voiceName);
    if (!responsiveVoice) return null;
    return responsiveVoice.mappedProfile && responsiveVoice.mappedProfile.collectionvoice.fallbackvoice 
      ? ((this.fallbackMode = true), (this.fallback_parts = [])) // ???
      : (this.fallbackMode = !1), responsiveVoice;
  }

  getSystemVoice (voiceName) {
    if (!this.systemvoices) return null;

    const c = String.fromCharCode(160);
    const clearName = voiceName.replace(new RegExp("\\s+|" + c, "g"), "");
    for (var i = 0; i < this.systemvoices.length; i++) 
      if (0 === this.systemvoices[i].name.replace(new RegExp("\\s+|" + c, "g"), "").localeCompare(clearName))
        return this.systemvoices[i];
    return null;
  }

  getMatchedVoice (voice) {
    if (!voice.voiceIDs) return null;
    for (const id of voice.voiceIDs) {
      const _voice = this.getSystemVoice(this.voicecollection[id].name);
      if (_voice) return _voice;
    }
    return null;
  }

  voiceSupport () {
    return "speechSynthesis" in window;
  }

  setDefaultVoice (voiceName) {
    const voice = this.getResponsiveVoice(voiceName);
    voice != null && (this.default_rv = voice);
  }

  onFinishedPlaying () {
    if (this.msgparameters != null && this.msgparameters.onend != null) this.msgparameters.onend();
  }

  mapRVs () {
    for (const voice of this.responsivevoices) {
      for (const voiceId of voice.voiceIDs) {
        const collectionVoice = this.voicecollection[voiceId];
        if (1 != collectionVoice.fallbackvoice) {
          const sysVoice = this.getSystemVoice(collectionVoice.name);
          if (null != sysVoice) {
            voice.mappedProfile = { systemvoice: sysVoice, collectionvoice: collectionVoice };
            break;
          }
        } else {
          voice.mappedProfile = { systemvoice: {}, collectionvoice: collectionVoice };
          break;
        }
      }
    }
  };

  isPlaying () {
    return this.fallbackMode ? this.fallback_audio != null && !this.fallback_audio.ended && !this.fallback_audio.paused : speechSynthesis.speaking;
  }

  /* Speech */
  cancel () {
    this.checkAndCancelTimeout();
    this.fallbackMode ? (null != this.fallback_audio && this.fallback_audio.pause(), this.clearFallbackPool()) : ((this.cancelled = !0), speechSynthesis.cancel());
  };

  pause () {
    this.fallbackMode ? null != this.fallback_audio && this.fallback_audio.pause() : speechSynthesis.pause();
  }

  resume () {
    this.fallbackMode ? null != this.fallback_audio && this.fallback_audio.play() : speechSynthesis.resume();
  }

  speech_timedout () {
    this.cancel();
    this.cancelled = false;
    this.speech_onend();
  }

  speech_onend () {
    this.checkAndCancelTimeout();
    this.cancelled
      ? (this.cancelled = !1)
      : (
        this.msgparameters != null &&
        this.msgparameters.onend != null &&
        this.msgparameters.onendcalled != 1 &&
        ((this.msgparameters.onendcalled = true), this.msgparameters.onend())
      );
  }

  speech_onstart () {
    if (!this.onstartFired) {
      this.onstartFired = !0;
      // this.log("Speech start");
      if (this.iOS || this.is_safari || this.useTimer) this.fallbackMode || this.startTimeout(this.msgtext, this.speech_timedout);
      this.msgparameters.onendcalled = !1;
      if (null != this.msgparameters && null != this.msgparameters.onstart) this.msgparameters.onstart();
    }
  }

  tts_speak (_speechSynthesis) {
    setTimeout(() => {
      this.cancelled = !1;
      speechSynthesis.speak(_speechSynthesis);
    }, 0.01);
  }

  /* Utils */
  selectBest (params) {
    for (let i = 0; i < params.length; i++) if (params[i]) return params[i];
    return null;
  }

  getWords (b) {
    for (let c = b.split(/\s+/), e = 0; e < c.length; e++)
      null != (b = c[e].toString().match(/\d+/)) &&
        (c.splice(e, 1),
          this
            .numToWords(+b[0])
            .split(/\s+/)
            .map(function (a) {
              c.push(a);
            }));
    return c;
  }

  getEstimatedTimeLength (b, timerSpeed) {
    const words = this.getWords(b);
    let h = 0;
    const f = this.fallbackMode ? 1300 : 700;
    const _timerSpeed = timerSpeed || 1;
    words.map(() => {
      h += (this.toString().match(/[^ ]/gim) || this).length;
    });
    return words.length < 5
      ? _timerSpeed * (f + 50 * h)
      : (60 / this.WORDS_PER_MINUTE) * _timerSpeed * 1e3 * words.length;
  }

  startTimeout (b, callback) {
    const timerSpeed = this.msgprofile.collectionvoice.timerSpeed || 1;
    timerSpeed <= 0 || ((this.timeoutId = setTimeout(callback, this.getEstimatedTimeLength(b, timerSpeed))));
  }

  checkAndCancelTimeout () {
    this.timeoutId && (clearTimeout(this.timeoutId), (this.timeoutId = null));
  }

  /* Event */
  Dispatch (event) {
    if (this.hasOwnProperty(event + "_callbacks") && null != this[event + "_callbacks"] && 0 < this[event + "_callbacks"].length) {
      for (let c = a[event + "_callbacks"], e = 0; e < c.length; e++) c[e]();
      return !0;
    }
    const h = event + "_callbacks_timeout";
    const f = event + "_callbacks_timeoutCount";
    this.hasOwnProperty(h) ||
      ((this[f] = 10),
        (this[h] = setInterval(() => {
          --this[f];
          (this.Dispatch(event) || 0 > this[f]) && clearTimeout(this[h]);
        }, 50)));
    return false;
  };

  addEventListener (prop, callback) {
    this.hasOwnProperty(prop + "_callbacks") || (this[prop + "_callbacks"] = []);
    this[prop + "_callbacks"].push(callback);
  };

  clickEvent () {
    if (!this.iOS || this.iOS_initialized) return;
    const _speechSynthesis = new SpeechSynthesisUtterance(" ");
    speechSynthesis.speak(_speechSynthesis);
    this.iOS_initialized = true;
  }

  setVolume (volume) {
    if (!this.isPlaying()) return;
    if (this.fallbackMode) {
      for (const part of this.fallback_parts) part.volume = volume;
      for (const audio of this.fallback_audiopool) audio.volume = volume;
      this.fallback_audio.volume = volume;
    } else for (const utterance of this.utterances) utterance.volume = volume;
  };

  onPartEnd (b) {
    if (null != this.msgparameters && null != this.msgparameters.onchuckend) this.msgparameters.onchuckend();
    this.Dispatch("OnPartEnd");
    const utterance = this.utterances.indexOf(b.utterance);
    this.currentMsg = this.utterances[utterance + 1];
  };

  onboundary () {
    this.iOS && !this.onstartFired && this.speech_onstart();
  };

  numToWords (number) {
    const numbers = " one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" "); // n
    const tens = "  twenty thirty forty fifty sixty seventy eighty ninety".split(" "); // p
    const big_numbers = " thousand million billion trillion quadrillion quintillion sextillion septillion octillion nonillion".split(" "); // t
    const copyArray = (array) => {
      if (!Array.isArray(array)) return Array.from(array);
      for (let i = 0, copy = Array(array.length); i < array.length; i++) copy[b] = array[b];
      return copy;
    }
    const e = (a, b) => {
      if (Array.isArray(a)) return a;
      if (!Symbol.iterator in Object(a)) throw new TypeError("Invalid attempt to destructure non-iterable instance");
      let c = [];
      let d = true;
      let e = false;
      let f = void 0;
      try {
        for (let g = a[Symbol.iterator](), h; !(d = (h = g.next()).done) && (c.push(h.value), !b || c.length !== b); d = true);
      } catch (err) {
        e = true;
        f = err;
      } finally {
        if (!d && g["return"]) g["return"]();
        if (e) throw f;
      }
      return c;
    }
    const isEmptyArray = (array) => { // h
      return array.length === 0;
    }
    const getSliceFunc = (...args) => { // f and g
      return (b) => b.slice(...args);
    }
    const reverseArray = (array) => { // d
      return array.reverse();
    }
    const cocan = (a) => { // k
      return (b) => (c) => a(b(c));
    }
    const m = (position) => {
      return (array) => {
        return isEmptyArray(array)
          ? []
          : [getSliceFunc(0, position)(array)].concat(copyArray(m(position)(getSliceFunc(position)(array))));
      }
    }
    const u = (a) => {
      let b = e(a, 3);
      let _a = b[0];
      let c = b[1];
      b = b[2];
      return [0 === (Number(b) || 0)
        ? "" : numbers[b] + " hundred ", 0 === (Number(_a) || 0) ? tens[c]
        : (tens[c] && tens[c] + "-") || "", numbers[c + _a] ||  numbers[_a]].join("");
    }
    const notValue = (a) => !a;
    const v = (a, b) => {
      return "" === a ? a : a + " " + big_numbers[b];
    };

    return "number" === typeof number
      ? this.numToWords(String(number))
      : "0" === number
        ? "zero"
        : cocan(m(3))(reverseArray)(Array.from(number)).map(u).map(v).filter(cocan(notValue)(isEmptyArray)).reverse().join(" ").trim();
  }
}

HTMLElement.prototype.removeClassWild = function (mask) {
  const re = mask.replace(/\*/g, "\\S+");
  this.className = this.className.replace(new RegExp("\\b" + re + "", "g"), '');
  return this;
};
HTMLElement.prototype.slideUp = function (duration=500) {
  this.style.transition = `height ${duration}ms`;
  this.style.boxSizing = 'border-box'; /* [2] */
  this.style.height = this.offsetHeight + 'px'; /* [3] */
  this.style.overflow = 'hidden'; /* [7] */
  setTimeout(() => this.style.height = '0px', 0);
  setTimeout(() => {
    this.style.display = 'none'; /* [8] */
    this.style.removeProperty('height'); /* [9] */
    this.style.removeProperty('overflow');  /* [12] */ 
    this.style.removeProperty('transition'); /* [14] */
  }, duration);
};
HTMLElement.prototype.slideDown = function (duration=500) {
  this.style.display = 'block';
  let height = this.offsetHeight; /* [3] */
  this.style.height = 0; /* [4] */
  this.style.overflow = 'hidden'; /* [7] */ 
  this.style.boxSizing = 'border-box'; /* [8] */
  this.style.transition = `height ${duration}ms`;
  setTimeout(() => this.style.height = height + 'px', 0);
  setTimeout(() => {
    this.style.removeProperty('height'); /* [13] */
    this.style.removeProperty('overflow'); /* [14] */
    this.style.removeProperty('transition'); /* [14] */
  }, duration);
};
HTMLElement.prototype.slideToggle = function (duration=500) {
  if (window.getComputedStyle(this).display === 'none') {
    return this.slideDown(duration);
  } else {
    return this.slideUp(duration);
  }
};

let special;
let responsiveVoice;

if (document.readyState === 'complete') {
  responsiveVoice = new ResponsiveVoice();
  special = new Special(responsiveVoice);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    responsiveVoice = new ResponsiveVoice();
    special = new Special(responsiveVoice);
  });
}
