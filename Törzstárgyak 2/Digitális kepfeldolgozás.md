## Digitális képfeldolgozás

### 1. Simítás/szűrés képtérben (átlagoló szűrők, Gauss simítás és mediánszűrés); élek detektálása (gradiens-operátorokkal és Marr-Hildreth módszerrel).

> **Konvolúció**
> 
> <img src="../img/digikep_kepek/2022-05-14-16-09-00-image.png" title="" alt="" width="544">
> 
> Lényege, hogy van egy kernel (a képen "Convolution filter", egy mátrix), amit végigléptetünk egy nála nagyobb mátrixon. Minden egyes pozícióban a kernelben lévő számokat összeszorozzuk az "alattuk" lévő számokkal, a szorzatokat szummázzuk, utána ezt az eredményt egy harmadik (vagy a forrás mátrixal egyenlő méretű, vagy nem, attól függ mekkora méretű képet akarunk visszakapni) célmátrixba írjuk. Így a forrsáképen való végighaladás után kitöltődik az egész célmátrix.
> 
> (maszk=kernel)

#### Átlagoló szűrés

- **Zaj:** a képpont-intenzitások nemkívánatos változása

- Az átlagoló szűrés egy olyan technika, amit képek simítására, másszóval zajtalanítására használnak

<img title="" src="../img/digikep_kepek/2022-05-14-12-18-42-image.png" alt="" width="572" data-align="center">

- Lényege, hogy minden egyes pixelt a környezete (ebbe beleszámít a helyettesíteni kívánt pixel is) átlagával helyettesítünk

- Ezt egy olyan konvolúciós szűréssel éri el, ahol a kernel (vagy konvolúciós maszk) egy olyan mátrix, ahol az elemek összege mindig 1
  
  - Példák konvolúciós maszkokra:
    
    <img title="" src="../img/digikep_kepek/2022-05-14-16-40-04-image.png" alt="" width="608">

- Pálda átlag szűrésre:
  
  <img src="../img/digikep_kepek/2022-05-14-16-45-17-image.png" title="" alt="" width="476">

- Az átlag-szűrő hatása és tulajdonságai
  
  - a képpontok felveszik a környezetük átlagát
  
  - a szűrt kép intenzitásértékei a kiindulási kép intenzitástartományában maradnak
  
  - lineáris operátor (mivel a is konvolúció az)
  
  - haszna: csökkenti a zajt
  
  - kára: gyengíti az éleket, homályossá teszi a képet

- Szűrés a környezet súlyozott átlagával
  
  - Átlagolás: a környezetbe eső valamennyi pont intenzitása egyforma súllyal esik a latba.
    
    <img src="../img/digikep_kepek/2022-05-14-16-52-12-image.png" title="" alt="" width="98">
  
  - Súlyozott átlag: a környezet intenzitásaihoz (általában a távolsággal arányosan csökkenő) súlyokat rendelünk
  
  - <img src="../img/digikep_kepek/2022-05-14-16-54-34-image.png" title="" alt="" width="108">

#### Medián szűrés

- Az [ a_1, a_2, …, a_2n+1 ] (páratlan elemszámú) szám-tömb mediánja a nagyság szerint rendezett tömb középső, (n+1)-dik eleme

- Az átlagoló szűréshez hasonlóan zajszűrésre használatos, viszont jobban megőrzi a fontosabb részleteket

- Ennél a szűrésnél is egy meghatározott méretű környezet van figyelembe véve, de itt nem a szomszédos pixelek átlagával, hanem a mediánjával helyettesíti az egyes pixeleket

- Illusztrálva:
  
  <img title="" src="../img/digikep_kepek/2022-05-14-19-35-35-image.png" alt="" width="479">

- Alkalmazása:
  
  <img src="../img/digikep_kepek/2022-05-14-19-41-45-image.png" title="" alt="" width="465">

