/* Jedyny słownik tekstów interfejsu (PL/EN). Klucze używane przez data-i18n, data-i18n-title, data-i18n-ph oraz t(). */
window.I18N={
pl:{title:'Style Template Editor',h1:'Edytor <b>szablonów</b>',p_doc:'Dokument',p_el:'Elementy',p_tpl:'Szablony',p_style:'Styl',p_layers:'Warstwy',
 format:'Format',f_sq:'1080×1080 (kwadrat)',f_45:'1080×1350 (portret 4:5)',f_story:'1080×1920 (story)',f_169:'1920×1080 (16:9)',f_a4a:'A4 (1240×1754, 150 dpi)',f_a4b:'A4 (2480×3508, 300 dpi)',f_custom:'Własny…',
 wh:'Szer. / wys.',orient:'Orientacja',vert:'Pionowa',horiz:'Pozioma',bgdoc:'Tło',hdr_sec:'NAGŁÓWEK (pigułka u góry)',
 add_text:'+ Tekst',add_box:'+ Box / karta',add_img:'+ Grafika',img_hint:'Grafikę możesz też upuścić na płótno (PNG/JPG, max 20 MB).',presets:'PRESETY (wg wzorów)',
 pr_day:'Karta dnia',pr_stat:'Statystyka',pr_pill:'Pigułka',tname:'Nazwa',tname_ph:'np. post-dzien',save:'Zapisz',new:'Nowy',png:'Eksport PNG',
 view:'Widok',zoom_out:'Pomniejsz',zoom_in:'Powiększ',zoom_sl:'Powiększenie widoku (nie wpływa na szablon)',fit:'Dopasuj',fit_t:'Dopasuj do okna',z100_t:'Rzeczywisty rozmiar',ctrl:'Ctrl+kółko',lang_t:'Język interfejsu',
 credit:'Styl inspirowany <a href="https://github.com/BkashJEE/hermes-nous-calendar">hermes-nous-calendar</a> (BkashJosi, MIT). Fonty: SIL OFL 1.1.',
 sel_hint:'Zaznacz element na płótnie.',hdr_hint:'Nagłówek edytujesz w panelu Dokument.',dup:'Duplikuj',del:'Usuń',up_t:'Wyżej',dn_t:'Niżej',hide_t:'Pokaż/ukryj',hdr_layer:'★ Nagłówek (zawsze na górze)',
 l_name:'Nazwa',l_text:'Treść',l_field:'ID pola (wypełnialne)',l_w:'Szerokość',l_h:'Wysokość',l_font:'Font',l_weight:'Grubość',l_size:'Rozmiar px',l_color:'Kolor tekstu',l_ls:'Odstęp liter (em)',l_upper:'WIELKIE LITERY',l_lh:'Interlinia',l_align:'Wyrównanie',
 l_bg:'Tło',l_border:'Kolor ramki',l_bw:'Grubość ramki',l_radius:'Zaokrąglenie',l_pad:'Wypełnienie',l_shadow:'Cień',l_bar:'Lewy pasek',l_src:'Plik (assets/)',l_fit:'Dopasowanie',l_opacity:'Krycie (0–1)',l_lock:'Zachowaj proporcje',l_barColor:'Kolor paska',l_barW:'Szer. paska',l_visible:'Widoczny',l_px:'Padding poziomy',l_py:'Padding pionowy',
 a_left:'lewo',a_center:'środek',a_right:'prawo',fit_contain:'zmieść (contain)',fit_cover:'wypełnij (cover)',fit_stretch:'rozciągnij',
 n_box:'Box',n_text:'Tekst',n_day:'Karta dnia',n_dn:'Dzień',n_date:'Data',n_tag:'Tag',n_title:'Tytuł',n_fl:'Stopka L',n_fr:'Stopka P',n_stat:'Statystyka',n_label:'Etykieta',n_value:'Wartość',n_pill:'Pigułka',
 only_img:'Tylko PNG/JPG: {0}',too_big:'Plik > 20 MB',img_added:'Dodano grafikę {0}',no_tpl:'Brak zapisanych szablonów.',no_fields:'brak pól',open:'Otwórz',copy:'Kopia',
 loaded:'Wczytano {0}',copy_name:'Nazwa kopii:',copy_sfx:'-kopia',del_q:'Usunąć szablon {0}?',need_name:'Podaj nazwę.',saved:'Zapisano: templates/{0}.json',new_q:'Nowy pusty szablon?',rendering:'Renderuję…',png_ok:'PNG gotowy',def_file:'szablon',img_field:'(grafika)',
 e_bad_name:'Zła nazwa szablonu.',e_too_big:'Plik większy niż 20 MB.',e_bad_type:'Dozwolone tylko PNG/JPG (sprawdzane po zawartości).',e_bad_asset:'Zła nazwa grafiki.',e_not_found:'Nie znaleziono.',e_no_chromium:'Brak Chromium na serwerze.',e_render:'Błąd renderowania PNG.',e_generic:'Błąd: {0}',l_shadowMode:'Rodzaj cienia',l_shColor:'Kolor cienia',l_shOpacity:'Krycie cienia (0–1)',l_shBlur:'Rozmycie cienia',l_shX:'Przesunięcie X',l_shY:'Przesunięcie Y',l_shSpread:'Rozszerzenie (tryb ramka)',sh_box:'ramka (box)',sh_outline:'kontur (dla PNG z przezroczystością)',wheel_hint:'Kliknij pole i kręć rolką myszy (Shift ×10, Alt/Ctrl ×0,1)',wheel_sel:'Kliknij pole i kręć rolką myszy, aby zmieniać opcje'},
en:{title:'Style Template Editor',h1:'Template <b>editor</b>',p_doc:'Document',p_el:'Elements',p_tpl:'Templates',p_style:'Style',p_layers:'Layers',
 format:'Format',f_sq:'1080×1080 (square)',f_45:'1080×1350 (portrait 4:5)',f_story:'1080×1920 (story)',f_169:'1920×1080 (16:9)',f_a4a:'A4 (1240×1754, 150 dpi)',f_a4b:'A4 (2480×3508, 300 dpi)',f_custom:'Custom…',
 wh:'Width / height',orient:'Orientation',vert:'Portrait',horiz:'Landscape',bgdoc:'Background',hdr_sec:'HEADER (pill at the top)',
 add_text:'+ Text',add_box:'+ Box / card',add_img:'+ Image',img_hint:'You can also drop an image onto the canvas (PNG/JPG, max 20 MB).',presets:'PRESETS (from references)',
 pr_day:'Day card',pr_stat:'Stat box',pr_pill:'Pill',tname:'Name',tname_ph:'e.g. day-post',save:'Save',new:'New',png:'Export PNG',
 view:'View',zoom_out:'Zoom out',zoom_in:'Zoom in',zoom_sl:'View zoom (does not affect the template)',fit:'Fit',fit_t:'Fit to window',z100_t:'Actual size',ctrl:'Ctrl+wheel',lang_t:'Interface language',
 credit:'Style inspired by <a href="https://github.com/BkashJEE/hermes-nous-calendar">hermes-nous-calendar</a> (BkashJosi, MIT). Fonts: SIL OFL 1.1.',
 sel_hint:'Select an element on the canvas.',hdr_hint:'Edit the header in the Document panel.',dup:'Duplicate',del:'Delete',up_t:'Up',dn_t:'Down',hide_t:'Show/hide',hdr_layer:'★ Header (always on top)',
 l_name:'Name',l_text:'Content',l_field:'Field ID (fillable)',l_w:'Width',l_h:'Height',l_font:'Font',l_weight:'Weight',l_size:'Size px',l_color:'Text colour',l_ls:'Letter spacing (em)',l_upper:'UPPERCASE',l_lh:'Line height',l_align:'Alignment',
 l_bg:'Background',l_border:'Border colour',l_bw:'Border width',l_radius:'Corner radius',l_pad:'Padding',l_shadow:'Shadow',l_bar:'Left bar',l_src:'File (assets/)',l_fit:'Fit',l_opacity:'Opacity (0–1)',l_lock:'Keep proportions',l_barColor:'Bar colour',l_barW:'Bar width',l_visible:'Visible',l_px:'Horizontal padding',l_py:'Vertical padding',
 a_left:'left',a_center:'center',a_right:'right',fit_contain:'contain',fit_cover:'cover',fit_stretch:'stretch',
 n_box:'Box',n_text:'Text',n_day:'Day card',n_dn:'Day',n_date:'Date',n_tag:'Tag',n_title:'Title',n_fl:'Footer L',n_fr:'Footer R',n_stat:'Stat box',n_label:'Label',n_value:'Value',n_pill:'Pill',
 only_img:'PNG/JPG only: {0}',too_big:'File > 20 MB',img_added:'Image added {0}',no_tpl:'No saved templates.',no_fields:'no fields',open:'Open',copy:'Copy',
 loaded:'Loaded {0}',copy_name:'Copy name:',copy_sfx:'-copy',del_q:'Delete template {0}?',need_name:'Enter a name.',saved:'Saved: templates/{0}.json',new_q:'New empty template?',rendering:'Rendering…',png_ok:'PNG ready',def_file:'template',img_field:'(image)',
 e_bad_name:'Invalid template name.',e_too_big:'File larger than 20 MB.',e_bad_type:'Only PNG/JPG allowed (checked by content).',e_bad_asset:'Invalid image name.',e_not_found:'Not found.',e_no_chromium:'Chromium missing on the server.',e_render:'PNG render failed.',e_generic:'Error: {0}',l_shadowMode:'Shadow type',l_shColor:'Shadow colour',l_shOpacity:'Shadow opacity (0–1)',l_shBlur:'Shadow blur',l_shX:'Offset X',l_shY:'Offset Y',l_shSpread:'Spread (frame mode)',sh_box:'frame (box)',sh_outline:'outline (for transparent PNG)',wheel_hint:'Click the field and use the mouse wheel (Shift ×10, Alt/Ctrl ×0.1)',wheel_sel:'Click the field and use the mouse wheel to cycle options'}};
let LANG='pl';
function t(k,...a){const s=(I18N[LANG]&&I18N[LANG][k])??I18N.pl[k]??k;return s.replace(/\{(\d)\}/g,(_,i)=>a[i]??'')}
function applyI18n(){document.documentElement.lang=LANG;document.title=t('title');
 document.querySelectorAll('[data-i18n]').forEach(e=>e.innerHTML=t(e.dataset.i18n));
 document.querySelectorAll('[data-i18n-title]').forEach(e=>e.title=t(e.dataset.i18nTitle));
 document.querySelectorAll('[data-i18n-ph]').forEach(e=>e.placeholder=t(e.dataset.i18nPh));
 document.querySelectorAll('[data-lang]').forEach(b=>b.classList.toggle('dark',b.dataset.lang===LANG));}