- A medián-szűrés hatása
  
  - Megszünteti az egyedi (és a „kis” kiterjedésű) kiugrásokat
  
  - „Jobban” megőrzi az éleket, mint az átlagolás
  
  - „Nagy” kiterjedésű zajfoltoknál jel-elnyomó.

#### Gauss simítás

> **Pascal háromszög**
> 
> <img src="../img/digikep_kepek/2022-05-15-15-38-03-image.png" title="" alt="" width="549">

- Szintén zajszűrésre használatos

- A Gauss simítás alkalmazása egy képre nem más, mint konvolválni a képet a Gauss függvénnyel
  
  - A maszk egy ("harang alakú") Gauss görbét fog reprezentálni

- 1 dimenziós Gauss függvény
  
  - σ a szórást jelöli
    
    <img src="../img/digikep_kepek/2022-05-15-14-22-37-image.png" title="" alt="" width="553">

- 2 dimenziós Gauss függvény
  
  <img src="https://homepages.inf.ed.ac.uk/rbf/HIPR2/eqns/eqngaus2.gif" title="" alt="Eqn:eqngaus2" width="274">

<img title="" src="../img/digikep_kepek/2022-05-15-14-49-19-image.png" alt="" width="571">

- Diszkrét közelítése a Pascal háromszög segítségével (attól függ hogy melyik szintjéből kell kiindulnunk, hogy mekkora maszkot akarunk)
  
  <img title="" src="../img/digikep_kepek/2022-05-15-15-42-51-image.png" alt="" width="452">
  
  <img src="../img/digikep_kepek/2022-05-15-15-44-21-image.png" title="" alt="" width="441">

- Példa Gauss szűrésre 3x3-as maszkkal:
  
  <img title="" src="../img/digikep_kepek/2022-05-15-15-51-56-image.png" alt="" width="324">

#### Éldetektálás

> **Tangens függvény**
> 
> <img title="" src="../img/digikep_kepek/2022-05-15-16-12-51-image.png" alt="" width="324">
> 
> **Első rendű derivált**
> 
> Geometriai jelentése: az érintő iránytangense.
> 
> Elárulja, hogy a függvény hol nő és hol csökken és hogy milyen mértékben.
> 
> A derivált (meredekség):
> 
> - pozitív, ha a függvény nő,
> - negatív, ha csökken

**Éldetektálás Gradiens operátorokkal**

- A képen ott található él, ahol a kép-függvény valamely irány mentén hirtelen változik.
  
  <img title="" src="../img/digikep_kepek/2022-05-15-16-03-32-image.png" alt="" width="482">
  
  <img title="" src="../img/digikep_kepek/2022-05-15-16-05-12-image.png" alt="" width="415">

- Tipikus élprofilok
  
  <img title="" src="../img/digikep_kepek/2022-05-15-16-06-03-image.png" alt="" width="360">

- Az első deriváltat felhasználhatjuk éldetektálásra: ahol kiemelkedőbb lokális maximuma (vagy minimuma) van az első deriváltnak, ott jó esélyel él található. A lokális minimumok miatt abszolútértéket szokás venni, így csak a maximumokra kell odafigyelni
  
  <img title="" src="../img/digikep_kepek/2022-05-15-17-25-33-image.png" alt="" width="433">

- 2 dimenziós képnél parciális derivált használata: változások detektálása az _x_ és _y_ koordináta mentén
  
  - a két érték alapján tudjuk hogy hol vannak élek
    
    <img title="" src="../img/digikep_kepek/2022-05-15-17-51-33-image.png" alt="" width="387">
  
  - Gradiens nagysága:
    
    <img title="" src="../img/digikep_kepek/2022-05-15-18-01-26-image.png" alt="" width="238">
  
  - Gradiens iránya:
    
    <img title="" src="../img/digikep_kepek/2022-05-15-18-02-27-image.png" alt="" width="232">

- Diszkrét gradiens operátorok:
  
  - Roberts operátor
    
    - a maszkelemek összege 0
    
    - könnyen számítható, de zajérzékeny
      
      <img src="../img/digikep_kepek/2022-05-15-18-08-45-image.png" title="" alt="" width="354">
  
  - Prewitt operátor
    
    - a maszkelemek összege 0
      
      <img src="../img/digikep_kepek/2022-05-15-18-10-52-image.png" title="" alt="" width="331">
  
  - Sobel operátor
    
    - a maszkelemek összege 0
    
    - simító hatással bír
      
      <img src="../img/digikep_kepek/2022-05-15-18-11-47-image.png" title="" alt="" width="338">
  
  - Frei-Chen (izotropikus) operátor
    
    - a maszkelemek összege 0
      
      <img src="../img/digikep_kepek/2022-05-15-18-13-46-image.png" title="" alt="" width="338">

- Gradiens maszk tervezése (x-irányban)
  
  <img src="../img/digikep_kepek/2022-05-15-18-40-31-image.png" title="" alt="" width="181">
  
  - Feltételek:

$$
\text{1. Szimmeteria: } a_{1j} =a_{3j} \text{ (j=1,2,3)} \\
\text{2. Antiszimmetria: } a_{i1}=-a_{i3},\ a_{i1}>0\ \text{és }
a_{i2}=0\ \text{(i=1,2,3)}\\
\text{3. Nem reagál konstans régióra: } \sum_{i=1}^{3}\sum_{j=1}^{3}
a_{ij}=0\ \text{(Az elemek összege 0)}
$$

- 8-irányban élt kereső gradiens operátorok
  
  - Prewitt compass operátor
    
    <img src="../img/digikep_kepek/2022-05-15-19-39-27-image.png" title="" alt="" width="538">
  
  - Robinson-3 compass operátor
    
    <img src="../img/digikep_kepek/2022-05-15-19-40-14-image.png" title="" alt="" width="533">
  
  - Robinson-5 compass operátor
    
    <img src="../img/digikep_kepek/2022-05-15-19-41-15-image.png" title="" alt="" width="520">
  
  - Kirsch compass operátor
    
    <img src="../img/digikep_kepek/2022-05-15-19-42-12-image.png" title="" alt="" width="519">

**Laplace éldetektálás**

- Másodrendű derivált: az első rendű deriváltal szemben a nullán való áthaladás helyén lesz az él, nem a lokális maximumnál vagy minimumnál
  
  <img src="../img/digikep_kepek/2022-05-15-22-45-19-image.png" title="" alt="" width="452">

- Kétváltozós függvény Laplace operátora: az _x_ szerinti és _y_ szerinti másdorendű deriváltak összege (a képen látható ahogy az összegből tényleg megkapjuk az összes élt)
  
  <img src="../img/digikep_kepek/2022-05-15-22-59-38-image.png" title="" alt="" width="405">
  
  <img src="../img/digikep_kepek/2022-05-15-23-04-05-image.png" title="" alt="" width="418">

- A Laplace operátor egy lineáris differenciál-operátor a másodrendű derivált közelítésére (a gradiens operátor önmagával vett belső szorzata)
  
  - Tulajdonságai:
    
    - forgásinvariáns
    
    - egyetlen maszkkal számítható
    
    - csak a magnitúdó számítható
    
    - duplán érzékelhet éleket
    
    - zajérzékeny
    
    <img src="../img/digikep_kepek/2022-05-15-23-55-06-image.png" title="" alt="" width="464">

- Egy diszkrét Laplace operátor (A maszkelemek összege 0):
  
  <img src="../img/digikep_kepek/2022-05-15-23-22-14-image.png" title="" alt="" width="490">

- A másodrendű derivált érzékeny a zajra -> hajtunk végre először Gauss simítást a képen

- Az Laplace operátor és a Gauss operátor is lineáris -> megspórolhatunk egy konvolúciót azzal, ha a Gauss operátoron alkalmazzuk a Laplace transzformációt, amiből egy új konvolúciós maszkot kapunk
  
  <img src="../img/digikep_kepek/2022-05-16-00-02-13-image.png" title="" alt="" width="390">
  
  - A Gauss függvény Laplace transzformáltja (LoG – Laplacian of Gaussian)
  
  - "fordított sombrero"
    
    <img title="" src="../img/digikep_kepek/2022-05-16-00-00-17-image.png" alt="" width="470">

- A LoG egy diszkrét közelítése:
  
  <img src="../img/digikep_kepek/2022-05-16-00-01-30-image.png" title="" alt="" width="391">

**Marr-Hildreth éldetektor**

Lényege:

1. Konvolváljuk a képet egy (vagy több) alkalmas LoG függvénnyel.

2. Keressünk (közös) nulla-átmeneteket.
   
   (Nulla-átmenet ott van, ahol az adott pont egy „kis” (pl. 2x2-es vagy 3x3-as)
   környezetében pozitív és negatív értékek is előfordulnak.)
- Példa:
  
  - σ a szórást jelöli
    
    <img src="../img/digikep_kepek/2022-05-16-00-08-45-image.png" title="" alt="" width="451">

- Nagyon lapos nulla átmeneteknél "fantom" élt is detektálhat
  
  <img title="" src="../img/digikep_kepek/2022-05-16-00-13-42-image.png" alt="" width="513">

### 2. Alakreprezentáció, határ- és régió-alapú alakleíró jellemzők, Fourier leírás.

<img src="../img/digikep_kepek/2022-05-17-22-54-29-image.png" title="" alt="" width="549">

**Alakzat:** pontok összefüggő rendszere

A moduláris gépi látás általános modellje:

![](../img/digikep_kepek/2022-05-16-23-17-39-image.png)

- Az alakreprezentáció módszerei:
  
  - az objektumot körülvevő **határ** leírása
  
  - az objektum által elfoglalt **régió** leírása
  
  - **transzformációs** megközelítés

#### Határvonal alapú tulajdonságok

- lánckód, alakleíró szám

- kerület, terület, kompaktság, cirkularitás,

- közelítés poligonnal,

- parametrikus kontúr, határvonal leíró
  függvény,

- meredekségi hisztogram,

- görbület, energia

- strukturális leírás

##### **Lánckód (chain code)**

- Az alakzat határpontjait követi, láncolja az óramutató járásával ellentétes irányban.

- **Határpont:** az alakzatnak olyan pontja, melynek van az alakzathoz nem tartozó 8-, ill. 4-szomszédja (4, ill. 8 irány esetén).

- Az elemi elmozdulások kódjai:
  
  <img src="../img/digikep_kepek/2022-05-17-20-17-23-image.png" title="" alt="" width="422">

- Példa 8-as lánckódra:
  
  <img title="" src="../img/digikep_kepek/2022-05-17-20-18-36-image.png" alt="" width="425">

**_<u>Normalizált lánckód</u>_**

Különböző kezdőpontok választása a lánckód ciklikusan permutált változatait eredményezi.

**Különbségkód:** a lánckód első deriváltja, a szomszédos elemek közötti elmozdulások száma.

**Normalizálás:** addig permutáljuk ciklikusan a különbségkódot, amíg a legkisebb értékű kódot (a legkisebb 4-es, ill. 8-as számrendszerbeli számot) kapjuk.

**Alakleíró szám:** a normalizált különbségkód (nem függ a kezdőpont választásától).

Normalizálás:

<img title="" src="../img/digikep_kepek/2022-05-17-21-58-32-image.png" alt="" width="477">

- Az első ábránál (lánckód: 1002335657):
  
  - Különbségkód:
    
    - ha a 8-irányos iránytűn az óramutató járásával ellentétesen haladunk, akkor 1-től 0-ig 7 lépésben tudunk eljutni (a lánckód első két elembéből számoljuk a különbségkód első elemét)
    
    - második számjegye a 0 és 0 közti távolság, vagyis 0
    
    - harmadik számjegye 0 és 2 távolsága, ami 2 (még mindig az iránytűn, óramutató járásának ellentétesen)
    
    - ez így megy végig, utolsó szám az elsőhöz lesz hasonlítva
  
  - Alakleíró szám: úgy kell rendezni a különbségkódot hogy a lehető legkisebb számot adják
    
    - mivel a 2 alakzat megegyezik, ezért mindkettő esetben ugyanaz lesz az alakleíró szám
    - invariáns a forgatásra is, ha a forgatási szög k·π/2

**A lánckód tulajdonságai**

- Előnyök (a mátrixos reprezentációval szemben):
  
  - kompakt (tömör),
  
  - eltolás-invariáns,
  
  - gyors algoritmus,
  
  - gyorsan rekonstruálható belőle az alakzat

- Hátrányok:
  
  - nem forgás-invariáns,
  
  - nem skála-invariáns
  
  - a pontosság legfeljebb pixelnyi lehet,
  
  - érzékeny a zajra

**Kerület számítása 8-as lánckódból**

<img title="" src="../img/digikep_kepek/2022-05-17-22-49-34-image.png" alt="" width="486">

##### Poligonok

<img title="" src="../img/digikep_kepek/2022-05-17-22-58-00-image.png" alt="" width="453">

**Egyszerű poligon területe:**

<img src="../img/digikep_kepek/2022-05-17-23-02-49-image.png" title="" alt="" width="445">

- trapéz területek számítása (negatívak és pozitívak)

<img src="../img/digikep_kepek/2022-05-18-20-51-32-image.png" title="" alt="" width="448">

**Kompaktság:** kompaktság = (kerület)^2 / terület

- Pl:
  
  <img title="" src="../img/digikep_kepek/2022-05-17-23-07-36-image.png" alt="" width="360">

**Cirkularitás (körszerűség):** cirkularitás = 1 / kompaktság = terület / (kerület)^2

- maximális a körre: 1/(4π) ≈ 0.08

**Közelítés poligonnal**

<img src="../img/digikep_kepek/2022-05-17-23-11-49-image.png" title="" alt="" width="391">

**Leírás egyváltozós függvényekkel (signatures)**

- Pl. a súlypontnak a határtól vett távolságát a szög függvényében fejezi ki.

- Függ az alakzat méretétől és a határon vett kezdőpont megválasztásától, ezért a jellemző normalizálásra szorul.

**Csillag-szerű objektum**

- Van olyan pontja, amelyből induló tetszőleges irányú sugár a határt
  egyetlen pontban metszi.

- Az ilyen pont a csillag-szerű objektum magjához tartozik.

- <img src="../img/digikep_kepek/2022-05-17-23-21-59-image.png" title="" alt="" width="203">

**Strukturális leírás**

<img title="" src="../img/digikep_kepek/2022-05-17-23-25-52-image.png" alt="" width="335">

**Leírás generatív nyelvtanokkal**

Pl:

<img title="" src="../img/digikep_kepek/2022-05-17-23-26-38-image.png" alt="" width="369">

**Leírás összefűzött primitívekkel**

<img title="" src="../img/digikep_kepek/2022-05-17-23-27-26-image.png" alt="" width="461">

#### Régió alapú alakleírás

- befoglaló téglalap, rektangularitás

- főtengely, melléktengely, átmérő,
  excentricitás, főtengely szöge

- konvex burok, konvex kiegészítés,
  konkávitási fa, partícionált határ,

- vetületek, törés-költség

- topológiai leírások, Euler-szám,
  szomszédsági fa,

- váz,

- momentumok, invariáns momentumok

**Befoglalóló téglalap**

<img title="" src="../img/digikep_kepek/2022-05-17-23-31-59-image.png" alt="" width="360">

**Rektangularitás (téglalap-szerűség)**

- az alakzat területének és a minimális befoglaló téglalap területének a hányadosa

**Fő- és melléktengely**

- főtengely: az alakzaton belül haladó leghosszabb egyenes szakasz

- melléktengely: az alakzaton belüli, a főtengelyre merőleges leghosszabb egyenes szakasz
  
  <img src="../img/digikep_kepek/2022-05-17-23-36-12-image.png" title="" alt="" width="335">

**Átmérő**

<img src="../img/digikep_kepek/2022-05-17-23-35-10-image.png" title="" alt="" width="261">

**Excentricitás:** a fő- és a melléktengely hosszaránya (főtengely/melléktengely)

**Főtengely szöge (az alakzat iránya):** a főtengely és az x-tengely által bezárt szög

<img src="../img/digikep_kepek/2022-05-17-23-37-52-image.png" title="" alt="" width="244">

**Konvex burok:** az alakzatot tartalmazó minimális konvex alakzat

**Konvex kiegészítés:** a konvex burok és az alakzat különbsége

**Konkávitási fa:**

- A fa gyökere a kiindulási alakzat, az első szinten a konvex különbség alakzatai helyezkednek el, melyekre a faépítést rekurzív módon folytatjuk.

- A fa elágazási pontjaiban lévő alakzatok nem konvexek, míg minden levélalakzat
  konvex.
  
  <img src="../img/digikep_kepek/2022-05-18-00-01-29-image.png" title="" alt="" width="529">

**Partícionált határ**

- a határ partícionálható aszerint, hogy hol kezdődik, ill. fejeződik be a konvex kiegészítés valamely komponense
  
  <img title="" src="../img/digikep_kepek/2022-05-18-00-02-36-image.png" alt="" width="208">

**Vetületek**

<img src="../img/digikep_kepek/2022-05-18-00-04-24-image.png" title="" alt="" width="408">

**Törés költség (break cost):** A törés költség meghatározásánál az egyik vetületet (pl. a függőlegeset) vesszük figyelembe. Ekkor egy oszlop költsége a benne található olyan egyesek száma, melyekhez az előző oszlop ugyanazon sorában is egyes található.

Pl.:

<img src="../img/digikep_kepek/2022-05-18-00-06-34-image.png" title="" alt="" width="423">

**Topológiai leírás**

- **Bináris kép:** kétféle érték (1: fekete, alakzat, komponens; 0: fehér, lyuk, háttér)

- **Komponens:** maximálisan összefüggő fekete halmaz (bármely két pontja összeköthető a halmazon belüli 4-, ill. 8 úttal) régió

- **Üreg:** a komplemens/negált kép egy véges komponense

**Euler-féle szám:** (komponensek száma) - (üregek száma)

<img src="../img/digikep_kepek/2022-05-18-00-09-41-image.png" title="" alt="" width="456">

**Euler szám poligonhálózatokra**

- lapok (face) száma: #F

- élek (edge) száma: #E

- csúcsok (vertex) száma: #V

- régiók, objektumok száma: #O

- üregek (cavity) száma: #C

- Euler szám: #F - #E + #V = #O - #C
  
  <img title="" src="../img/digikep_kepek/2022-05-18-00-13-42-image.png" alt="" width="403">

**Összefüggőségi fa**

- A bináris képekhez rendelt irányított gráf, ahol:
  
  - minden egyes szögpont megfelel a kép egy (fehér vagy fekete) komponensének
  
  - a gráf tartalmazza az (X,Y) élet, ha az Xkomponens „körülveszi” a vele szomszédos Y komponenst.
  
  <img src="../img/digikep_kepek/2022-05-18-00-15-29-image.png" title="" alt="" width="386">

**Az Euler-szám és az összefüggőségi fa**

- Nem kódolják a képeket, mivel számos képnek megegyezik az Euler száma és/vagy az összefüggőségi fája.

**Váz (skeleton):** A váz egy gyakran alkalmazott régió-alapú alakleíró jellemző, mely leírja az objektumok általános formáját.

- A váz meghatározásai:
  
  1. A váz a középtengely transzformáció (Medial Axis Transform, MAT) eredménye: a vázat az objektum azon pontjai alkotják, melyekre kettő vagy több legközelebbi határpont található.
     
     <img src="../img/digikep_kepek/2022-05-18-00-24-12-image.png" title="" alt="" width="285">
  
  2. Préritűz-hasonlat: Az objektum határát (minden pontjában) egyidejűleg felgyújtjuk. A váz azokból a pontokból áll, ahol a tűzfrontok találkoznak és kioltják egymást. (Feltételezzük, hogy a tűzfrontok minden irányban egyenletes sebességgel, vagyis izotropikusan terjednek.)
     
     <img src="../img/digikep_kepek/2022-05-18-00-25-17-image.png" title="" alt="" width="468">
  
  3. A vázat az objektumba beírható maximális (nyílt) hipergömbök középpontjai alkotják. Egy beírható hipergömb maximális, ha őt nem tartalmazza egyetlen másik beírható hipergömb sem. A beírható maximális (nyílt) hipergömbök egyesítése a kiindulási objektum egy lefedőrendszerét adja.
     
     <img src="../img/digikep_kepek/2022-05-18-00-26-24-image.png" title="" alt="" width="403">

- Belső- és külső váz
  
  <img src="../img/digikep_kepek/2022-05-18-00-27-35-image.png" title="" alt="" width="389">

- A váz:
  
  - Reprezentálja az objektum
    
    - általános formáját
    
    - topológiai szerkezetét és a
    
    - lokális objektum szimmetriákat
  
  - Invariáns
    
    - az eltolásra,
    
    - az elforgatásra és az
    
    - uniform skálázásra
  
  - Egyszerűbb szerkezet („vékony”, csökkenti a dimenziót).

- Váz gráf:
  
  <img src="../img/digikep_kepek/2022-05-18-00-30-34-image.png" title="" alt="" width="186">

**Momentumok**

- Az alakjellemzésben a momentumok előnye:
  
  - számok,
  
  - többszintű képekre is értelmezettek,
  
  - invariánsak (a fontosabb geometriai transzformációkra).
  
  <img src="../img/digikep_kepek/2022-05-18-00-36-15-image.png" title="" alt="" width="414">

**Súlypont**

<img title="" src="../img/digikep_kepek/2022-05-18-00-36-59-image.png" alt="" width="377">

**Centrális momentumok**

<img title="" src="../img/digikep_kepek/2022-05-18-00-58-23-image.png" alt="" width="395">

**Excentricitás**

<img title="" src="../img/digikep_kepek/2022-05-18-19-24-46-image.png" alt="" width="300">

**Főtengely szöge**

<img title="" src="../img/digikep_kepek/2022-05-18-19-26-05-image.png" alt="" width="307">

**Normalizált centrális momentumok**

<img src="../img/digikep_kepek/2022-05-18-19-26-46-image.png" title="" alt="" width="238">

**Invariáns momentumok és a geometriai transzformációk**

<img src="../img/digikep_kepek/2022-05-18-19-30-04-image.png" title="" alt="" width="469">

##### Transzformáción alapuló alakleírás

Transzformáljuk a határ K darab mintavételezett pontjából (mint komplex s(k) számokból) képzett s vektort. Az eredményül kapott a vektor (komplex a(k) együtthatók) adják a Fourier leírást. Az alakzat rekonstrukciójához az inverz Fourier-transzformációt kell végrehajtani.

A határpontok Fourier-transzformáltja:

<img src="../img/digikep_kepek/2022-05-18-20-13-27-image.png" title="" alt="" width="473">

Példa a Fourier leírásra:

- minél kevesebb Fourier deszkriptort használunk, annál kevésbé lesz pontos az inverz Fourier transzformációból előállított rekonstrukció

<img src="../img/digikep_kepek/2022-05-18-20-27-52-image.png" title="" alt="" width="476">
